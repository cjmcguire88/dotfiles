import { isNotParsing } from './parse-from-string.js';

const childNodesWM = new WeakMap;
const childrenWM = new WeakMap;
const querySelectorWM = new WeakMap;
const querySelectorAllWM = new WeakMap;

const get = (wm, self, method) => {
  if (wm.has(self))
    return wm.get(self);
  const value = method.call(self);
  wm.set(self, value);
  return value;
};

const reset = parentNode => {
  if (isNotParsing()) {
    while (parentNode) {
      childNodesWM.delete(parentNode);
      childrenWM.delete(parentNode);
      querySelectorWM.delete(parentNode);
      querySelectorAllWM.delete(parentNode);
      parentNode = parentNode.parentNode;
    }
  }
};

export { childNodesWM, childrenWM, get, querySelectorAllWM, querySelectorWM, reset };
