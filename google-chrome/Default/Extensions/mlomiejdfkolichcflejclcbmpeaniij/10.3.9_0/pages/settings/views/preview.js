import router from '../../../node_modules/hybrids/src/router.js';
import { html } from '../../../node_modules/hybrids/src/template/index.js';

const __vite_glob_0_17 = {
  [router.connect]: { dialog: true },
  src: '',
  title: '',
  description: '',
  render: ({ src, title, description }) => html`
    <template layout="block">
      <gh-settings-preview-dialog>
        <img src="${src}" />
        <div layout="block:center column gap:0.5" slot="footer">
          <ui-text type="headline-s">${title}</ui-text>
          <ui-text color="gray-600">${description}</ui-text>
        </div>
      </gh-settings-preview-dialog>
    </template>
  `,
};

export { __vite_glob_0_17 as default };
