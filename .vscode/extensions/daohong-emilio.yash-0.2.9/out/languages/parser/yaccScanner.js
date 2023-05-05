"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaccLanguageTypes_1 = require("../yaccLanguageTypes");
const utils_1 = require("./utils");
function createScanner(input, initialOffset = 0, initialState = yaccLanguageTypes_1.ScannerState.WithinContent) {
    const stream = new utils_1.MultiLineStream(input, initialOffset);
    let state = initialState;
    let tokenOffset = 0;
    let tokenType = yaccLanguageTypes_1.TokenType.Unknown;
    let tokenError;
    function nextWord() {
        // return stream.advanceIfRegExp(/^[a-zA-Z][\w.]*/);
        return stream.advanceIfRegExp(/^[a-zA-Z][\w.-]*/); // gnu bison extension allows the dash symbol
    }
    function nextLiteral() {
        return stream.advanceIfRegExp(/^("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/);
    }
    function nextParam() {
        return stream.advanceIfRegExp(/^\[[a-zA-Z]\w*\]/);
    }
    function nextMiddleRule() {
        return stream.advanceIfRegExp(/^<[a-zA-Z]\w*>/);
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
        if (token !== yaccLanguageTypes_1.TokenType.EOS && offset === stream.pos()) {
            console.log('Scanner.scan has not advanced at offset ' + offset + ', state before: ' + oldState + ' after: ' + state);
            stream.advance(1);
            return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown);
        }
        return token;
    }
    function internalScan() {
        stream.skipWhitespace();
        const offset = stream.pos();
        if (stream.eos()) {
            return finishToken(offset, yaccLanguageTypes_1.TokenType.EOS);
        }
        switch (state) {
            case yaccLanguageTypes_1.ScannerState.WithinContent:
                const ch = stream.nextChar();
                switch (ch) {
                    case utils_1._FSL: // /
                        if (stream.advanceIfChar(utils_1._AST)) { // /*
                            state = yaccLanguageTypes_1.ScannerState.WithinComment;
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.StartComment);
                        }
                        if (stream.advanceIfChar(utils_1._FSL)) { // //
                            stream.advanceUntilChar(utils_1._NWL);
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.Comment);
                        }
                        break;
                    case utils_1._BAR: // |
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Bar);
                    case utils_1._COL: // :
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Colon);
                    case utils_1._BOP: // {
                        state = yaccLanguageTypes_1.ScannerState.WithinCode;
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.StartAction);
                    case utils_1._BCL: // }
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.EndAction);
                    case utils_1._DOT: // .
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Dot);
                    case utils_1._PCS: // %
                        if (stream.advanceIfChar(utils_1._PCS)) { // %%
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.RulesTag);
                        }
                        if (stream.advanceIfChar(utils_1._BOP)) { // %{
                            state = yaccLanguageTypes_1.ScannerState.WithinCode;
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.StartAction);
                        }
                        if (stream.advanceIfRegExp(/^[\w-]+/)) {
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.Option);
                        }
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Percent);
                    case utils_1._LAN: // <
                        state = yaccLanguageTypes_1.ScannerState.WithinTypeValue;
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.StartType);
                    case utils_1._DQO: // "
                    case utils_1._SQO: // '
                        stream.goBack(1);
                        const literal = nextLiteral();
                        if (literal.length > 0) {
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.Literal);
                        }
                        stream.advance(1);
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown);
                    case utils_1._SBO: // [
                        stream.goBack(1);
                        const param = nextParam();
                        if (param.length > 0) {
                            return finishToken(offset, yaccLanguageTypes_1.TokenType.Param);
                        }
                        stream.advance(1);
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown);
                    case utils_1._SCL:
                        return finishToken(offset, yaccLanguageTypes_1.TokenType.SemiColon);
                }
                stream.goBack(1);
                const literal = nextLiteral();
                if (literal.length > 0) {
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.Literal);
                }
                const component = nextWord();
                if (component.length > 0) {
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.Word);
                }
                stream.advance(1);
                return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown);
            case yaccLanguageTypes_1.ScannerState.WithinTypeValue:
                if (stream.advanceIfChar(utils_1._RAN)) { // >
                    state = yaccLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.EndType);
                }
                const typeValue = nextWord();
                if (typeValue.length > 0) {
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.TypeValue);
                }
                stream.advance(1);
                state = yaccLanguageTypes_1.ScannerState.WithinContent;
                return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown);
            case yaccLanguageTypes_1.ScannerState.WithinComment:
                if (stream.advanceIfChars([utils_1._AST, utils_1._FSL])) { // */
                    state = yaccLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.EndComment);
                }
                stream.advanceUntilChars([utils_1._AST, utils_1._FSL]); // */
                return finishToken(offset, yaccLanguageTypes_1.TokenType.Comment);
            case yaccLanguageTypes_1.ScannerState.WithinCode:
                if (stream.advanceIfChar(utils_1._BCL)) { // }
                    state = yaccLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.EndAction);
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
                        case utils_1._SQO: // ' 
                        case utils_1._DQO: // " 
                            stream.goBack(1);
                            if (!nextLiteral()) // skip string if not skip character
                                stream.advance(1);
                            break;
                    }
                    if (ch === 0)
                        break;
                }
                if (brackets > 0) {
                    return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown, "Code not closed!");
                }
                stream.goBack(1);
                return finishToken(offset, yaccLanguageTypes_1.TokenType.Action);
        }
        state = yaccLanguageTypes_1.ScannerState.WithinContent;
        return finishToken(offset, yaccLanguageTypes_1.TokenType.Unknown, "invalid symbol found");
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
//# sourceMappingURL=yaccScanner.js.map