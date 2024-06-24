import { CODE_SPACE, CODE_EQUALS, CODE_AMPERSAND } from './const.js';

class SearchParams {
    constructor(init) {
        this.isEncoded = false;
        this.params = [];
        if (typeof init === 'string') {
            extractParams(init, init[0] === '?' ? 1 : 0, init.length, this, [CODE_AMPERSAND], CODE_EQUALS, [], {
                encode: true,
            });
        }
        else if (Array.isArray(init)) {
            init.forEach((kv) => {
                this.append(kv[0], kv[1]);
            });
        }
        else if (typeof init === 'object') {
            Object.keys(init).forEach((key) => {
                this.append(key, init[key]);
            });
        }
    }
    *entries() {
        for (let i = 0; i < this.params.length; i += 1) {
            yield [
                optionalDecode(this.params[i][0]),
                optionalDecode(this.params[i][1]),
            ];
        }
    }
    append(name, value) {
        this.params.push([encodeParameter(name), encodeParameter(value)]);
    }
    delete(name) {
        this.params = this.params.filter(([key, _]) => optionalDecode(key) !== name);
    }
    forEach(callback) {
        this.params.forEach(([key, value]) => {
            callback(optionalDecode(value), optionalDecode(key), this);
        });
    }
    get(name) {
        const entry = this.params.find(([k, _]) => optionalDecode(k) === name);
        if (entry) {
            return optionalDecode(entry[1]);
        }
        return null;
    }
    getAll(name) {
        return this.params
            .filter(([key, _]) => optionalDecode(key) === name)
            .map(kv => kv[1]);
    }
    has(name) {
        return this.get(name) !== null;
    }
    *keys() {
        for (let i = 0; i < this.params.length; i += 1) {
            yield optionalDecode(this.params[i][0]);
        }
    }
    /**
     * The set() method of the URLSearchParams interface sets the value associated with a given
     * search parameter to the given value. If there were several matching values, this method
     * deletes the others. If the search parameter doesn't exist, this method creates it.
     * @param name
     * @param value
     */
    set(name, value) {
        const firstIndex = this.params.findIndex(([k, _]) => optionalDecode(k) === name);
        if (firstIndex === -1) {
            this.append(name, value);
            return;
        }
        this.delete(name);
        this.params.splice(firstIndex, 0, [
            encodeParameter(name),
            encodeParameter(value),
        ]);
    }
    sort() {
        this.params = this.params.sort((a, b) => a[0].localeCompare(b[0]));
    }
    toString() {
        return this.params.map(([k, v]) => `${k}=${v}`).join('&');
    }
    *values() {
        for (let i = 0; i < this.params.length; i += 1) {
            yield optionalDecode(this.params[i][1]);
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}
function extractParams(urlString, start, end, params, separators, equals, breakCodes, { encode } = { encode: false }) {
    let index = start;
    let keyStart = index;
    let keyEnd = 0;
    let valStart = 0;
    const appendParams = encode
        ? params.append.bind(params)
        : (n, v) => params.params.push([n, v]);
    for (; index <= end; index += 1) {
        const code = urlString.charCodeAt(index);
        if (code === equals && keyEnd === 0) {
            keyEnd = index;
            valStart = index + 1;
        }
        else if (separators.indexOf(code) !== -1) {
            // don't add if key and value are empty
            if (index > keyStart) {
                // push directly to the params array to skip encoding step
                appendParams(urlString.slice(keyStart, keyEnd || index), urlString.slice(valStart || index, index));
            }
            keyStart = index + 1;
            keyEnd = 0;
            valStart = 0;
        }
        else if (breakCodes.indexOf(code) !== -1) {
            break;
        }
    }
    // push last key-value
    if (index !== keyStart) {
        appendParams(urlString.slice(keyStart, keyEnd || index), urlString.slice(valStart || index, index));
    }
    return index;
}
function decodeURIComponentSafe(s) {
    try {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    }
    catch (e) {
        return s;
    }
}
function optionalDecode(s) {
    if (s.indexOf('%') !== -1) {
        return decodeURIComponentSafe(s);
    }
    else {
        return s;
    }
}
function encodeParameter(_s) {
    const s = '' + _s;
    let encoded = '';
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === CODE_SPACE) {
            encoded += '+';
        }
        else {
            encoded += encodeURIComponent(s[i]);
        }
    }
    return encoded;
}

export { SearchParams as default, extractParams };
