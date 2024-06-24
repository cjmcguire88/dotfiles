import '../../node_modules/@ghostery/ui/src/modules/onboarding/index.js';
import { setupIframe, closeIframe } from '../../node_modules/@ghostery/ui/src/utils/iframe.js';
import Stats from '../../store/tab-stats.js';
import Options from '../../store/options.js';
import mount from '../../node_modules/hybrids/src/mount.js';
import store from '../../node_modules/hybrids/src/store.js';
import { html } from '../../node_modules/hybrids/src/template/index.js';

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


setupIframe();

async function close(host, event) {
  await store.set(Options, {
    onboarding: event.type === 'ignore' ? { shownAt: Date.now() } : null,
  });

  closeIframe(false, true);
}

mount(document.body, {
  stats: store(Stats),
  render: ({ stats }) => html`
    <ui-onboarding-iframe
      trackers="${store.ready(stats) ? stats.trackers.length : 0}"
      onignore="${close}"
      onenable="${close}"
    ></ui-onboarding-iframe>
  `,
});
