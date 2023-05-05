"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return array[mid];
        }
    }
    return undefined;
}
exports.binarySearch = binarySearch;
exports._NWL = '\n'.charCodeAt(0);
exports._CAR = '\r'.charCodeAt(0);
exports._LFD = '\f'.charCodeAt(0);
exports._TAB = '\t'.charCodeAt(0);
exports._WSP = ' '.charCodeAt(0);
exports._LAN = '<'.charCodeAt(0);
exports._RAN = '>'.charCodeAt(0);
exports._FSL = '/'.charCodeAt(0);
exports._BSL = '\\'.charCodeAt(0);
exports._AST = '*'.charCodeAt(0);
exports._COL = ':'.charCodeAt(0);
exports._BAR = '|'.charCodeAt(0);
exports._BOP = '{'.charCodeAt(0);
exports._BCL = '}'.charCodeAt(0);
exports._PCS = '%'.charCodeAt(0);
exports._DOT = '.'.charCodeAt(0);
exports._DQO = '"'.charCodeAt(0);
exports._SQO = '\''.charCodeAt(0);
exports._SBO = '['.charCodeAt(0);
exports._SBC = ']'.charCodeAt(0);
exports._SCL = ';'.charCodeAt(0);
exports._AND = '&'.charCodeAt(0);
/**
 * Imported from Microsoft's vscode-html-languageservice's scanner.
 *
 * Thank you Microsoft.
 */
class MultiLineStream {
    constructor(source, position) {
        this.source = source;
        this.len = source.length;
        this.position = position;
    }
    eos() {
        return this.len <= this.position;
    }
    getSource() {
        return this.source;
    }
    pos() {
        return this.position;
    }
    goBackTo(pos) {
        this.position = pos;
    }
    goBack(n) {
        this.position -= n;
    }
    advance(n) {
        this.position += n;
    }
    goToEnd() {
        this.position = this.source.length;
    }
    nextChar() {
        return this.source.charCodeAt(this.position++) || 0;
    }
    peekChar(n = 0) {
        return this.source.charCodeAt(this.position + n) || 0;
    }
    advanceIfChar(ch) {
        if (ch === this.source.charCodeAt(this.position)) {
            this.position++;
            return true;
        }
        return false;
    }
    advanceIfChars(ch) {
        let i;
        if (this.position + ch.length > this.source.length) {
            return false;
        }
        for (i = 0; i < ch.length; i++) {
            if (this.source.charCodeAt(this.position + i) !== ch[i]) {
                return false;
            }
        }
        this.advance(i);
        return true;
    }
    advanceIfRegExp(regex) {
        const str = this.source.substr(this.position);
        const match = str.match(regex);
        if (match) {
            this.position = this.position + match.index + match[0].length;
            return match[0];
        }
        return '';
    }
    advanceUntilRegExp(regex) {
        const str = this.source.substr(this.position);
        const match = str.match(regex);
        if (match) {
            this.position = this.position + match.index;
            return match[0];
        }
        else {
            this.goToEnd();
        }
        return '';
    }
    advanceUntilChar(ch) {
        while (this.position < this.source.length) {
            if (this.source.charCodeAt(this.position) === ch) {
                return true;
            }
            this.advance(1);
        }
        return false;
    }
    advanceUntilChars(ch) {
        while (this.position + ch.length <= this.source.length) {
            let i = 0;
            for (; i < ch.length && this.source.charCodeAt(this.position + i) === ch[i]; i++) {
            }
            if (i === ch.length) {
                return true;
            }
            this.advance(1);
        }
        this.goToEnd();
        return false;
    }
    skipWhitespace() {
        const n = this.advanceWhileChar(ch => {
            return ch === exports._WSP || ch === exports._TAB || ch === exports._NWL || ch === exports._LFD || ch === exports._CAR;
        });
        return n > 0;
    }
    skipWitheSpaceWithoutNewLine() {
        const n = this.advanceWhileChar(ch => {
            return ch === exports._WSP || ch === exports._TAB || ch === exports._LFD;
        });
        return n > 0;
    }
    advanceWhileChar(condition) {
        const posNow = this.position;
        while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
            this.position++;
        }
        return this.position - posNow;
    }
}
exports.MultiLineStream = MultiLineStream;
//# sourceMappingURL=utils.js.map