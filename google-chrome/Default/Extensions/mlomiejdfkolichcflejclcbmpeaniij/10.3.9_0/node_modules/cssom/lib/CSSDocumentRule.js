import { __exports as CSSDocumentRule } from '../../../virtual/CSSDocumentRule.js';
import './CSSRule.js';
import './MatcherList.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';
import { __exports as MatcherList } from '../../../virtual/MatcherList.js';

//.CommonJS
var CSSOM = {
    CSSRule: CSSRule.CSSRule,
    MatcherList: MatcherList.MatcherList
};
///CommonJS


/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
CSSOM.CSSDocumentRule = function CSSDocumentRule() {
    CSSOM.CSSRule.call(this);
    this.matcher = new CSSOM.MatcherList();
    this.cssRules = [];
};

CSSOM.CSSDocumentRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSDocumentRule.prototype.constructor = CSSOM.CSSDocumentRule;
CSSOM.CSSDocumentRule.prototype.type = 10;
//FIXME
//CSSOM.CSSDocumentRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSDocumentRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSDocumentRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];
    for (var i=0, length=this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
    }
    return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
  }
});


//.CommonJS
CSSDocumentRule.CSSDocumentRule = CSSOM.CSSDocumentRule;

export { CSSDocumentRule as default };
