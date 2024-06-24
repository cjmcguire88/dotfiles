import { removeTemplate, getMeta } from '../utils.js';

function resolveNode(host, target, value) {
  removeTemplate(target);

  const meta = getMeta(target);
  meta.startNode = meta.endNode = value;

  target.parentNode.insertBefore(value, target.nextSibling);
}

export { resolveNode as default };
