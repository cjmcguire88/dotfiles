import '../../node_modules/@ghostery/ui/src/modules/trackers-preview/index.js';
import { getStats, updateIframeHeight, close, disable } from '../../node_modules/@ghostery/trackers-preview/src/page_scripts/index.js';
import mount from '../../node_modules/hybrids/src/mount.js';
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


const domain = new URLSearchParams(window.location.search).get('domain');
const stats = getStats(domain);

updateIframeHeight();

mount(document.body, {
  render: () => html`
    <template layout="block">
      <ui-trackers-preview
        stats="${stats}"
        domain="${domain}"
        onclose="${close}"
        ondisable="${disable}"
      ></ui-trackers-preview>
    </template>
  `,
});
