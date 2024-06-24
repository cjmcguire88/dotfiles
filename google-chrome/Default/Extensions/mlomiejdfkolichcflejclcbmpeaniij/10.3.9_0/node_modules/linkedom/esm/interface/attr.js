import { ATTRIBUTE_NODE } from '../shared/constants.js';
import { VALUE, CHANGED } from '../shared/symbols.js';
import { String as $String, ignoreCase } from '../shared/utils.js';
import { attrAsJSON } from '../shared/jsdon.js';
import { emptyAttributes } from '../shared/attributes.js';
import { attributeChangedCallback } from './mutation-observer.js';
import { attributeChangedCallback as attributeChangedCallback$1 } from './custom-element-registry.js';
import { Node } from './node.js';
import { escape } from '../shared/text-escaper.js';

const QUOTE = /"/g;

/**
 * @implements globalThis.Attr
 */
class Attr extends Node {
  constructor(ownerDocument, name, value = '') {
    super(ownerDocument, name, ATTRIBUTE_NODE);
    this.ownerElement = null;
    this.name = $String(name);
    this[VALUE] = $String(value);
    this[CHANGED] = false;
  }

  get value() { return this[VALUE]; }
  set value(newValue) {
    const {[VALUE]: oldValue, name, ownerElement} = this;
    this[VALUE] = $String(newValue);
    this[CHANGED] = true;
    if (ownerElement) {
      attributeChangedCallback(ownerElement, name, oldValue);
      attributeChangedCallback$1(ownerElement, name, oldValue, this[VALUE]);
    }
  }

  cloneNode() {
    const {ownerDocument, name, [VALUE]: value} = this;
    return new Attr(ownerDocument, name, value);
  }

  toString() {
    const {name, [VALUE]: value} = this;
    if (emptyAttributes.has(name) && !value) {
      return ignoreCase(this) ? name : `${name}=""`;
    }
    const escapedValue = ignoreCase(this) ? value.replace(QUOTE, '&quot;') : escape(value);
    return `${name}="${escapedValue}"`;
  }

  toJSON() {
    const json = [];
    attrAsJSON(this, json);
    return json;
  }
}

export { Attr };
