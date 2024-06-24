import { ELEMENT_NODE } from '../shared/constants.js';
import { nextSibling, previousSibling } from '../shared/node.js';

// https://dom.spec.whatwg.org/#nondocumenttypechildnode
// CharacterData, Element


const nextElementSibling = node => {
  let next = nextSibling(node);
  while (next && next.nodeType !== ELEMENT_NODE)
    next = nextSibling(next);
  return next;
};

const previousElementSibling = node => {
  let prev = previousSibling(node);
  while (prev && prev.nodeType !== ELEMENT_NODE)
    prev = previousSibling(prev);
  return prev;
};

export { nextElementSibling, previousElementSibling };
