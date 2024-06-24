import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLModElement
 */
class HTMLModElement extends HTMLElement {
  constructor(ownerDocument, localName = 'mod') {
    super(ownerDocument, localName);
  }
}

export { HTMLModElement };
