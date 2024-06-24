import { setPrototypeOf } from './shared/object.js';
import { Document as Document$1 } from './interface/document.js';
import '../../css-select/lib/esm/compile.js';
import '../../css-select/lib/esm/sort.js';
import './dom/string-map.js';
import { illegalConstructor } from './shared/facades.js';
export { Attr, CDATASection, CharacterData, Comment, DocumentFragment, DocumentType, Element, Facades, Node, SVGElement, ShadowRoot, Text } from './shared/facades.js';
export { HTMLTemplateElement } from './html/template-element.js';
export { HTMLScriptElement } from './html/script-element.js';
export { HTMLIFrameElement } from './html/i-frame-element.js';
export { HTMLStyleElement } from './html/style-element.js';
export { HTMLInputElement } from './html/input-element.js';
export { HTMLHeadingElement } from './html/heading-element.js';
export { HTMLCanvasElement } from './html/canvas-element.js';
export { HTMLOptionElement } from './html/option-element.js';
export { HTMLTitleElement } from './html/title-element.js';
export { HTMLSelectElement } from './html/select-element.js';
export { HTMLButtonElement } from './html/button-element.js';
export { HTMLTextAreaElement } from './html/text-area-element.js';
export { HTMLLinkElement } from './html/link-element.js';
export { HTMLSlotElement } from './html/slot-element.js';
export { HTMLImageElement } from './html/image-element.js';
export { HTMLMetaElement } from './html/meta-element.js';
export { HTMLAnchorElement } from './html/anchor-element.js';
export { HTMLSourceElement } from './html/source-element.js';

function Document() {
  illegalConstructor();
}

setPrototypeOf(Document, Document$1).prototype = Document$1.prototype;

export { Document, illegalConstructor };
