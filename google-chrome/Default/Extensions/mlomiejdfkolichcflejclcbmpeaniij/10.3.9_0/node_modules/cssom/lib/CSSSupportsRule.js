import { __exports as CSSSupportsRule } from '../../../virtual/CSSSupportsRule.js';
import './CSSRule.js';
import './CSSGroupingRule.js';
import './CSSConditionRule.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';
import { __exports as CSSGroupingRule } from '../../../virtual/CSSGroupingRule.js';
import { __exports as CSSConditionRule } from '../../../virtual/CSSConditionRule.js';

//.CommonJS
var CSSOM = {
  CSSRule: CSSRule.CSSRule,
  CSSGroupingRule: CSSGroupingRule.CSSGroupingRule,
  CSSConditionRule: CSSConditionRule.CSSConditionRule
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
CSSOM.CSSSupportsRule = function CSSSupportsRule() {
  CSSOM.CSSConditionRule.call(this);
};

CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
CSSOM.CSSSupportsRule.prototype.type = 12;

Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];

    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }

    return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
  }
});

//.CommonJS
CSSSupportsRule.CSSSupportsRule = CSSOM.CSSSupportsRule;

export { CSSSupportsRule as default };
