"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexScanner_1 = require("./lexScanner");
const lexLanguageTypes_1 = require("../lexLanguageTypes");
const utils_1 = require("./utils");
const common_1 = require("../common");
const _CHX = 'x'.charCodeAt(0);
const _CHS = 's'.charCodeAt(0);
exports.predefinedStates = {};
exports.predefinedStates['INITIAL'] = "%s INITIAL /* Predefined initial state. */";
;
;
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Token"] = 0] = "Token";
    NodeType[NodeType["Type"] = 1] = "Type";
    NodeType[NodeType["Rule"] = 2] = "Rule";
    NodeType[NodeType["Embedded"] = 3] = "Embedded";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
;
;
var ParserState;
(function (ParserState) {
    ParserState[ParserState["WaitingDecl"] = 0] = "WaitingDecl";
    ParserState[ParserState["WaitingDef"] = 1] = "WaitingDef";
    ParserState[ParserState["WaitingOptionParams"] = 2] = "WaitingOptionParams";
    ParserState[ParserState["WaitingRule"] = 3] = "WaitingRule";
    ParserState[ParserState["WaitingAction"] = 4] = "WaitingAction";
    ParserState[ParserState["WithinRules"] = 5] = "WithinRules";
    ParserState[ParserState["WithinCode"] = 6] = "WithinCode";
})(ParserState || (ParserState = {}));
;
function parse(text, state = ParserState.WaitingDecl) {
    const scanner = lexScanner_1.createScanner(text);
    const embedded = [];
    const rulesRange = [0, text.length];
    const defines = {};
    const states = {};
    const components = [];
    const problems = [];
    const document = {
        embedded,
        rulesRange,
        defines,
        states,
        components,
        problems,
        getEmbeddedCode(offset) {
            return utils_1.binarySearch(embedded, offset, (code, offset) => offset < code.offset ? 1 : (offset > code.end ? -1 : 0));
        }
    };
    function addProblem(message, offset, end, severity, related) {
        document.problems.push({
            offset: offset,
            end: end,
            message: message,
            type: severity,
            related: related
        });
    }
    function addSymbol(symbols, name, offset, end) {
        const old = symbols[name];
        if (old) {
            addProblem(`Symbol was already declared.`, offset, end, common_1.ProblemType.Error, {
                offset: old.offset,
                end: old.end,
                message: "Was declared here."
            });
        }
        else {
            symbols[name] = {
                offset: offset,
                length: end - offset,
                end: end,
                name: name,
                used: false,
                definition: [offset, end],
                references: [[offset, end]]
            };
        }
    }
    let end = -2;
    // let state = ParserState.WaitingDecl;
    let type = '';
    let token = scanner.scan();
    let offset = 0;
    let codeOffset = 0;
    let tokenText = '';
    let acceptingStates = false;
    let lastToken = token;
    let isConditionScope = false;
    while (end < 0 && token !== lexLanguageTypes_1.TokenType.EOS) {
        offset = scanner.getTokenOffset();
        switch (token) {
            case lexLanguageTypes_1.TokenType.StartCode:
                codeOffset = offset;
                token = scanner.scan();
                continue;
            case lexLanguageTypes_1.TokenType.EndCode:
                document.embedded.push({
                    offset: codeOffset,
                    length: scanner.getTokenEnd() - codeOffset,
                    end: scanner.getTokenEnd()
                });
                token = scanner.scan();
                continue;
            case lexLanguageTypes_1.TokenType.Code:
                token = scanner.scan();
                continue;
            case lexLanguageTypes_1.TokenType.StartComment:
            case lexLanguageTypes_1.TokenType.EndComment:
            case lexLanguageTypes_1.TokenType.Comment:
                token = scanner.scan();
                continue;
        }
        switch (state) {
            case ParserState.WaitingDecl:
                switch (token) {
                    case lexLanguageTypes_1.TokenType.Word:
                        addSymbol(document.defines, scanner.getTokenText(), scanner.getTokenOffset(), scanner.getTokenEnd());
                        // this is stops counting regex pattern like [{] as action opener
                        scanner.disableMultiLineBrackets();
                        state = ParserState.WaitingDef;
                        break;
                    case lexLanguageTypes_1.TokenType.Option:
                        state = ParserState.WaitingOptionParams;
                        const ch = scanner.getTokenText().charCodeAt(1);
                        if (ch === _CHS || ch === _CHX) {
                            acceptingStates = true;
                        }
                        break;
                    case lexLanguageTypes_1.TokenType.RulesTag:
                        state = ParserState.WaitingRule;
                        end++;
                        document.rulesRange[0] = offset;
                        break;
                    case lexLanguageTypes_1.TokenType.Divider:
                        addProblem("No white spaces are allowed at the beginning of the line.", scanner.getTokenOffset(), scanner.getTokenEnd(), common_1.ProblemType.Error);
                        break;
                }
                break;
            case ParserState.WaitingDef:
                switch (token) {
                    case lexLanguageTypes_1.TokenType.EOL:
                        state = ParserState.WaitingDecl;
                        scanner.enableMultiLineBrackets();
                        break;
                    case lexLanguageTypes_1.TokenType.Action:
                        tokenText = scanner.getTokenText();
                        if (/^[a-zA-Z]\w*$/.test(tokenText))
                            document.components.push({
                                name: tokenText,
                                offset: offset,
                                length: scanner.getTokenLength(),
                                end: scanner.getTokenEnd(),
                                used: true,
                                definition: [-1, -1],
                                references: [[offset, scanner.getTokenEnd()]]
                            });
                        break;
                }
                break;
            case ParserState.WaitingOptionParams:
                switch (token) {
                    case lexLanguageTypes_1.TokenType.EOL:
                        state = ParserState.WaitingDecl;
                        acceptingStates = false;
                        break;
                    case lexLanguageTypes_1.TokenType.Word:
                        if (acceptingStates)
                            addSymbol(document.states, scanner.getTokenText(), scanner.getTokenOffset(), scanner.getTokenEnd());
                        break;
                }
                break;
            case ParserState.WaitingRule:
                switch (token) {
                    case lexLanguageTypes_1.TokenType.Literal:
                    case lexLanguageTypes_1.TokenType.Word:
                        break;
                    case lexLanguageTypes_1.TokenType.Predefined:
                        break;
                    case lexLanguageTypes_1.TokenType.States: // found initial states
                        tokenText = scanner.getTokenText();
                        const matcher = /\w+/g;
                        var match;
                        while ((match = matcher.exec(tokenText)) !== null) {
                            const start = offset + match.index;
                            const end = offset + match.index + match[0].length;
                            document.components.push({
                                name: match[0],
                                offset: start,
                                length: match[0].length,
                                end: end,
                                used: true,
                                definition: [-1, -1],
                                references: [[start, end]]
                            });
                        }
                        break;
                    case lexLanguageTypes_1.TokenType.StartAction:
                        isConditionScope = lastToken === lexLanguageTypes_1.TokenType.EndStates;
                        break;
                    case lexLanguageTypes_1.TokenType.Action: // found using user defined definition
                        tokenText = scanner.getTokenText();
                        if (/^[a-zA-Z]\w*$/.test(tokenText)) { // if {word}
                            document.components.push({
                                name: scanner.getTokenText(),
                                offset: offset,
                                length: scanner.getTokenLength(),
                                end: scanner.getTokenEnd(),
                                used: true,
                                definition: [-1, -1],
                                references: [[offset, scanner.getTokenEnd()]]
                            });
                        }
                        else if (/^\d+(\s*,\s*\d+){0,1}$/.test(tokenText)) { // if {5}, {2,3}
                            // do nothing
                        }
                        else if (isConditionScope) {
                            /**
                             * If initial state scope
                             * <state>{
                             *
                             * {word}   ....
                             * {abc}    ....
                             *
                             * }
                             */
                            const recursive = parse(tokenText, ParserState.WaitingRule);
                            recursive.components.forEach(c => {
                                c.offset += offset;
                                c.end += offset;
                                c.references[0][0] += offset;
                                c.references[0][1] += offset;
                                document.components.push(c);
                            });
                            recursive.embedded.forEach(code => {
                                code.offset += offset;
                                code.end += offset;
                                document.embedded.push(code);
                            });
                        }
                        else {
                            addProblem("Invalid definition pattern.", scanner.getTokenOffset(), scanner.getTokenEnd(), common_1.ProblemType.Error);
                        }
                        break;
                    case lexLanguageTypes_1.TokenType.Divider:
                        state = ParserState.WaitingAction;
                        break;
                    case lexLanguageTypes_1.TokenType.RulesTag:
                        end++;
                        document.rulesRange[1] = offset;
                        break;
                }
                break;
            case ParserState.WaitingAction:
                switch (token) {
                    case lexLanguageTypes_1.TokenType.EOL:
                    case lexLanguageTypes_1.TokenType.Bar:
                        state = ParserState.WaitingRule;
                        break;
                    case lexLanguageTypes_1.TokenType.StartAction:
                        codeOffset = offset;
                        break;
                    case lexLanguageTypes_1.TokenType.EndAction:
                        document.embedded.push({
                            offset: codeOffset,
                            length: scanner.getTokenEnd() - codeOffset,
                            end: scanner.getTokenEnd()
                        });
                        break;
                }
                break;
        }
        lastToken = token;
        token = scanner.scan();
    }
    for (let i = 0; i < document.components.length; i++) {
        const component = document.components[i];
        let symbol;
        if ((symbol = document.defines[component.name])) {
            component.definition = symbol.definition;
            component.references = symbol.references;
            symbol.references.push([component.offset, component.end]);
            symbol.used = true;
        }
        else if ((symbol = document.states[component.name])) {
            component.definition = symbol.definition;
            component.references = symbol.references;
            symbol.references.push([component.offset, component.end]);
            symbol.used = true;
        }
        else if (!exports.predefinedStates[component.name]) {
            addProblem('Symbol not declared.', component.offset, component.end, common_1.ProblemType.Error);
        }
    }
    Object.keys(document.defines).forEach(key => {
        const component = document.defines[key];
        if (!component.used) {
            addProblem('Definition declared but never used.', component.offset, component.end, common_1.ProblemType.Warning);
        }
    });
    Object.keys(document.states).forEach(key => {
        const component = document.states[key];
        if (!component.used) {
            addProblem('Definition declared but never used.', component.offset, component.end, common_1.ProblemType.Warning);
        }
    });
    return document;
}
exports.parse = parse;
//# sourceMappingURL=lexParser.js.map