import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLFrameElement
 */
class HTMLFrameElement extends HTMLElement {
  constructor(ownerDocument, localName = 'frame') {
    super(ownerDocument, localName);
  }
}

export { HTMLFrameElement };
