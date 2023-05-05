"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexParser_1 = require("../parser/lexParser");
const utils_1 = require("./utils");
function doLEXHover(document, position, lexDocument) {
    const offset = document.offsetAt(position);
    const node = lexDocument.getEmbeddedCode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = lexDocument.defines[word] || lexDocument.states[word];
    if (symbol) {
        const line = document.lineAt(document.positionAt(symbol.offset)).text;
        return { contents: [utils_1.createMarkedCodeString(line, 'lex')] };
    }
    else if (lexParser_1.predefinedStates[word]) {
        return { contents: [utils_1.createMarkedCodeString(lexParser_1.predefinedStates[word], 'lex')] };
    }
    return null;
}
exports.doLEXHover = doLEXHover;
//# sourceMappingURL=lexHover.js.map