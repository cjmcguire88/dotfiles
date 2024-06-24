import '../../node_modules/@ghostery/ui/src/modules/onboarding/index.js';
import { setupIframe, closeIframe } from '../../node_modules/@ghostery/ui/src/utils/iframe.js';
import { openTabWithUrl } from '../../utils/tabs.js';
import Options from '../../store/options.js';
import mount from '../../node_modules/hybrids/src/mount.js';
import { html } from '../../node_modules/hybrids/src/template/index.js';
import store from '../../node_modules/hybrids/src/store.js';

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


setupIframe(360);

async function updateOptions() {
  const options = await store.resolve(Options);

  return store.set(options, {
    onboarding: {
      serpShown: options.onboarding.serpShown + 1,
      serpShownAt: Date.now(),
    },
  });
}

async function enable(host, event) {
  try {
    openTabWithUrl(host, event);
    await updateOptions();

    closeIframe(false, true);
  } catch (e) {
    document.body.outerHTML = '';
  }
}

async function ignore() {
  try {
    await updateOptions();

    closeIframe(false, true);
  } catch (e) {
    document.body.outerHTML = '';
  }
}

mount(document.body, {
  render: () => html`
    <ui-onboarding-serp
      onenable="${enable}"
      onignore="${ignore}"
      href="https://www.ghostery.com/blog/block-search-engine-ads-on-opera-guide?utm_source=gbe&utm_campaign=opera_serp"
    ></ui-onboarding-serp>
  `,
});
