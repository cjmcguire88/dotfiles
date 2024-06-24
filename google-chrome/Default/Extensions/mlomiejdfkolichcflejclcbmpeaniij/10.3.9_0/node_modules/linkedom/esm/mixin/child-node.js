import { ELEMENT_NODE } from '../shared/constants.js';
import { NEXT, PREV } from '../shared/symbols.js';
import { getEnd, setAdjacent } from '../shared/utils.js';
import { moCallback } from '../interface/mutation-observer.js';
import { disconnectedCallback } from '../interface/custom-element-registry.js';

// https://dom.spec.whatwg.org/#childnode
// CharacterData, DocumentType, Element


const asFragment = (ownerDocument, nodes) => {
  const fragment = ownerDocument.createDocumentFragment();
  fragment.append(...nodes);
  return fragment;
};

const before = (node, nodes) => {
  const {ownerDocument, parentNode} = node;
  if (parentNode)
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      node
    );
};

const after = (node, nodes) => {
  const {ownerDocument, parentNode} = node;
  if (parentNode)
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      getEnd(node)[NEXT]
    );
};

const replaceWith = (node, nodes) => {
  const {ownerDocument, parentNode} = node;
  if (parentNode) {
    if (nodes.includes(node))
      replaceWith(node, [node = node.cloneNode()]);
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      node
    );
    node.remove();
  }
};

const remove = (prev, current, next) => {
  const {parentNode, nodeType} = current;
  if (prev || next) {
    setAdjacent(prev, next);
    current[PREV] = null;
    getEnd(current)[NEXT] = null;
  }
  if (parentNode) {
    current.parentNode = null;
    moCallback(current, parentNode);
    if (nodeType === ELEMENT_NODE)
      disconnectedCallback(current);
  }
};

export { after, before, remove, replaceWith };
