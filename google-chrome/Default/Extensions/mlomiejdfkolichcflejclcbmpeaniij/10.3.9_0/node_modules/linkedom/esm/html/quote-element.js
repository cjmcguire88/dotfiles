import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLQuoteElement
 */
class HTMLQuoteElement extends HTMLElement {
  constructor(ownerDocument, localName = 'quote') {
    super(ownerDocument, localName);
  }
}

export { HTMLQuoteElement };
