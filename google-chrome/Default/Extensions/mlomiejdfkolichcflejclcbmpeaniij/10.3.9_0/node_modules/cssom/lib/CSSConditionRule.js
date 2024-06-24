import { __exports as CSSConditionRule } from '../../../virtual/CSSConditionRule.js';
import './CSSRule.js';
import './CSSGroupingRule.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';
import { __exports as CSSGroupingRule } from '../../../virtual/CSSGroupingRule.js';

//.CommonJS
var CSSOM = {
  CSSRule: CSSRule.CSSRule,
  CSSGroupingRule: CSSGroupingRule.CSSGroupingRule
};
///CommonJS


/**
 * @constructor
 * @see https://www.w3.org/TR/css-conditional-3/#the-cssconditionrule-interface
 */
CSSOM.CSSConditionRule = function CSSConditionRule() {
  CSSOM.CSSGroupingRule.call(this);
  this.cssRules = [];
};

CSSOM.CSSConditionRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSConditionRule.prototype.constructor = CSSOM.CSSConditionRule;
CSSOM.CSSConditionRule.prototype.conditionText = '';
CSSOM.CSSConditionRule.prototype.cssText = '';

//.CommonJS
CSSConditionRule.CSSConditionRule = CSSOM.CSSConditionRule;

export { CSSConditionRule as default };
