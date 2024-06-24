// used in Attr to signal changes
const CHANGED = Symbol('changed');

// used in Element to setup once classList
const CLASS_LIST = Symbol('classList');

// used in Document to attach once customElements
const CUSTOM_ELEMENTS = Symbol('CustomElements');

// used in HTMLTemplateElement
const CONTENT = Symbol('content');

// used in Element for data attributes
const DATASET = Symbol('dataset');

// used in Document to attach the DocType
const DOCTYPE = Symbol('doctype');

// used in parser and Document to attach once a DOMParser
const DOM_PARSER = Symbol('DOMParser');

// used to reference an end node
const END = Symbol('end');

// used in Document to make the globalThis an event target
const EVENT_TARGET = Symbol('EventTarget');

// used to augment a created document defaultView
const GLOBALS = Symbol('globals');

// used in both Canvas and Document to provide images
const IMAGE = Symbol('image');

// used to define Document mime type
const MIME = Symbol('mime');

// used in Document to attach once MutationObserver
const MUTATION_OBSERVER = Symbol('MutationObserver');

// used to define next node reference
const NEXT = Symbol('next');

// used to define Attr owner elements
const OWNER_ELEMENT = Symbol('ownerElement');

// used to define previous node reference
const PREV = Symbol('prev');

// used to define various "private" properties
const PRIVATE = Symbol('private');

// used to define the CSSStyleSheet.sheet
const SHEET = Symbol('sheet');

// used to define start node reference
const START = Symbol('start');

// used to define special CSS style attribute
const STYLE = Symbol('style');

// used to upgrade Custom Elements
const UPGRADE = Symbol('upgrade');

// used to define generic values
const VALUE = Symbol('value');

export { CHANGED, CLASS_LIST, CONTENT, CUSTOM_ELEMENTS, DATASET, DOCTYPE, DOM_PARSER, END, EVENT_TARGET, GLOBALS, IMAGE, MIME, MUTATION_OBSERVER, NEXT, OWNER_ELEMENT, PREV, PRIVATE, SHEET, START, STYLE, UPGRADE, VALUE };
