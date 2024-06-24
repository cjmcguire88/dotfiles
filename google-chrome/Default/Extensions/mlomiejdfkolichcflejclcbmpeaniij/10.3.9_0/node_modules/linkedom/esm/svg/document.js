import { MIME } from '../shared/symbols.js';
import { Document } from '../interface/document.js';

/**
 * @implements globalThis.Document
 */
class SVGDocument extends Document {
  constructor() { super('image/svg+xml'); }
  toString() {
    return this[MIME].docType + super.toString();
  }
}

export { SVGDocument };
