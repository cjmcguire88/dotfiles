import { html } from '../../../node_modules/hybrids/src/template/index.js';

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


const __vite_glob_0_1 = {
  disabled: false,
  render: ({ disabled }) => html`
    <template layout="grid">
      <ui-panel-action layout="height:5" disabled=${disabled}>
        <button layout="padding:1:1.5">
          <ui-text type="label-m" layout="row gap:0.5">
            <slot></slot>
          </ui-text>
        </button>
      </ui-panel-action>
    </template>
  `,
};

export { __vite_glob_0_1 as default };
