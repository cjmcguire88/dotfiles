import { __require as requireCSSStyleSheet } from './CSSStyleSheet.js';
import './CSSRule.js';
import { __require as requireCSSStyleRule } from './CSSStyleRule.js';
import './CSSGroupingRule.js';
import './CSSConditionRule.js';
import './CSSMediaRule.js';
import './CSSSupportsRule.js';
import { __require as requireCSSStyleDeclaration } from './CSSStyleDeclaration.js';
import { __require as requireCSSKeyframeRule } from './CSSKeyframeRule.js';
import './CSSKeyframesRule.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';
import { __exports as CSSGroupingRule } from '../../../virtual/CSSGroupingRule.js';
import { __exports as CSSConditionRule } from '../../../virtual/CSSConditionRule.js';
import { __exports as CSSMediaRule } from '../../../virtual/CSSMediaRule.js';
import { __exports as CSSSupportsRule } from '../../../virtual/CSSSupportsRule.js';
import { __exports as CSSKeyframesRule } from '../../../virtual/CSSKeyframesRule.js';

//.CommonJS
({
	CSSStyleSheet: requireCSSStyleSheet().CSSStyleSheet,
	CSSRule: CSSRule.CSSRule,
	CSSStyleRule: requireCSSStyleRule().CSSStyleRule,
	CSSGroupingRule: CSSGroupingRule.CSSGroupingRule,
	CSSConditionRule: CSSConditionRule.CSSConditionRule,
	CSSMediaRule: CSSMediaRule.CSSMediaRule,
	CSSSupportsRule: CSSSupportsRule.CSSSupportsRule,
	CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
	CSSKeyframeRule: requireCSSKeyframeRule().CSSKeyframeRule,
	CSSKeyframesRule: CSSKeyframesRule.CSSKeyframesRule
});
