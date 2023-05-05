"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doYACCFindTypeDefinition(document, position, yaccDocument) {
    const offset = document.offsetAt(position);
    const node = yaccDocument.getEmbeddedNode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = yaccDocument.symbols[word] || yaccDocument.tokens[word] || yaccDocument.aliases[`"${word}"`];
    let location = null;
    if (symbol && symbol.type) {
        const type = yaccDocument.types[symbol.type];
        if (type) {
            location = new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(type.definition[0]), document.positionAt(type.definition[1])));
        }
    }
    return location;
}
exports.doYACCFindTypeDefinition = doYACCFindTypeDefinition;
//# sourceMappingURL=yaccTypeDefinition.js.map