"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function doLEXFindDefinition(document, position, lexDocument) {
    const offset = document.offsetAt(position);
    const node = lexDocument.getEmbeddedCode(offset);
    if (node) {
        return null;
    }
    const word = document.getText(document.getWordRangeAtPosition(position));
    var symbol = lexDocument.defines[word] || lexDocument.states[word];
    let location = null;
    if (symbol) {
        location = new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(symbol.definition[0]), document.positionAt(symbol.definition[1])));
    }
    return location;
}
exports.doLEXFindDefinition = doLEXFindDefinition;
//# sourceMappingURL=lexDefinition.js.map