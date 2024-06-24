import { invalidateAll, get, assert, invalidate, observe } from './cache.js';
import { add, clear } from './emitter.js';
import { camelToDash, deferred, walkInShadow } from './utils.js';
import render from './render.js';
import value from './value.js';

const constructors = new WeakMap();

const callbacks = new WeakMap();
const disconnects = new WeakMap();

function connectedCallback(host, set) {
  for (const fn of this.connects) set.add(fn(host));
  for (const fn of this.observers) set.add(fn(host));
}

function compile(hybrids, HybridsElement) {
  if (HybridsElement) {
    const prevHybrids = constructors.get(HybridsElement);
    if (hybrids === prevHybrids) return HybridsElement;

    for (const key of Object.keys(prevHybrids)) {
      if (key === "tag") continue;
      delete HybridsElement.prototype[key];
    }
  } else {
    HybridsElement = class extends globalThis.HTMLElement {
      constructor() {
        super();

        for (const key of HybridsElement.writable) {
          if (hasOwnProperty.call(this, key)) {
            const value = this[key];
            delete this[key];
            this[key] = value;
          } else {
            const value = this.getAttribute(camelToDash(key));

            if (value !== null) {
              this[key] =
                (value === "" && typeof this[key] === "boolean") || value;
            }
          }
        }
      }

      connectedCallback() {
        const set = new Set();
        disconnects.set(this, set);

        const cb = connectedCallback.bind(HybridsElement, this, set);
        callbacks.set(this, cb);
        add(cb);
      }

      disconnectedCallback() {
        clear(callbacks.get(this));

        for (const fn of disconnects.get(this)) {
          if (fn) fn();
        }

        invalidateAll(this);
      }
    };
  }

  constructors.set(HybridsElement, Object.freeze(hybrids));

  const connects = new Set();
  const observers = new Set();
  const writable = new Set();

  for (const key of Object.keys(hybrids)) {
    if (key === "tag") continue;

    let desc = hybrids[key];

    if (typeof desc !== "object" || desc === null) {
      desc = { value: desc };
    } else if (!hasOwnProperty.call(desc, "value")) {
      throw TypeError(
        `The 'value' option is required for '${key}' property of the '${hybrids.tag}' element`,
      );
    }

    desc = key === "render" ? render(desc) : value(key, desc);

    if (desc.writable) {
      writable.add(key);
    }

    Object.defineProperty(HybridsElement.prototype, key, {
      get: function get$1() {
        return get(this, key, desc.value);
      },
      set: desc.writable
        ? function assert$1(newValue) {
            assert(this, key, newValue);
          }
        : undefined,
      enumerable: true,
      configurable: true,
    });

    if (desc.connect) {
      connects.add((host) =>
        desc.connect(host, key, () => {
          invalidate(host, key);
        }),
      );
    }

    if (desc.observe) {
      observers.add((host) =>
        observe(host, key, desc.value, desc.observe),
      );
    }
  }

  HybridsElement.connects = connects;
  HybridsElement.observers = observers;
  HybridsElement.writable = writable;

  return HybridsElement;
}

const updateQueue = new Map();
function update(HybridsElement) {
  if (!updateQueue.size) {
    deferred.then(() => {
      walkInShadow(globalThis.document.body, (node) => {
        if (updateQueue.has(node.constructor)) {
          const prevHybrids = updateQueue.get(node.constructor);
          const hybrids = constructors.get(node.constructor);
          node.disconnectedCallback();

          for (const key of Object.keys(hybrids)) {
            const type = typeof hybrids[key];
            const clearValue =
              type !== "object" &&
              type !== "function" &&
              hybrids[key] !== prevHybrids[key];

            if (clearValue) node.removeAttribute(camelToDash(key));
            invalidate(node, key, { clearValue });
          }

          node.connectedCallback();
        }
      });
      updateQueue.clear();
    });
  }
  updateQueue.set(HybridsElement, constructors.get(HybridsElement));
}

const tags = new Set();
function define(hybrids) {
  if (!hybrids.tag) {
    throw TypeError(
      "Error while defining an element: 'tag' property with dashed tag name is required",
    );
  }

  if (tags.has(hybrids.tag)) {
    throw TypeError(
      `Error while defining '${hybrids.tag}' element: tag name is already defined`,
    );
  }

  if (!tags.size) deferred.then(() => tags.clear());
  tags.add(hybrids.tag);

  const HybridsElement = globalThis.customElements.get(hybrids.tag);

  if (HybridsElement) {
    if (constructors.get(HybridsElement)) {
      update(HybridsElement);
      compile(hybrids, HybridsElement);

      return hybrids;
    }

    throw TypeError(
      `Custom element with '${hybrids.tag}' tag name already defined outside of the hybrids context`,
    );
  }

  globalThis.customElements.define(hybrids.tag, compile(hybrids));

  return hybrids;
}

function from(components, { root = "", prefix } = {}) {
  for (const key of Object.keys(components)) {
    const hybrids = components[key];

    if (!hybrids.tag) {
      const tag = camelToDash(
        []
          .concat(root)
          .reduce((acc, root) => acc.replace(root, ""), key)
          .replace(/^[./]+/, "")
          .replace(/\//g, "-")
          .replace(/\.[a-zA-Z]+$/, ""),
      );

      hybrids.tag = prefix ? `${prefix}-${tag}` : tag;
    }

    define(hybrids);
  }

  return components;
}

const define$1 = Object.freeze(
  Object.assign(define, {
    compile: (hybrids) => compile(hybrids),
    from,
  }),
);

export { constructors, define$1 as default };
