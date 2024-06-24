import { openTabWithUrl } from '../../utils/tabs.js';
import Session from '../../store/session.js';
import __vite_glob_0_18 from './views/privacy.js';
import __vite_glob_0_24 from './views/websites.js';
import __vite_glob_0_25 from './views/whotracksme.js';
import __vite_glob_0_16 from './views/account.js';
import __vite_glob_0_17 from './views/preview.js';
import __vite_glob_0_21 from './views/trackers.js';
import assets from './assets/index.js';
import router from '../../node_modules/hybrids/src/router.js';
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


const Settings = {
  stack: router([__vite_glob_0_18, __vite_glob_0_24, __vite_glob_0_25, __vite_glob_0_16, __vite_glob_0_17, __vite_glob_0_21]),
  session: store(Session),
  render: {
    value: ({ stack, session }) => html`
      <template layout="contents">
        <gh-settings-layout>
          <a
            href="${router.url(__vite_glob_0_18)}"
            class="${{ active: router.active(__vite_glob_0_18) }}"
            slot="nav"
          >
            <ui-icon name="shield-menu" color="nav" layout="size:3"></ui-icon>
            Privacy protection
          </a>
          <a
            href="${router.url(__vite_glob_0_24)}"
            class="${{
              active:
                router.active(__vite_glob_0_24, { stack: true }) &&
                !router.active(__vite_glob_0_21, { stack: true }),
            }}"
            slot="nav"
          >
            <ui-icon name="websites" color="nav" layout="size:3"></ui-icon>
            Websites
          </a>
          <a
            href="${router.url(__vite_glob_0_21)}"
            class="${{
              active: router.active(__vite_glob_0_21, { stack: true }),
            }}"
            slot="nav"
          >
            <ui-icon name="block-m" color="nav" layout="size:3"></ui-icon>
            Trackers
          </a>
          <a
            href="${router.url(__vite_glob_0_25)}"
            class="${{ active: router.active(__vite_glob_0_25), wrap: true }}"
            slot="nav"
            translate="no"
          >
            <ui-icon name="wtm" color="nav" layout="size:3"></ui-icon>
            WhoTracks.Me
          </a>

          <a
            href="${router.url(__vite_glob_0_16)}"
            class="${{ active: router.active(__vite_glob_0_16), bottom: true }}"
            slot="nav"
          >
            ${store.ready(session) && session.user
              ? html`
                  ${session.contributor
                    ? html`<ui-icon name="contributor"></ui-icon>`
                    : html`<ui-icon name="user" color="nav"></ui-icon>`}
                  <span layout@992px="hidden">My Account</span>
                  <div
                    layout="hidden"
                    layout@992px="column margin:left:2px width::0"
                  >
                    <div>My Account</div>
                    <ui-text type="body-m" ellipsis>${session.email}</ui-text>
                  </div>
                `
              : html`<ui-icon name="user" color="nav"></ui-icon> My Account`}
          </a>
          ${store.ready(session) &&
          html`
            <gh-settings-card
              layout="hidden"
              layout@992px="
              area::6/7 self:end:stretch
              margin:top:2 padding:2 gap content:center
              column
            "
              slot="nav"
            >
              ${session.contributor
                ? html`
                    <img
                      src="${assets['contributor_badge']}"
                      layout="size:12"
                      alt="Contribution"
                      slot="picture"
                    />
                    <div layout="column gap:0.5">
                      <ui-text type="label-l" layout="block:center">
                        You are awesome!
                      </ui-text>
                      <ui-text
                        type="body-s"
                        color="gray-600"
                        layout="block:center"
                      >
                        Thank you for your support in Ghostery's fight for a web
                        where privacy is a basic human right!
                      </ui-text>
                    </div>
                  `
                : html`
                    <img
                      src="${assets['hands']}"
                      layout="size:12"
                      alt="Contribution"
                      slot="picture"
                    />
                    <div layout="column gap:0.5">
                      <ui-text type="label-l" layout="block:center">
                        Become a Contributor
                      </ui-text>
                      <ui-text
                        type="body-s"
                        color="gray-600"
                        layout="block:center"
                      >
                        Help Ghostery fight for a web where privacy is a basic
                        human right.
                      </ui-text>
                      <ui-button layout="margin:top">
                        <a
                          href="https://www.ghostery.com/become-a-contributor?utm_source=gbe"
                          onclick="${openTabWithUrl}"
                        >
                          Become a Contributor
                        </a>
                      </ui-button>
                    </div>
                  `}
            </gh-settings-card>
          `}
          ${stack}
        </gh-settings-layout>
      </template>
    `.css`
      html, body { height: 100%; }
    `,
    shadow: false,
  },
};

export { Settings as default };
