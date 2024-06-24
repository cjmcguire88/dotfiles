import { HTMLElement } from './element.js';

/**
 * @implements globalThis.HTMLTrackElement
 */
class HTMLTrackElement extends HTMLElement {
  constructor(ownerDocument, localName = 'track') {
    super(ownerDocument, localName);
  }
}

export { HTMLTrackElement };
