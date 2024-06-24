(function () {
    'use strict';

    const TOKENS = {
        attribute: /\[\s*(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(?<caseSensitive>[iIsS])?\s*)?\]/gu,
        id: /#(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
        class: /\.(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
        comma: /\s*,\s*/g, // must be before combinator
        combinator: /\s*[\s>+~]\s*/g, // this must be after attribute
        'pseudo-element': /::(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?:¶*)\))?/gu, // this must be before pseudo-class
        'pseudo-class': /:(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶*)\))?/gu,
        type: /(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)|\*/gu, // this must be last
    };
    const TOKENS_WITH_PARENS = new Set(['pseudo-class', 'pseudo-element']);
    new Set([...TOKENS_WITH_PARENS, 'attribute']);
    const TOKENS_FOR_RESTORE = Object.assign({}, TOKENS);
    TOKENS_FOR_RESTORE['pseudo-element'] = RegExp(TOKENS['pseudo-element'].source.replace('(?<argument>¶*)', '(?<argument>.*?)'), 'gu');
    TOKENS_FOR_RESTORE['pseudo-class'] = RegExp(TOKENS['pseudo-class'].source.replace('(?<argument>¶*)', '(?<argument>.*)'), 'gu');

    /*!
     * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    function matchPattern(pattern, text) {
        // TODO - support 'm' RegExp argument
        if (pattern.startsWith('/') && (pattern.endsWith('/') || pattern.endsWith('/i'))) {
            let caseSensitive = true;
            pattern = pattern.slice(1);
            if (pattern.endsWith('/')) {
                pattern = pattern.slice(0, -1);
            }
            else {
                pattern = pattern.slice(0, -2);
                caseSensitive = false;
            }
            return new RegExp(pattern, caseSensitive === false ? 'i' : undefined).test(text);
        }
        return text.includes(pattern);
    }
    function matches(element, selector) {
        if (selector.type === 'id' ||
            selector.type === 'class' ||
            selector.type === 'type' ||
            selector.type === 'attribute') {
            return element.matches(selector.content);
        }
        else if (selector.type === 'list') {
            return selector.list.some((s) => matches(element, s));
        }
        else if (selector.type === 'compound') {
            return selector.compound.every((s) => matches(element, s));
        }
        else if (selector.type === 'pseudo-class') {
            if (selector.name === 'has' || selector.name === 'if') {
                // TODO - is this a querySelectorAll or matches here?
                return (selector.subtree !== undefined && querySelectorAll(element, selector.subtree).length !== 0);
            }
            else if (selector.name === 'not') {
                return selector.subtree !== undefined && matches(element, selector.subtree) === false;
            }
            else if (selector.name === 'has-text') {
                const { argument } = selector;
                if (argument === undefined) {
                    return false;
                }
                const text = element.textContent;
                if (text === null) {
                    return false;
                }
                return matchPattern(argument, text);
            }
            else if (selector.name === 'min-text-length') {
                const minLength = Number(selector.argument);
                if (Number.isNaN(minLength) || minLength < 0) {
                    return false;
                }
                const text = element.textContent;
                if (text === null) {
                    return false;
                }
                return text.length >= minLength;
            }
        }
        return false;
    }
    function querySelectorAll(element, selector) {
        const elements = [];
        if (selector.type === 'id' ||
            selector.type === 'class' ||
            selector.type === 'type' ||
            selector.type === 'attribute') {
            elements.push(...element.querySelectorAll(selector.content));
        }
        else if (selector.type === 'list') {
            for (const subSelector of selector.list) {
                elements.push(...querySelectorAll(element, subSelector));
            }
        }
        else if (selector.type === 'compound') {
            // TODO - handling compound needs to be reworked...
            // .cls:upward(1) for example will not work with this implementation.
            // :upward is not about selecting, but transforming a set of nodes (i.e.
            // uBO's transpose method).
            if (selector.compound.length !== 0) {
                elements.push(...querySelectorAll(element, selector.compound[0]).filter((e) => selector.compound.slice(1).every((s) => matches(e, s))));
            }
        }
        else if (selector.type === 'complex') {
            const elements2 = selector.left === undefined ? [element] : querySelectorAll(element, selector.left);
            if (selector.combinator === ' ') {
                for (const element2 of elements2) {
                    elements.push(...querySelectorAll(element2, selector.right));
                }
            }
            else if (selector.combinator === '>') {
                for (const element2 of elements2) {
                    for (const child of element2.children) {
                        if (matches(child, selector.right) === true) {
                            elements.push(child);
                        }
                    }
                }
            }
            else if (selector.combinator === '~') {
                for (const element2 of elements2) {
                    let sibling = element2;
                    while ((sibling = sibling.nextElementSibling) !== null) {
                        if (matches(sibling, selector.right) === true) {
                            elements.push(sibling);
                        }
                    }
                }
            }
            else if (selector.combinator === '+') {
                for (const element2 of elements2) {
                    const nextElementSibling = element2.nextElementSibling;
                    if (nextElementSibling !== null && matches(nextElementSibling, selector.right) === true) {
                        elements.push(nextElementSibling);
                    }
                }
            }
        }
        else if (selector.type === 'pseudo-class') {
            // if (selector.name === 'upward') {
            //   let n = Number(selector.argument);
            //   console.log('upward', selector, n);
            //   if (Number.isNaN(n) === false) {
            //     if (n >= 1 && n < 256) {
            //       let ancestor: Element | null = element;
            //       while (ancestor !== null && n > 0) {
            //         ancestor = ancestor.parentElement;
            //         n -= 1;
            //       }
            //       if (ancestor !== null && n === 0) {
            //         elements.push(element);
            //       }
            //     }
            //   } else if (selector.argument !== undefined) {
            //     const parent = element.parentElement;
            //     if (parent !== null) {
            //       const ancestor = parent.closest(selector.argument);
            //       if (ancestor !== null) {
            //         elements.push(ancestor);
            //       }
            //     }
            //   }
            // } else {
            for (const subElement of element.querySelectorAll('*')) {
                if (matches(subElement, selector) === true) {
                    elements.push(subElement);
                }
            }
            // }
        }
        return elements;
    }

    var SelectorType;
    (function (SelectorType) {
        SelectorType[SelectorType["Normal"] = 0] = "Normal";
        SelectorType[SelectorType["Extended"] = 1] = "Extended";
        SelectorType[SelectorType["Invalid"] = 2] = "Invalid";
    })(SelectorType || (SelectorType = {}));

    /*!
     * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    const SCRIPT_ID = 'cliqz-adblocker-script';
    const IGNORED_TAGS = new Set(['br', 'head', 'link', 'meta', 'script', 'style', 's']);
    function isElement(node) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
        return node.nodeType === 1; // Node.ELEMENT_NODE;
    }
    function getElementsFromMutations(mutations) {
        // Accumulate all nodes which were updated in `nodes`
        const elements = [];
        for (const mutation of mutations) {
            if (mutation.type === 'attributes') {
                if (isElement(mutation.target)) {
                    elements.push(mutation.target);
                }
            }
            else if (mutation.type === 'childList') {
                for (const addedNode of mutation.addedNodes) {
                    if (isElement(addedNode) && addedNode.id !== SCRIPT_ID) {
                        elements.push(addedNode);
                    }
                }
            }
        }
        return elements;
    }
    /**
     * WARNING: this function should be self-contained and not rely on any global
     * symbol. That constraint needs to be fulfilled because this function can
     * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
     * more details).
     */
    function extractFeaturesFromDOM(roots) {
        // NOTE: This cannot be global as puppeteer needs to be able to serialize this function.
        const ignoredTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style', 's']);
        const classes = new Set();
        const hrefs = new Set();
        const ids = new Set();
        for (const root of roots) {
            for (const element of [
                root,
                ...root.querySelectorAll('[id]:not(html):not(body),[class]:not(html):not(body),[href]:not(html):not(body)'),
            ]) {
                if (ignoredTags.has(element.nodeName.toLowerCase())) {
                    continue;
                }
                // Update ids
                const id = element.id;
                if (id) {
                    ids.add(id);
                }
                // Update classes
                const classList = element.classList;
                if (classList) {
                    for (const cls of classList) {
                        classes.add(cls);
                    }
                }
                // Update href
                const href = element.getAttribute('href');
                if (typeof href === 'string') {
                    hrefs.add(href);
                }
            }
        }
        return {
            classes: Array.from(classes),
            hrefs: Array.from(hrefs),
            ids: Array.from(ids),
        };
    }
    class DOMMonitor {
        constructor(cb) {
            this.cb = cb;
            this.knownIds = new Set();
            this.knownHrefs = new Set();
            this.knownClasses = new Set();
            this.observer = null;
        }
        queryAll(window) {
            this.cb({ type: 'elements', elements: [window.document.documentElement] });
            this.handleUpdatedNodes([window.document.documentElement]);
        }
        start(window) {
            if (this.observer === null && window.MutationObserver !== undefined) {
                this.observer = new window.MutationObserver((mutations) => {
                    this.handleUpdatedNodes(getElementsFromMutations(mutations));
                });
                this.observer.observe(window.document.documentElement, {
                    // Monitor some attributes
                    attributes: true,
                    attributeFilter: ['class', 'id', 'href'],
                    childList: true,
                    subtree: true,
                });
            }
        }
        stop() {
            if (this.observer !== null) {
                this.observer.disconnect();
                this.observer = null;
            }
        }
        handleNewFeatures({ hrefs, ids, classes, }) {
            const newIds = [];
            const newClasses = [];
            const newHrefs = [];
            // Update ids
            for (const id of ids) {
                if (this.knownIds.has(id) === false) {
                    newIds.push(id);
                    this.knownIds.add(id);
                }
            }
            for (const cls of classes) {
                if (this.knownClasses.has(cls) === false) {
                    newClasses.push(cls);
                    this.knownClasses.add(cls);
                }
            }
            for (const href of hrefs) {
                if (this.knownHrefs.has(href) === false) {
                    newHrefs.push(href);
                    this.knownHrefs.add(href);
                }
            }
            if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
                this.cb({
                    type: 'features',
                    classes: newClasses,
                    hrefs: newHrefs,
                    ids: newIds,
                });
                return true;
            }
            return false;
        }
        handleUpdatedNodes(elements) {
            if (elements.length !== 0) {
                this.cb({
                    type: 'elements',
                    elements: elements.filter((e) => IGNORED_TAGS.has(e.nodeName.toLowerCase()) === false),
                });
                return this.handleNewFeatures(extractFeaturesFromDOM(elements));
            }
            return false;
        }
    }
    /**
     * Wrap a self-executing script into a block of custom logic to remove the
     * script tag once execution is terminated. This can be useful to not leave
     * traces in the DOM after injections.
     */
    function autoRemoveScript(script) {
        // Minified using 'terser'
        return `try{${script}}catch(c){}!function(){var c=document.currentScript,e=c&&c.parentNode;e&&e.removeChild(c)}();`;
        // Original:
        //
        //    try {
        //      ${script}
        //    } catch (ex) { }
        //
        //    (function() {
        //      var currentScript = document.currentScript;
        //      var parent = currentScript && currentScript.parentNode;
        //
        //      if (parent) {
        //        parent.removeChild(currentScript);
        //      }
        //    })();
    }
    function insertNode(node, document) {
        const parent = document.head || document.documentElement || document;
        if (parent !== null) {
            parent.appendChild(node);
        }
    }
    function injectScriptlet(s, doc) {
        const script = doc.createElement('script');
        script.type = 'text/javascript';
        script.id = SCRIPT_ID;
        script.async = false;
        script.appendChild(doc.createTextNode(autoRemoveScript(s)));
        insertNode(script, doc);
    }
    function isFirefox(doc) {
        var _a, _b, _c;
        try {
            return ((_c = (_b = (_a = doc.defaultView) === null || _a === void 0 ? void 0 : _a.navigator) === null || _b === void 0 ? void 0 : _b.userAgent) === null || _c === void 0 ? void 0 : _c.indexOf('Firefox')) !== -1;
        }
        catch (e) {
            return false;
        }
    }
    async function injectScriptletFirefox(s, doc) {
        const win = doc.defaultView;
        const script = doc.createElement('script');
        script.async = false;
        script.id = SCRIPT_ID;
        const blob = new win.Blob([autoRemoveScript(s)], { type: 'text/javascript; charset=utf-8' });
        const url = win.URL.createObjectURL(blob);
        // a hack for tests to that allows for async URL.createObjectURL
        // eslint-disable-next-line @typescript-eslint/await-thenable
        script.src = await url;
        insertNode(script, doc);
        win.URL.revokeObjectURL(url);
    }
    function injectScript(s, doc) {
        if (isFirefox(doc)) {
            injectScriptletFirefox(s, doc);
        }
        else {
            injectScriptlet(s, doc);
        }
    }

    /*!
     * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    // TODO - move to @cliqz/adblocker-content
    let ACTIVE = true;
    let DOM_MONITOR = null;
    let UPDATE_EXTENDED_TIMEOUT = null;
    const PENDING = new Set();
    const EXTENDED = [];
    const HIDDEN = new Map();
    function unload() {
        if (DOM_MONITOR !== null) {
            DOM_MONITOR.stop();
            DOM_MONITOR = null;
        }
    }
    /**
     * Because all the filters and matching logic lives in the background of the
     * extension, the content script needs a way to request relevant cosmetic
     * filters for each frame. This channel of communication can be handled in
     * several ways (`connect`, `sendMessage`). Here we will make use of
     * `sendMessage` for one-off communications.
     *
     * `getCosmeticsFiltersWithSendMessage` wraps the logic of communicating with
     * the background and will be used to request cosmetics filters for the current
     * frame.
     *
     * The background should listen to these messages and answer back with lists of
     * filters to be injected in the page.
     */
    function getCosmeticsFiltersWithSendMessage(arg) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(Object.assign({ action: 'getCosmeticsFilters' }, arg), (response) => {
                if (response !== undefined) {
                    resolve(response);
                }
            });
        });
    }
    function cachedQuerySelector(root, selector, cache) {
        var _a;
        // First check if we have a result in cache for this node and selector
        const cachedElements = (_a = cache.get(root)) === null || _a === void 0 ? void 0 : _a.get(selector);
        if (cachedElements !== undefined) {
            return cachedElements;
        }
        const selected = new Set(querySelectorAll(root, selector.ast));
        // Cache result for next time!
        if (selector.attribute !== undefined) {
            let cachedSelectors = cache.get(root);
            if (cachedSelectors === undefined) {
                cachedSelectors = new Map();
                cache.set(root, cachedSelectors);
            }
            let cachedSelected = cachedSelectors.get(selector);
            if (cachedSelected === undefined) {
                cachedSelected = new Set();
                cachedSelectors.set(selector, cachedSelected);
            }
            for (const element of selected) {
                cachedSelected.add(element);
            }
        }
        return selected;
    }
    function updateExtended() {
        if (PENDING.size === 0 || EXTENDED.length === 0) {
            return;
        }
        const cache = new Map();
        const elementsToHide = new Map();
        // Since we are processing elements in a delayed fashion, it is possible
        // that some short-lived DOM nodes are already detached. Here we simply
        // ignore them.
        const roots = [...PENDING].filter((e) => e.isConnected === true);
        PENDING.clear();
        for (const root of roots) {
            for (const selector of EXTENDED) {
                for (const element of cachedQuerySelector(root, selector, cache)) {
                    if (selector.remove === true) {
                        element.textContent = '';
                        element.remove();
                    }
                    else if (selector.attribute !== undefined && HIDDEN.has(element) === false) {
                        elementsToHide.set(element, { selector, root });
                    }
                }
            }
        }
        // Hide new nodes if any
        for (const [element, { selector, root }] of elementsToHide.entries()) {
            if (selector.attribute !== undefined) {
                element.setAttribute(selector.attribute, '');
                HIDDEN.set(element, { selector, root });
            }
        }
        // Check if some elements should be un-hidden.
        for (const [element, { selector, root }] of [...HIDDEN.entries()]) {
            if (selector.attribute !== undefined) {
                if (root.isConnected === false ||
                    element.isConnected === false ||
                    cachedQuerySelector(root, selector, cache).has(element) === false) {
                    HIDDEN.delete(element);
                    element.removeAttribute(selector.attribute);
                }
            }
        }
    }
    /**
     * Queue `elements` to be processed asynchronously in a batch way (for
     * efficiency). This is important to not do more work than necessary, for
     * example if the same set of nodes is updated multiple times in a raw on
     * user-interaction (e.g. a dropdown); this allows to only check these nodes
     * once, and to not block the UI.
     */
    function delayedUpdateExtended(elements) {
        // If we do not have any extended filters applied to this frame, then we do
        // not need to do anything. We just ignore.
        if (EXTENDED.length === 0) {
            return;
        }
        // If root DOM element is already part of PENDING, no need to queue other elements.
        if (PENDING.has(window.document.documentElement)) {
            return;
        }
        // Queue up new elements into the global PENDING set, which will be processed
        // in a batch maner from a setTimeout.
        for (const element of elements) {
            // If we get the DOM root then we can clear everything else from the queue
            // since we will be looking at all nodes anyway.
            if (element === window.document.documentElement) {
                PENDING.clear();
                PENDING.add(element);
                break;
            }
            PENDING.add(element);
        }
        // Check if we need to trigger a setTimeout to process pending elements.
        if (UPDATE_EXTENDED_TIMEOUT === null) {
            UPDATE_EXTENDED_TIMEOUT = setTimeout(() => {
                UPDATE_EXTENDED_TIMEOUT = null;
                updateExtended();
            }, 1000);
        }
    }
    function handleResponseFromBackground(window, { active, scripts, extended }) {
        if (active === false) {
            ACTIVE = false;
            unload();
            return;
        }
        else {
            ACTIVE = true;
        }
        // Inject scripts
        if (scripts) {
            for (const script of scripts) {
                try {
                    injectScript(script, window.document);
                }
                catch (e) {
                    // continue regardless of error
                }
            }
        }
        // Extended CSS
        if (extended && extended.length > 0) {
            EXTENDED.push(...extended);
            delayedUpdateExtended([window.document.documentElement]);
        }
    }
    /**
     * Takes care of injecting cosmetic filters in a given window. Responsabilities:
     * - Inject scripts.
     * - Block scripts.
     *
     * NOTE: Custom stylesheets are now injected from background.
     *
     * All this happens by communicating with the background through the
     * `backgroundAction` function (to trigger request the sending of new rules
     * based on a domain or node selectors) and the `handleResponseFromBackground`
     * callback to apply new rules.
     */
    function injectCosmetics(window, enableMutationObserver = true, getCosmeticsFilters = getCosmeticsFiltersWithSendMessage) {
        // Invoked as soon as content-script is injected to ask for background to
        // inject cosmetics and scripts as soon as possible. Some extra elements
        // might be inserted later whenever we know more about the content of the
        // page.
        getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] }).then((response) => handleResponseFromBackground(window, response));
        // On DOMContentLoaded, start monitoring the DOM. This means that we will
        // first check which ids and classes exist in the DOM as a one-off operation;
        // this will allow the injection of selectors which have a chance to match.
        // We also register a MutationObserver which will monitor the addition of new
        // classes and ids, and might trigger extra filters on a per-need basis.
        window.addEventListener('DOMContentLoaded', () => {
            DOM_MONITOR = new DOMMonitor((update) => {
                if (update.type === 'elements') {
                    if (update.elements.length !== 0) {
                        delayedUpdateExtended(update.elements);
                    }
                }
                else {
                    getCosmeticsFilters(Object.assign(Object.assign({}, update), { lifecycle: 'dom-update' })).then((response) => handleResponseFromBackground(window, response));
                }
            });
            DOM_MONITOR.queryAll(window);
            // Start observing mutations to detect new ids and classes which would
            // need to be hidden.
            if (ACTIVE && enableMutationObserver) {
                DOM_MONITOR.start(window);
            }
        }, { once: true, passive: true });
        window.addEventListener('pagehide', unload, { once: true, passive: true });
    }

    /**
     * Ghostery Browser Extension
     * https://www.ghostery.com/
     *
     * Copyright 2017-present Ghostery GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at http://mozilla.org/MPL/2.0
     */


    function getCosmeticsFilters(args) {
      chrome.runtime.sendMessage({
        action: 'getCosmeticsFilters',
        ...args,
      });

      return Promise.resolve({});
    }

    injectCosmetics(window, true, getCosmeticsFilters);

})();
