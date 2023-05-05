"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexLanguageTypes_1 = require("../lexLanguageTypes");
const utils_1 = require("./utils");
function createScanner(input, initialOffset = 0, initialState = lexLanguageTypes_1.ScannerState.WithinContent) {
    const stream = new utils_1.MultiLineStream(input, initialOffset);
    let state = initialState;
    let tokenOffset = 0;
    let tokenType = lexLanguageTypes_1.TokenType.Unknown;
    let tokenError;
    let multiLineBracket = true;
    function nextWord() {
        return stream.advanceIfRegExp(/^[a-zA-Z]\w*/);
    }
    function nextLiteral() {
        return stream.advanceIfRegExp(/^("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/);
    }
    function finishToken(offset, type, errorMessage) {
        tokenType = type;
        tokenOffset = offset;
        tokenError = errorMessage;
        return type;
    }
    function disableBrackets() {
        multiLineBracket = false;
    }
    function enableBrackets() {
        multiLineBracket = true;
    }
    function scan() {
        const offset = stream.pos();
        const oldState = state;
        const token = internalScan();
        if (token !== lexLanguageTypes_1.TokenType.EOS && offset === stream.pos()) {
            console.log('Scanner.scan has not advanced at offset ' + offset + ', state before: ' + oldState + ' after: ' + state);
            stream.advance(1);
            return finishToken(offset, lexLanguageTypes_1.TokenType.Unknown);
        }
        return token;
    }
    function internalScan() {
        let white = false;
        switch (state) {
            case lexLanguageTypes_1.ScannerState.WithinAction:
            case lexLanguageTypes_1.ScannerState.WithinCode:
            case lexLanguageTypes_1.ScannerState.WithinComment:
                stream.skipWhitespace();
                break;
            default:
                white = stream.skipWitheSpaceWithoutNewLine();
        }
        const offset = stream.pos();
        if (stream.eos()) {
            return finishToken(offset, lexLanguageTypes_1.TokenType.EOS);
        }
        if (white) {
            return finishToken(offset, lexLanguageTypes_1.TokenType.Divider);
        }
        switch (state) {
            case lexLanguageTypes_1.ScannerState.WithinContent:
                const ch = stream.nextChar();
                switch (ch) {
                    case utils_1._FSL: // /
                        if (stream.advanceIfChar(utils_1._AST)) { // /*
                            state = lexLanguageTypes_1.ScannerState.WithinComment;
                            return finishToken(offset, lexLanguageTypes_1.TokenType.StartComment);
                        }
                        if (stream.advanceIfChar(utils_1._FSL)) { // //
                            stream.advanceUntilChar(utils_1._NWL);
                            return finishToken(offset, lexLanguageTypes_1.TokenType.Comment);
                        }
                        break;
                    case utils_1._PCS: // %
                        if (stream.advanceIfChar(utils_1._PCS)) { // %%
                            return finishToken(offset, lexLanguageTypes_1.TokenType.RulesTag);
                        }
                        if (stream.advanceIfChar(utils_1._BOP)) { // %{
                            state = lexLanguageTypes_1.ScannerState.WithinCode;
                            return finishToken(offset, lexLanguageTypes_1.TokenType.StartCode);
                        }
                        if (stream.advanceIfRegExp(/^[\w-]+/)) {
                            return finishToken(offset, lexLanguageTypes_1.TokenType.Option);
                        }
                        return finishToken(offset, lexLanguageTypes_1.TokenType.Percent);
                    case utils_1._LAN: // <
                        if (stream.advanceIfChar(utils_1._LAN)) { // <
                            state = lexLanguageTypes_1.ScannerState.WithinPredefined;
                            return finishToken(offset, lexLanguageTypes_1.TokenType.StartPredefined);
                        }
                        state = lexLanguageTypes_1.ScannerState.WithinStates;
                        return finishToken(offset, lexLanguageTypes_1.TokenType.StartStates);
                    case utils_1._BAR: // |
                        return finishToken(offset, lexLanguageTypes_1.TokenType.Bar);
                    case utils_1._BOP: // {
                        state = lexLanguageTypes_1.ScannerState.WithinAction;
                        return finishToken(offset, lexLanguageTypes_1.TokenType.StartAction);
                    case utils_1._WSP: // ' '
                        stream.advanceUntilChar(utils_1._NWL);
                        return finishToken(offset, lexLanguageTypes_1.TokenType.Invalid);
                    case utils_1._NWL: // \n
                        return finishToken(offset, lexLanguageTypes_1.TokenType.EOL);
                    case utils_1._DQO: // "
                    case utils_1._SQO: // '
                        stream.goBack(1);
                        const literal = nextLiteral();
                        if (literal.length > 0) {
                            return finishToken(offset, lexLanguageTypes_1.TokenType.Literal);
                        }
                        stream.advance(1);
                        return finishToken(offset, lexLanguageTypes_1.TokenType.Unknown);
                    case utils_1._BSL: // \
                        stream.advance(1); // include the next escaped character
                        return finishToken(offset, lexLanguageTypes_1.TokenType.Escape);
                }
                stream.goBack(1);
                const component = nextWord();
                if (component.length > 0) {
                    return finishToken(offset, lexLanguageTypes_1.TokenType.Word);
                }
                stream.advance(1);
                return finishToken(offset, lexLanguageTypes_1.TokenType.Unknown);
            case lexLanguageTypes_1.ScannerState.WithinComment:
                if (stream.advanceIfChars([utils_1._AST, utils_1._FSL])) { // */
                    state = lexLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, lexLanguageTypes_1.TokenType.EndComment);
                }
                stream.advanceUntilChars([utils_1._AST, utils_1._FSL]); // */
                return finishToken(offset, lexLanguageTypes_1.TokenType.Comment);
            case lexLanguageTypes_1.ScannerState.WithinCode:
                if (stream.advanceIfChars([utils_1._PCS, utils_1._BCL])) { // %}
                    state = lexLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, lexLanguageTypes_1.TokenType.EndCode);
                }
                stream.advanceUntilChars([utils_1._PCS, utils_1._BCL]);
                return finishToken(offset, lexLanguageTypes_1.TokenType.Code);
            case lexLanguageTypes_1.ScannerState.WithinAction:
                if (stream.advanceIfChar(utils_1._BCL)) { // }
                    state = lexLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, lexLanguageTypes_1.TokenType.EndAction);
                }
                var exit = false;
                var brackets = 1;
                while (!exit && brackets > 0) {
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
                        case utils_1._NWL:
                            if (!multiLineBracket) {
                                exit = true;
                                state = lexLanguageTypes_1.ScannerState.WithinContent;
                            }
                            break;
                    }
                    if (ch === 0)
                        break;
                }
                if (brackets > 0) {
                    return finishToken(offset, lexLanguageTypes_1.TokenType.Unknown, "Code not closed!");
                }
                if (!exit)
                    stream.goBack(1);
                return finishToken(offset, lexLanguageTypes_1.TokenType.Action);
            case lexLanguageTypes_1.ScannerState.WithinPredefined:
                if (stream.advanceIfChars([utils_1._RAN, utils_1._RAN])) { // >> 
                    state = lexLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, lexLanguageTypes_1.TokenType.EndPredefined);
                }
                stream.advanceUntilChars([utils_1._RAN, utils_1._RAN]);
                return finishToken(offset, lexLanguageTypes_1.TokenType.Predefined);
            case lexLanguageTypes_1.ScannerState.WithinStates:
                if (stream.advanceIfChar(utils_1._RAN)) { // > 
                    state = lexLanguageTypes_1.ScannerState.WithinContent;
                    return finishToken(offset, lexLanguageTypes_1.TokenType.EndStates);
                }
                stream.advanceUntilChar(utils_1._RAN);
                return finishToken(offset, lexLanguageTypes_1.TokenType.States);
        }
        state = lexLanguageTypes_1.ScannerState.WithinContent;
        return finishToken(offset, lexLanguageTypes_1.TokenType.Unknown, "invalid symbol found");
    }
    return {
        scan,
        getTokenType: () => tokenType,
        getTokenOffset: () => tokenOffset,
        getTokenLength: () => stream.pos() - tokenOffset,
        getTokenEnd: () => stream.pos(),
        getTokenText: () => stream.getSource().substring(tokenOffset, stream.pos()),
        getScannerState: () => state,
        getTokenError: () => tokenError,
        enableMultiLineBrackets: () => enableBrackets(),
        disableMultiLineBrackets: () => disableBrackets()
    };
}
exports.createScanner = createScanner;
//# sourceMappingURL=lexScanner.js.map