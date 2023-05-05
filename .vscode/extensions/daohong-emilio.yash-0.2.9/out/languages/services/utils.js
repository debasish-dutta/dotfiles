"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function createMarkedCodeString(code, languageId) {
    const str = new vscode_1.MarkdownString();
    str.appendCodeblock(code, languageId);
    return str;
}
exports.createMarkedCodeString = createMarkedCodeString;
//# sourceMappingURL=utils.js.map