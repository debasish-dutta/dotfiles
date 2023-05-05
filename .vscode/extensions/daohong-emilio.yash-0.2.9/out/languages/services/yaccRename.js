"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doYACCRename(document, position, newName, yaccDocument) {
    const offset = document.offsetAt(position);
    const node = yaccDocument.getEmbeddedNode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = yaccDocument.types[word] || yaccDocument.symbols[word] || yaccDocument.tokens[word] || yaccDocument.aliases[`"${word}"`];
    const edits = new vscode_1.WorkspaceEdit();
    if (symbol && symbol.name.startsWith('"'))
        newName = `"${newName}"`;
    symbol === null || symbol === void 0 ? void 0 : symbol.references.forEach(reference => {
        edits.replace(document.uri, new vscode_1.Range(document.positionAt(reference[0]), document.positionAt(reference[1])), newName);
    });
    return edits;
}
exports.doYACCRename = doYACCRename;
//# sourceMappingURL=yaccRename.js.map