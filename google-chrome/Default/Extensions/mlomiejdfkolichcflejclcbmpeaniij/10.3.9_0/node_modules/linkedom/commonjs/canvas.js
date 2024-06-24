import { getDefaultExportFromCjs } from '../../../virtual/_commonjsHelpers.js';
import { __module as canvas } from '../../../virtual/canvas.js';
import { __require as requireCanvasShim } from './canvas-shim.js';

/* c8 ignore start */

try {
  canvas.exports = require('canvas');
} catch (fallback) {
  canvas.exports = requireCanvasShim();
}
/* c8 ignore stop */

var canvasExports = canvas.exports;
const Canvas = /*@__PURE__*/getDefaultExportFromCjs(canvasExports);

export { Canvas as default };
