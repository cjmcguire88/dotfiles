import { __exports as CSSMediaRule } from '../../../virtual/CSSMediaRule.js';
import './CSSRule.js';
import './CSSGroupingRule.js';
import './CSSConditionRule.js';
import './MediaList.js';
import { __exports as CSSRule } from '../../../virtual/CSSRule.js';
import { __exports as CSSGroupingRule } from '../../../virtual/CSSGroupingRule.js';
import { __exports as CSSConditionRule } from '../../../virtual/CSSConditionRule.js';
import { __exports as MediaList } from '../../../virtual/MediaList.js';

//.CommonJS
var CSSOM = {
	CSSRule: CSSRule.CSSRule,
	CSSGroupingRule: CSSGroupingRule.CSSGroupingRule,
	CSSConditionRule: CSSConditionRule.CSSConditionRule,
	MediaList: MediaList.MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
CSSOM.CSSMediaRule = function CSSMediaRule() {
	CSSOM.CSSConditionRule.call(this);
	this.media = new CSSOM.MediaList();
};

CSSOM.CSSMediaRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
CSSOM.CSSMediaRule.prototype.type = 4;

// https://opensource.apple.com/source/WebCore/WebCore-7611.1.21.161.3/css/CSSMediaRule.cpp
Object.defineProperties(CSSOM.CSSMediaRule.prototype, {
  "conditionText": {
    get: function() {
      return this.media.mediaText;
    },
    set: function(value) {
      this.media.mediaText = value;
    },
    configurable: true,
    enumerable: true
  },
  "cssText": {
    get: function() {
      var cssTexts = [];
      for (var i=0, length=this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
    },
    configurable: true,
    enumerable: true
  }
});


//.CommonJS
CSSMediaRule.CSSMediaRule = CSSOM.CSSMediaRule;

export { CSSMediaRule as default };
