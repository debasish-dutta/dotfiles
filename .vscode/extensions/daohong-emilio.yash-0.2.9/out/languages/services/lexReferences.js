"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doLEXFindReferences(document, position, lexDocument) {
    const offset = document.offsetAt(position);
    const node = lexDocument.getEmbeddedCode(offset);
    if (node) {
        return [];
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = lexDocument.defines[word] || lexDocument.states[word];
    let location = [];
    symbol === null || symbol === void 0 ? void 0 : symbol.references.forEach(reference => {
        location.push(new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(reference[0]), document.positionAt(reference[1]))));
    });
    return location;
}
exports.doLEXFindReferences = doLEXFindReferences;
//# sourceMappingURL=lexReferences.js.map