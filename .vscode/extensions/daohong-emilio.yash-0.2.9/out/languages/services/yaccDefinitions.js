"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doYACCFindDefinition(document, position, yaccDocument) {
    const offset = document.offsetAt(position);
    const node = yaccDocument.getEmbeddedNode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = yaccDocument.types[word] || yaccDocument.symbols[word] || yaccDocument.tokens[word] || yaccDocument.aliases[`"${word}"`];
    let location = null;
    if (symbol) {
        location = new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(symbol.definition[0]), document.positionAt(symbol.definition[1])));
    }
    return location;
}
exports.doYACCFindDefinition = doYACCFindDefinition;
//# sourceMappingURL=yaccDefinitions.js.map