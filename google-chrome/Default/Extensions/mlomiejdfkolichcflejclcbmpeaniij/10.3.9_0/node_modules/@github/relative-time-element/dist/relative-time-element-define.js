import { RelativeTimeElement } from './relative-time-element.js';
export { RelativeTimeUpdatedEvent } from './relative-time-element.js';

const root = (typeof globalThis !== 'undefined' ? globalThis : window);
try {
    root.RelativeTimeElement = RelativeTimeElement.define();
}
catch (e) {
    if (!(root.DOMException && e instanceof DOMException && e.name === 'NotSupportedError') &&
        !(e instanceof ReferenceError)) {
        throw e;
    }
}

export { RelativeTimeElement, RelativeTimeElement as default };
