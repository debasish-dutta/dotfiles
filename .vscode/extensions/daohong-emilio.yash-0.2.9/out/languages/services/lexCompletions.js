"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const lexScanner_1 = require("../parser/lexScanner");
const lexLanguageTypes_1 = require("../lexLanguageTypes");
const keywords = ['array', 'pointer', 'option', 's', 'x'];
function doLEXCompletion(document, position, lexDocument) {
    const offset = document.offsetAt(position);
    const text = document.getText();
    const embedded = lexDocument.getEmbeddedCode(offset);
    if (embedded !== undefined) {
        return [];
    }
    const scanner = lexScanner_1.createScanner(text, offset - 1);
    if (scanner.scan() === lexLanguageTypes_1.TokenType.Percent) {
        if (position.character === 1 && offset < lexDocument.rulesRange[0])
            return keywords.map((keyword) => {
                const completion = new vscode_1.CompletionItem(keyword);
                completion.detail = "keyword";
                completion.kind = vscode_1.CompletionItemKind.Constructor;
                return completion;
            });
        return [];
    }
    const word = document.getText(document.getWordRangeAtPosition(position)).toUpperCase();
    const line = document.lineAt(position.line).text.substring(0, position.character);
    const result = [];
    if (offset < lexDocument.rulesRange[0]) {
        // if before rules zone, definition need to be on the right
        const ok = line.match(/^\w+.*({\w*}?)+/);
        if (ok) {
            Object.keys(lexDocument.defines).filter(t => t.toUpperCase().startsWith(word)).forEach((key) => {
                const completion = new vscode_1.CompletionItem(key);
                completion.detail = "definition";
                completion.kind = vscode_1.CompletionItemKind.Class;
                result.push(completion);
            });
        }
    }
    else if (offset < lexDocument.rulesRange[1]) {
        const res = line.match(/^[^\s]*(?:{\w*}?)+$/);
        if (res) {
            if (res[0].length >= position.character) {
                Object.keys(lexDocument.defines).filter(t => t.toUpperCase().startsWith(word)).forEach((key) => {
                    const completion = new vscode_1.CompletionItem(key);
                    completion.detail = "definition";
                    completion.kind = vscode_1.CompletionItemKind.Class;
                    result.push(completion);
                });
            }
        }
        else {
            if (line.match(/^<[\w,]*>[^\s]*(?:{\w*}?)+$/)) {
                Object.keys(lexDocument.defines).filter(t => t.toUpperCase().startsWith(word)).forEach((key) => {
                    const completion = new vscode_1.CompletionItem(key);
                    completion.detail = "definition";
                    completion.kind = vscode_1.CompletionItemKind.Class;
                    result.push(completion);
                });
            }
            else if (line.match(/^<[\w,]*$/)) { // TODO: fix completion for {} after <>
                Object.keys(lexDocument.states).filter(t => t.toUpperCase().startsWith(word)).forEach((key) => {
                    const completion = new vscode_1.CompletionItem(key);
                    completion.detail = "initial state";
                    completion.kind = vscode_1.CompletionItemKind.Class;
                    result.push(completion);
                });
            }
        }
    }
    return result;
}
exports.doLEXCompletion = doLEXCompletion;
//# sourceMappingURL=lexCompletions.js.map