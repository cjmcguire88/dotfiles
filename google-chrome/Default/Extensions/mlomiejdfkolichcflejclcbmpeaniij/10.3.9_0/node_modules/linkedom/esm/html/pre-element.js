import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLPreElement
 */
class HTMLPreElement extends HTMLElement {
  constructor(ownerDocument, localName = 'pre') {
    super(ownerDocument, localName);
  }
}

export { HTMLPreElement };
