"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const yaccParser_1 = require("../parser/yaccParser");
const yaccScanner_1 = require("../parser/yaccScanner");
const yaccLanguageTypes_1 = require("../yaccLanguageTypes");
const keywords = ['type', 'token', 'option', 'token-table', 'left', 'right', 'define', 'output',
    'precedence', 'nterm', 'destructor', 'union', 'code', 'printer', 'defines', 'start', 'skeleton', 'glr-parser', 'language',
    'parse-param', 'lex-param', 'pure-parser', 'expect', 'expect-rr', 'name-prefix', 'locations', 'nonassoc'];
function doYACCComplete(document, position, yaccDocument) {
    const offset = document.offsetAt(position);
    const text = document.getText();
    const embedded = yaccDocument.getEmbeddedNode(offset);
    if (embedded !== undefined) {
        return [];
    }
    const scanner = yaccScanner_1.createScanner(text, offset - 1);
    if (scanner.scan() === yaccLanguageTypes_1.TokenType.Percent) {
        if (position.character === 1 && offset < yaccDocument.rulesRange[0])
            return keywords.map((keyword) => {
                const completion = new vscode_1.CompletionItem(keyword);
                completion.detail = "keyword";
                completion.kind = vscode_1.CompletionItemKind.Constructor;
                return completion;
            });
        return [];
    }
    const word = document.getText(document.getWordRangeAtPosition(position)).toUpperCase();
    // this is used to match the completion items before we feed them out
    // if we return an empty list, VSCode will fall back to the default 'abc' completions, which is what we want
    const node = yaccDocument.getNodeByOffset(offset);
    if (node === undefined) {
        return [];
    }
    var completion;
    const result = [];
    switch (node.nodeType) {
        case yaccParser_1.NodeType.Token:
        case yaccParser_1.NodeType.Type:
            if (node.typeOffset && offset > node.typeOffset) {
                if (!node.typeEnd || offset <= node.typeEnd) {
                    Object.keys(yaccDocument.types).filter(t => t.toUpperCase().startsWith(word)).forEach((type) => {
                        completion = new vscode_1.CompletionItem(type);
                        completion.detail = "type";
                        completion.kind = vscode_1.CompletionItemKind.TypeParameter;
                        result.push(completion);
                    });
                    break;
                }
            }
            if (node.nodeType === yaccParser_1.NodeType.Type)
                Object.keys(yaccDocument.symbols).filter(t => t.toUpperCase().startsWith(word)).forEach((symbol) => {
                    completion = new vscode_1.CompletionItem(symbol);
                    completion.detail = "user defined non-terminal";
                    completion.kind = vscode_1.CompletionItemKind.Class;
                    result.push(completion);
                });
            break;
        case yaccParser_1.NodeType.Rule:
            Object.keys(yaccDocument.symbols).filter(t => t.toUpperCase().startsWith(word)).forEach((symbol) => {
                completion = new vscode_1.CompletionItem(symbol);
                completion.detail = "user defined non-terminal";
                completion.kind = vscode_1.CompletionItemKind.Class;
                result.push(completion);
            });
            Object.keys(yaccDocument.tokens).filter(t => t.toUpperCase().startsWith(word)).forEach((token) => {
                completion = new vscode_1.CompletionItem(token);
                completion.detail = "user defined token";
                completion.kind = vscode_1.CompletionItemKind.Field;
                result.push(completion);
            });
            Object.keys(yaccParser_1.predefined).filter(t => t.toUpperCase().startsWith(word)).forEach(key => {
                completion = new vscode_1.CompletionItem(key);
                completion.detail = "predefined symbol";
                completion.kind = vscode_1.CompletionItemKind.Method;
                result.push(completion);
            });
            break;
        default:
            break;
    }
    return result;
}
exports.doYACCComplete = doYACCComplete;
//# sourceMappingURL=yaccCompletions.js.map