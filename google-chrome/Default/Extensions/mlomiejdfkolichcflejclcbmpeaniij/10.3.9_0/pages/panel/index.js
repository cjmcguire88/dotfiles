import '../../node_modules/@ghostery/ui/src/modules/panel/index.js';
import Home from './views/home.js';
import __vite_glob_0_0 from './components/alert.js';
import __vite_glob_0_1 from './components/button.js';
import __vite_glob_0_2 from './components/card.js';
import __vite_glob_0_3 from './components/container.js';
import __vite_glob_0_4 from './components/copy.js';
import __vite_glob_0_5 from './components/dialog.js';
import __vite_glob_0_6 from './components/feedback.js';
import __vite_glob_0_7 from './components/menu-item.js';
import __vite_glob_0_8 from './components/navigation-card.js';
import __vite_glob_0_9 from './components/notification.js';
import __vite_glob_0_10 from './components/options-item.js';
import __vite_glob_0_11 from './components/options.js';
import __vite_glob_0_12 from './components/pause.js';
import __vite_glob_0_14 from './views/navigation.js';
import __vite_glob_0_15 from './views/protection-status.js';
import __vite_glob_0_16 from './views/tracker-details.js';
import define from '../../node_modules/hybrids/src/define.js';
import mount from '../../node_modules/hybrids/src/mount.js';
import router from '../../node_modules/hybrids/src/router.js';
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

// Define components and views
define.from(
  /* #__PURE__ */ Object.assign({"./components/alert.js": __vite_glob_0_0,"./components/button.js": __vite_glob_0_1,"./components/card.js": __vite_glob_0_2,"./components/container.js": __vite_glob_0_3,"./components/copy.js": __vite_glob_0_4,"./components/dialog.js": __vite_glob_0_5,"./components/feedback.js": __vite_glob_0_6,"./components/menu-item.js": __vite_glob_0_7,"./components/navigation-card.js": __vite_glob_0_8,"./components/notification.js": __vite_glob_0_9,"./components/options-item.js": __vite_glob_0_10,"./components/options.js": __vite_glob_0_11,"./components/pause.js": __vite_glob_0_12,"./views/home.js": Home,"./views/navigation.js": __vite_glob_0_14,"./views/protection-status.js": __vite_glob_0_15,"./views/tracker-details.js": __vite_glob_0_16


}),
  {
    root: ['components', 'views'],
    prefix: 'gh-panel',
  },
);

// Mount the app
mount(document.body, {
  stack: router([Home]),
  render: ({ stack }) => html`
    <template layout="row width:full:350px">${stack}</template>
  `,
});

/* Ping telemetry on panel open */
chrome.runtime.sendMessage({ action: 'telemetry', event: 'engaged' });

// Close window when anchor is clicked
document.addEventListener('click', (event) => {
  let el = event.target;
  while (el && !el.href) el = el.parentElement;

  if (!el) return;

  // Timeout is required to prevent from closing the window before the anchor is opened
  if (el.origin !== location.origin || el.pathname !== location.pathname) {
    setTimeout(window.close, 50);
  }
});
