import { Event as GlobalEvent } from './event.js';

// https://dom.spec.whatwg.org/#interface-customevent


/**
 * @implements globalThis.CustomEvent
 */
class CustomEvent extends GlobalEvent {
  constructor(type, eventInitDict = {}) {
    super(type, eventInitDict);
    this.detail = eventInitDict.detail;
  }
}

/* c8 ignore stop */

export { CustomEvent };
