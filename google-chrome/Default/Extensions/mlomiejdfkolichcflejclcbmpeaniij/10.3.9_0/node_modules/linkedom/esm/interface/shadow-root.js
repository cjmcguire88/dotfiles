import { DOCUMENT_FRAGMENT_NODE } from '../shared/constants.js';
import { getInnerHtml, setInnerHtml } from '../mixin/inner-html.js';
import { NonElementParentNode } from '../mixin/non-element-parent-node.js';

/**
 * @implements globalThis.ShadowRoot
 */
class ShadowRoot extends NonElementParentNode {
  constructor(host) {
    super(host.ownerDocument, '#shadow-root', DOCUMENT_FRAGMENT_NODE);
    this.host = host;
  }

  get innerHTML() {
    return getInnerHtml(this);
  }
  set innerHTML(html) {
    setInnerHtml(this, html);
  }
}

export { ShadowRoot };
