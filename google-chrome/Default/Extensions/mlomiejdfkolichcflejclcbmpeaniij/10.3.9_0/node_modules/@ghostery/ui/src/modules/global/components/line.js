import { html } from '../../../../../../hybrids/src/template/index.js';

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


const __vite_glob_0_3 = {
  color: 'gray-200',
  render: ({ color }) => html`
    <template layout="block height:1px shrink:0"></template>
  `.css`
    :host {
      background: var(--ui-color-${color});
    }
  `,
};

export { __vite_glob_0_3 as default };
