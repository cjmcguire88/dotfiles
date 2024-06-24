import { parseImpl, getEmptyResult } from '../../../tldts-core/dist/es6/src/factory.js';
import suffixLookup from './src/packed-hashes.js';

function parse(url, options = {}) {
    return parseImpl(url, 5 /* FLAG.ALL */, suffixLookup, options, getEmptyResult());
}

export { parse };
