import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLBodyElement
 */
class HTMLBodyElement extends HTMLElement {
  constructor(ownerDocument, localName = 'body') {
    super(ownerDocument, localName);
  }
}

export { HTMLBodyElement };
