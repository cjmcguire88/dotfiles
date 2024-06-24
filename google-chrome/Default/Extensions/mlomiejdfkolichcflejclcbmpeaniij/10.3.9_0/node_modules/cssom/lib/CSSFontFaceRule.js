import { __exports as CSSFontFaceRule } from '../../../virtual/CSSFontFaceRule.js';
import { __require as requireCSSStyleDeclaration } from './CSSStyleDeclaration.js';
import './CSSRule.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';

var hasRequiredCSSFontFaceRule;

function requireCSSFontFaceRule () {
	if (hasRequiredCSSFontFaceRule) return CSSFontFaceRule;
	hasRequiredCSSFontFaceRule = 1;
	//.CommonJS
	var CSSOM = {
		CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
		CSSRule: CSSRule.CSSRule
	};
	///CommonJS


	/**
	 * @constructor
	 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
	 */
	CSSOM.CSSFontFaceRule = function CSSFontFaceRule() {
		CSSOM.CSSRule.call(this);
		this.style = new CSSOM.CSSStyleDeclaration();
		this.style.parentRule = this;
	};

	CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
	CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
	CSSOM.CSSFontFaceRule.prototype.type = 5;
	//FIXME
	//CSSOM.CSSFontFaceRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
	//CSSOM.CSSFontFaceRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

	// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSFontFaceRule.cpp
	Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
	  get: function() {
	    return "@font-face {" + this.style.cssText + "}";
	  }
	});


	//.CommonJS
	CSSFontFaceRule.CSSFontFaceRule = CSSOM.CSSFontFaceRule;
	///CommonJS
	return CSSFontFaceRule;
}

export { requireCSSFontFaceRule as __require };
