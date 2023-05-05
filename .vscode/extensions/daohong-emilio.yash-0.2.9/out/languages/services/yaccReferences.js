"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doYACCFindReferences(document, position, yaccDocument) {
    var _a;
    const offset = document.offsetAt(position);
    const node = yaccDocument.getEmbeddedNode(offset);
    if (node) {
        return [];
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = yaccDocument.types[word] || yaccDocument.symbols[word] || yaccDocument.tokens[word] || yaccDocument.aliases[`"${word}"`];
    let location = [];
    symbol === null || symbol === void 0 ? void 0 : symbol.references.forEach(reference => {
        location.push(new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(reference[0]), document.positionAt(reference[1]))));
    });
    (_a = symbol === null || symbol === void 0 ? void 0 : symbol.alias) === null || _a === void 0 ? void 0 : _a.references.forEach(reference => {
        location.push(new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(reference[0]), document.positionAt(reference[1]))));
    });
    return location;
}
exports.doYACCFindReferences = doYACCFindReferences;
//# sourceMappingURL=yaccReferences.js.map