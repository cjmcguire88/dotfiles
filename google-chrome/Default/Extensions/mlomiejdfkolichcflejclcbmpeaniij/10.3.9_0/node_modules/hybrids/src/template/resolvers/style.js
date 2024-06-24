import { stringifyElement, camelToDash } from '../../utils.js';

const styleMap = new WeakMap();

function resolveStyle(host, target, value) {
  if (value === null || typeof value !== "object") {
    throw TypeError(
      `Style value must be an object in ${stringifyElement(target)}:`,
      value,
    );
  }

  const previousMap = styleMap.get(target) || new Map();

  const nextMap = new Map();

  for (const key of Object.keys(value)) {
    const dashKey = camelToDash(key);
    const styleValue = value[key];

    if (!styleValue && styleValue !== 0) {
      target.style.removeProperty(dashKey);
    } else {
      target.style.setProperty(dashKey, styleValue);
    }

    nextMap.set(dashKey, styleValue);
    previousMap.delete(dashKey);
  }

  for (const key of previousMap.keys()) {
    target.style[key] = "";
  }

  styleMap.set(target, nextMap);
}

export { resolveStyle as default };
