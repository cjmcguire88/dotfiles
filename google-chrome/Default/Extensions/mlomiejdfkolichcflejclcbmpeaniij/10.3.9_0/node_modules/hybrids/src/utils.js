const camelToDashMap = new Map();
function camelToDash(str) {
  let result = camelToDashMap.get(str);
  if (result === undefined) {
    result = str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    camelToDashMap.set(str, result);
  }
  return result;
}

function dispatch(host, eventType, options = {}) {
  return host.dispatchEvent(
    new globalThis.CustomEvent(eventType, { bubbles: false, ...options }),
  );
}

function stringifyElement(target) {
  return `<${String(target.tagName).toLowerCase()}>`;
}

function walkInShadow(target, cb) {
  if (target.nodeType === globalThis.Node.ELEMENT_NODE) {
    cb(target);

    if (target.shadowRoot) {
      walkInShadow(target.shadowRoot, cb);
    }
  }

  const walker = globalThis.document.createTreeWalker(
    target,
    globalThis.NodeFilter.SHOW_ELEMENT,
    null,
    false,
  );

  while (walker.nextNode()) {
    const el = walker.currentNode;
    cb(el);
    if (el.shadowRoot) {
      walkInShadow(el.shadowRoot, cb);
    }
  }
}

const deferred = Promise.resolve();
const storePointer = new WeakMap();

export { camelToDash, deferred, dispatch, storePointer, stringifyElement, walkInShadow };
