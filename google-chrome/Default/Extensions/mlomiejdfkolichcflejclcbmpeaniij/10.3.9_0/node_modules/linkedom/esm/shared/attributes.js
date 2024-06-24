import { NEXT, PREV, CLASS_LIST, VALUE } from './symbols.js';
import { knownSiblings, knownAdjacent } from './utils.js';
import { attributeChangedCallback as attributeChangedCallback$1 } from '../interface/custom-element-registry.js';
import { attributeChangedCallback } from '../interface/mutation-observer.js';

const emptyAttributes = new Set([
  'allowfullscreen',
  'allowpaymentrequest',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'class',
  'contenteditable',
  'controls',
  'default',
  'defer',
  'disabled',
  'draggable',
  'formnovalidate',
  'hidden',
  'id',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
  'style',
  'truespeed'
]);

const setAttribute = (element, attribute) => {
  const {[VALUE]: value, name} = attribute;
  attribute.ownerElement = element;
  knownSiblings(element, attribute, element[NEXT]);
  if (name === 'class')
    element.className = value;
  attributeChangedCallback(element, name, null);
  attributeChangedCallback$1(element, name, null, value);
};

const removeAttribute = (element, attribute) => {
  const {[VALUE]: value, name} = attribute;
  knownAdjacent(attribute[PREV], attribute[NEXT]);
  attribute.ownerElement = attribute[PREV] = attribute[NEXT] = null;
  if (name === 'class')
    element[CLASS_LIST] = null;
  attributeChangedCallback(element, name, value);
  attributeChangedCallback$1(element, name, value, null);
};

const booleanAttribute = {
  get(element, name) {
    return element.hasAttribute(name);
  },
  set(element, name, value) {
    if (value)
      element.setAttribute(name, '');
    else
      element.removeAttribute(name);
  }
};

const numericAttribute = {
  get(element, name) {
    return parseFloat(element.getAttribute(name) || 0);
  },
  set(element, name, value) {
    element.setAttribute(name, value);
  }
};

const stringAttribute = {
  get(element, name) {
    return element.getAttribute(name) || '';
  },
  set(element, name, value) {
    element.setAttribute(name, value);
  }
};

/* oddly enough, this apparently is not a thing
export const nullableAttribute = {
  get(element, name) {
    return element.getAttribute(name);
  },
  set(element, name, value) {
    if (value === null)
      element.removeAttribute(name);
    else
      element.setAttribute(name, value);
  }
};
*/

export { booleanAttribute, emptyAttributes, numericAttribute, removeAttribute, setAttribute, stringAttribute };
