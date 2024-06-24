var canvasShim;
var hasRequiredCanvasShim;

function requireCanvasShim () {
	if (hasRequiredCanvasShim) return canvasShim;
	hasRequiredCanvasShim = 1;
	class Canvas {
	  constructor(width, height) {
	    this.width = width;
	    this.height = height;
	  }
	  getContext() {
	    return null;
	  }
	  toDataURL() {
	    return '';
	  }
	}

	canvasShim = {
	  createCanvas: (width, height) => new Canvas(width, height),
	};
	return canvasShim;
}

export { requireCanvasShim as __require };
