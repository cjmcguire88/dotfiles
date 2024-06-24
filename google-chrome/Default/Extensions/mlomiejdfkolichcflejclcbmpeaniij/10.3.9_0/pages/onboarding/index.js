import '../../node_modules/@ghostery/ui/src/modules/onboarding/index.js';
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


async function updateOptions(host, event) {
  const success = event.type === 'success';

  await store.set(Options, {
    terms: success,
    onboarding: { done: true },
  });

  chrome.runtime.sendMessage({
    action: 'telemetry',
    event: 'install_complete',
  });
}

mount(document.body, {
  render: () => html`
    <ui-onboarding
      platform="${"chrome"}"
      onsuccess="${updateOptions}"
      onskip="${updateOptions}"
    ></ui-onboarding>
  `,
});

store.resolve(Options).then(({ installDate, onboarding }) => {
  // Get install date from `onboarding.shownAt` or generate current date
  if (!installDate) {
    installDate = (
      onboarding.shownAt ? new Date(onboarding.shownAt) : new Date()
    )
      .toISOString()
      .split('T')[0];
  }

  store.set(Options, {
    onboarding: {
      shownAt: Date.now(),
      shown: onboarding.shown + 1,
    },
    installDate,
  });
});
