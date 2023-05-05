"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const yaccParser_1 = require("../parser/yaccParser");
const utils_1 = require("./utils");
function doYACCHover(document, position, yaccDocument) {
    const offset = document.offsetAt(position);
    const code = yaccDocument.getEmbeddedNode(offset);
    if (code) {
        return null;
    }
    var symbol;
    const word = document.getText(document.getWordRangeAtPosition(position));
    const node = yaccDocument.getNodeByOffset(offset);
    if (node) {
        // Inside <...>
        if (node.typeOffset && offset > node.typeOffset) {
            if (!node.typeEnd || offset <= node.typeEnd) {
                if ((symbol = yaccDocument.types[word])) {
                    message = utils_1.createMarkedCodeString(symbol.type, 'yacc');
                    return { contents: [utils_1.createMarkedCodeString(symbol.type, 'yacc')] };
                }
                return null;
            }
        }
    }
    var message = undefined;
    if ((symbol = yaccDocument.symbols[word])) {
        const config = vscode_1.workspace.getConfiguration('yash');
        const yyType = config.get('YYTYPE', '');
        const guess = yyType !== '' ? yyType : '?';
        message = utils_1.createMarkedCodeString(`%type <${symbol.type ? symbol.type : guess}> ${symbol.name}`, 'yacc');
    }
    else if ((symbol = yaccDocument.tokens[word])) {
        const node = yaccDocument.getNodeByOffset(symbol.offset);
        const head = document.getText(document.getWordRangeAtPosition(document.positionAt(node.offset + 1)));
        message = utils_1.createMarkedCodeString(`%${head} <${symbol.type ? symbol.type : '?'}> ${symbol.name}`, 'yacc');
    }
    else if ((symbol = yaccDocument.aliases[`"${word}"`])) {
        if (symbol.alias) {
            symbol = symbol.alias;
            const node = yaccDocument.getNodeByOffset(symbol.offset);
            const head = document.getText(document.getWordRangeAtPosition(document.positionAt(node.offset + 1)));
            message = utils_1.createMarkedCodeString(`%${head} <${symbol.type ? symbol.type : '?'}> ${symbol.name}`, 'yacc');
        }
    }
    else if (yaccParser_1.predefined[word]) {
        message = utils_1.createMarkedCodeString(yaccParser_1.predefined[word], 'yacc');
    }
    const namedReference = yaccDocument.namedReferences[`[${word}]`];
    if (namedReference) {
        if (namedReference.symbol) {
            message = utils_1.createMarkedCodeString(`Named reference for ${namedReference.symbol}`, 'plaintext');
        }
        else {
            message = utils_1.createMarkedCodeString(`Middle rule action reference`, 'plaintext');
        }
    }
    if (message)
        return { contents: [message] };
    return null;
}
exports.doYACCHover = doYACCHover;
//# sourceMappingURL=yaccHover.js.map