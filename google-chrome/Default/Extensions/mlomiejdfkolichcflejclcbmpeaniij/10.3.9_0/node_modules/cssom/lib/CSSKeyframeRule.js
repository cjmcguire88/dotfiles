import { __exports as CSSKeyframeRule } from '../../../virtual/CSSKeyframeRule.js';
import './CSSRule.js';
import { __require as requireCSSStyleDeclaration } from './CSSStyleDeclaration.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';

var hasRequiredCSSKeyframeRule;

function requireCSSKeyframeRule () {
	if (hasRequiredCSSKeyframeRule) return CSSKeyframeRule;
	hasRequiredCSSKeyframeRule = 1;
	//.CommonJS
	var CSSOM = {
		CSSRule: CSSRule.CSSRule,
		CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration
	};
	///CommonJS


	/**
	 * @constructor
	 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
	 */
	CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
		CSSOM.CSSRule.call(this);
		this.keyText = '';
		this.style = new CSSOM.CSSStyleDeclaration();
		this.style.parentRule = this;
	};

	CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
	CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
	CSSOM.CSSKeyframeRule.prototype.type = 8;
	//FIXME
	//CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
	//CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

	// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframeRule.cpp
	Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
	  get: function() {
	    return this.keyText + " {" + this.style.cssText + "} ";
	  }
	});


	//.CommonJS
	CSSKeyframeRule.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
	///CommonJS
	return CSSKeyframeRule;
}

export { requireCSSKeyframeRule as __require };
