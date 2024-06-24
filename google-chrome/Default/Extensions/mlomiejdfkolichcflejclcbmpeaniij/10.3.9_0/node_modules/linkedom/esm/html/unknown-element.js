import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLUnknownElement
 */
class HTMLUnknownElement extends HTMLElement {
  constructor(ownerDocument, localName = 'unknown') {
    super(ownerDocument, localName);
  }
}

export { HTMLUnknownElement };
