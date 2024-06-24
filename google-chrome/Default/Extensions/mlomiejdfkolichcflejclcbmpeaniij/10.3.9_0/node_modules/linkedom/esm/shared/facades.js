import { Attr as Attr$1 } from '../interface/attr.js';
import { CharacterData as CharacterData$1 } from '../interface/character-data.js';
import { CDATASection as CDATASection$1 } from '../interface/cdata-section.js';
import { Comment as Comment$1 } from '../interface/comment.js';
import { DocumentFragment as DocumentFragment$1 } from '../interface/document-fragment.js';
import { DocumentType as DocumentType$1 } from '../interface/document-type.js';
import { Element as Element$1 } from '../interface/element.js';
import { Node as Node$1 } from '../interface/node.js';
import { ShadowRoot as ShadowRoot$1 } from '../interface/shadow-root.js';
import { Text as Text$1 } from '../interface/text.js';
import { SVGElement as SVGElement$1 } from '../svg/element.js';
import { setPrototypeOf } from './object.js';

/* c8 ignore start */
const illegalConstructor = () => {
  throw new TypeError('Illegal constructor');
};

function Attr() { illegalConstructor(); }
setPrototypeOf(Attr, Attr$1);
Attr.prototype = Attr$1.prototype;

function CDATASection() { illegalConstructor(); }
setPrototypeOf(CDATASection, CDATASection$1);
CDATASection.prototype = CDATASection$1.prototype;

function CharacterData() { illegalConstructor(); }
setPrototypeOf(CharacterData, CharacterData$1);
CharacterData.prototype = CharacterData$1.prototype;

function Comment() { illegalConstructor(); }
setPrototypeOf(Comment, Comment$1);
Comment.prototype = Comment$1.prototype;

function DocumentFragment() { illegalConstructor(); }
setPrototypeOf(DocumentFragment, DocumentFragment$1);
DocumentFragment.prototype = DocumentFragment$1.prototype;

function DocumentType() { illegalConstructor(); }
setPrototypeOf(DocumentType, DocumentType$1);
DocumentType.prototype = DocumentType$1.prototype;

function Element() { illegalConstructor(); }
setPrototypeOf(Element, Element$1);
Element.prototype = Element$1.prototype;

function Node() { illegalConstructor(); }
setPrototypeOf(Node, Node$1);
Node.prototype = Node$1.prototype;

function ShadowRoot() { illegalConstructor(); }
setPrototypeOf(ShadowRoot, ShadowRoot$1);
ShadowRoot.prototype = ShadowRoot$1.prototype;

function Text() { illegalConstructor(); }
setPrototypeOf(Text, Text$1);
Text.prototype = Text$1.prototype;

function SVGElement() { illegalConstructor(); }
setPrototypeOf(SVGElement, SVGElement$1);
SVGElement.prototype = SVGElement$1.prototype;
/* c8 ignore stop */

const Facades = {
  Attr,
  CDATASection,
  CharacterData,
  Comment,
  DocumentFragment,
  DocumentType,
  Element,
  Node,
  ShadowRoot,
  Text,
  SVGElement
};

export { Attr, CDATASection, CharacterData, Comment, DocumentFragment, DocumentType, Element, Facades, Node, SVGElement, ShadowRoot, Text, illegalConstructor };
