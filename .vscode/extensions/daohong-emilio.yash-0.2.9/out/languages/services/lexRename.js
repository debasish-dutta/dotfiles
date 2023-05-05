"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doLEXRename(document, position, newName, lexDocument) {
    const offset = document.offsetAt(position);
    const node = lexDocument.getEmbeddedCode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = lexDocument.defines[word] || lexDocument.states[word];
    const edits = new vscode_1.WorkspaceEdit();
    symbol === null || symbol === void 0 ? void 0 : symbol.references.forEach(reference => {
        edits.replace(document.uri, new vscode_1.Range(document.positionAt(reference[0]), document.positionAt(reference[1])), newName);
    });
    return edits;
}
exports.doLEXRename = doLEXRename;
//# sourceMappingURL=lexRename.js.map