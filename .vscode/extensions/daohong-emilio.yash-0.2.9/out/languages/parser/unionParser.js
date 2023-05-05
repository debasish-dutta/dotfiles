"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var ScannerState;
(function (ScannerState) {
    ScannerState[ScannerState["WithinContent"] = 0] = "WithinContent";
    ScannerState[ScannerState["WithinDefinition"] = 1] = "WithinDefinition";
    ScannerState[ScannerState["WithinComment"] = 2] = "WithinComment";
})(ScannerState = exports.ScannerState || (exports.ScannerState = {}));
;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Word"] = 0] = "Word";
    TokenType[TokenType["SemiColon"] = 1] = "SemiColon";
    TokenType[TokenType["Asterisk"] = 2] = "Asterisk";
    TokenType[TokenType["Ampersand"] = 3] = "Ampersand";
    TokenType[TokenType["StartComment"] = 4] = "StartComment";
    TokenType[TokenType["EndComment"] = 5] = "EndComment";
    TokenType[TokenType["Comment"] = 6] = "Comment";
    TokenType[TokenType["StartDefinition"] = 7] = "StartDefinition";
    TokenType[TokenType["EndDefinition"] = 8] = "EndDefinition";
    TokenType[TokenType["Definition"] = 9] = "Definition";
    TokenType[TokenType["Unknown"] = 10] = "Unknown";
    TokenType[TokenType["EOS"] = 11] = "EOS";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
;
function createScanner(input, initialOffset = 0, initialState = ScannerState.WithinContent) {
    const stream = new utils_1.MultiLineStream(input, initialOffset);
    let state = initialState;
    let tokenOffset = 0;
    let tokenType = TokenType.Unknown;
    let tokenError;
    function nextWord() {
        return stream.advanceIfRegExp(/^[a-zA-Z]\w*/);
    }
    function finishToken(offset, type, errorMessage) {
        tokenType = type;
        tokenOffset = offset;
        tokenError = errorMessage;
        return type;
    }
    function scan() {
        const offset = stream.pos();
        const oldState = state;
        const token = internalScan();
        if (token !== TokenType.EOS && offset === stream.pos()) {
            console.log('Scanner.scan has not advanced at offset ' + offset + ', state before: ' + oldState + ' after: ' + state);
            stream.advance(1);
            return finishToken(offset, TokenType.Unknown);
        }
        return token;
    }
    function internalScan() {
        stream.skipWhitespace();
        const offset = stream.pos();
        if (stream.eos()) {
            return finishToken(offset, TokenType.EOS);
        }
        switch (state) {
            case ScannerState.WithinContent:
                const ch = stream.nextChar();
                switch (ch) {
                    case utils_1._FSL: // /
                        if (stream.advanceIfChar(utils_1._AST)) { // /*
                            state = ScannerState.WithinComment;
                            return finishToken(offset, TokenType.StartComment);
                        }
                        if (stream.advanceIfChar(utils_1._FSL)) { // //
                            stream.advanceUntilChar(utils_1._NWL);
                            return finishToken(offset, TokenType.Comment);
                        }
                        break;
                    case utils_1._BOP:
                        state = ScannerState.WithinDefinition;
                        return finishToken(offset, TokenType.StartDefinition);
                    case utils_1._AST:
                        return finishToken(offset, TokenType.Asterisk);
                    case utils_1._AND:
                        return finishToken(offset, TokenType.Ampersand);
                    case utils_1._SCL:
                        return finishToken(offset, TokenType.SemiColon);
                }
                stream.goBack(1);
                const component = nextWord();
                if (component.length > 0) {
                    return finishToken(offset, TokenType.Word);
                }
                stream.advance(1);
                return finishToken(offset, TokenType.Unknown);
            case ScannerState.WithinComment:
                if (stream.advanceIfChars([utils_1._AST, utils_1._FSL])) { // */
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.EndComment);
                }
                stream.advanceUntilChars([utils_1._AST, utils_1._FSL]); // */
                return finishToken(offset, TokenType.Comment);
            case ScannerState.WithinDefinition:
                if (stream.advanceIfChar(utils_1._BCL)) { // }
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.EndDefinition);
                }
                var brackets = 1;
                while (brackets > 0) {
                    const ch = stream.nextChar();
                    switch (ch) {
                        case utils_1._BOP:
                            brackets++;
                            break;
                        case utils_1._BCL:
                            brackets--;
                            break;
                        case utils_1._FSL: // /
                            if (stream.advanceIfChar(utils_1._AST)) { // /*
                                stream.advanceUntilChars([utils_1._AST, utils_1._FSL]);
                                stream.advance(2);
                            }
                            else if (stream.advanceIfChar(utils_1._FSL)) { // //
                                stream.advanceUntilChar(utils_1._NWL);
                                stream.advance(1);
                            }
                            break;
                    }
                    if (ch === 0)
                        break;
                }
                if (brackets > 0) {
                    return finishToken(offset, TokenType.Unknown, "Definition not closed!");
                }
                stream.goBack(1);
                return finishToken(offset, TokenType.Definition);
        }
        state = ScannerState.WithinContent;
        return finishToken(offset, TokenType.Unknown, "invalid symbol found");
    }
    return {
        scan,
        getTokenType: () => tokenType,
        getTokenOffset: () => tokenOffset,
        getTokenLength: () => stream.pos() - tokenOffset,
        getTokenEnd: () => stream.pos(),
        getTokenText: () => stream.getSource().substring(tokenOffset, stream.pos()),
        getScannerState: () => state,
        getTokenError: () => tokenError
    };
}
exports.createScanner = createScanner;
function unIndent(text) {
    const lines = text.split(/\r\n|\r|\n/);
    const trimmed = lines.map(line => line.trim());
    const indented = [];
    let indent = 0;
    trimmed.forEach(line => {
        if (line.indexOf('}') !== -1) {
            indent -= 4;
        }
        indented.push(' '.repeat(indent) + line);
        if (line.indexOf('{') !== -1) {
            indent += 4;
        }
    });
    return indented.join('\n');
}
;
function parse(text) {
    const scanner = createScanner(text);
    const types = [];
    let token = scanner.scan();
    let offset = 0;
    let type;
    while (token !== TokenType.EOS) {
        offset = scanner.getTokenOffset();
        switch (token) {
            case TokenType.SemiColon:
                if (type !== undefined) {
                    type.name = type.type.pop();
                    type.location[1] = scanner.getTokenEnd();
                    type.info = unIndent(text.substring(type.location[0], type.location[1]));
                    types.push(type);
                    type = undefined;
                }
                break;
            case TokenType.Word:
                if (type !== undefined) {
                    type.type.push(scanner.getTokenText());
                }
                else {
                    type = { type: [scanner.getTokenText()], info: '', location: [offset, -1] };
                }
                break;
            case TokenType.Asterisk:
            case TokenType.Ampersand:
                if (type !== undefined) {
                    type.type.push(scanner.getTokenText());
                }
                break;
            case TokenType.StartDefinition:
            case TokenType.EndDefinition:
                if (type !== undefined) {
                    type.type.push(scanner.getTokenText());
                }
            case TokenType.Definition:
                // if (type !== undefined) {
                //     const recursive = parse(scanner.getTokenText());
                // }
                break;
        }
        token = scanner.scan();
    }
    return types;
}
exports.parse = parse;
;
//# sourceMappingURL=unionParser.js.map