import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLDetailsElement
 */
class HTMLDetailsElement extends HTMLElement {
  constructor(ownerDocument, localName = 'details') {
    super(ownerDocument, localName);
  }
}

export { HTMLDetailsElement };
