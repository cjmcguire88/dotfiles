import { __exports as perf_hooks } from '../../../virtual/perf_hooks.js';
import require$$0 from '../../../virtual/___vite-browser-external.js';

/* c8 ignore start */

var performance_1;
try {
  const {performance} = require$$0;
  performance_1 = perf_hooks.performance = performance;
}
catch (fallback) {
  performance_1 = perf_hooks.performance = {now() { return +new Date; }};
}

export { perf_hooks as default, performance_1 as performance };
