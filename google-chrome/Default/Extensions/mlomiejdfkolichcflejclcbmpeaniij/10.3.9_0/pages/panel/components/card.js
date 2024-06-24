import { html } from '../../../node_modules/hybrids/src/template/index.js';

const __vite_glob_0_2 = {
  type: { value: '', reflect: true },
  render: () => html`
    <template layout="block padding:1.5">
      <slot></slot>
    </template>
  `.css`
    :host {
      background: var(--ui-color-gray-100);
      border-radius: 8px;
    }

    :host([type="info"]) {
      background: var(--ui-color-primary-100);
    }
  `,
};

export { __vite_glob_0_2 as default };
