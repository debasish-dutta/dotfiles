"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const semanticProvider_1 = require("./modes/semanticProvider");
const languageModes_1 = require("./modes/languageModes");
const runner_1 = require("./runner");
const pendingValidationRequests = {};
const validationDelayMs = 500;
const languageModes = languageModes_1.getLanguageModes({ yacc: true, lex: true });
const semanticProvider = semanticProvider_1.newSemanticTokenProvider(languageModes);
const selector = [{ scheme: 'file', language: 'yacc' }, { scheme: 'file', language: 'lex' }];
const diagnostics = vscode.languages.createDiagnosticCollection();
let configurationChanged = false;
function activate(context) {
    context.subscriptions.push(diagnostics);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, {
        provideCompletionItems(document, position, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.doComplete) {
                        return { isIncomplete: true, items: [] };
                    }
                    const doComplete = mode.doComplete;
                    return doComplete(document, position);
                }, null, `Error while computing completion for ${document.uri.toString()}`, token);
            });
        }
    }, '%', '<', '{'));
    context.subscriptions.push(vscode.languages.registerHoverProvider(selector, {
        provideHover(document, position, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.doHover) {
                        return null;
                    }
                    return mode.doHover(document, position);
                }, null, `Error while computing hover for ${document.uri.toString()}`, token);
            });
        }
    }));
    context.subscriptions.push(vscode.languages.registerTypeDefinitionProvider(selector, {
        provideTypeDefinition(document, position, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.findTypeDefinition) {
                        return null;
                    }
                    return mode.findTypeDefinition(document, position);
                }, null, `Error while computing find type definition for ${document.uri.toString()}`, token);
            });
        }
    }));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, {
        provideDefinition(document, position, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.findDefinition) {
                        return null;
                    }
                    return mode.findDefinition(document, position);
                }, null, `Error while computing find definition for ${document.uri.toString()}`, token);
            });
        }
    }));
    context.subscriptions.push(vscode.languages.registerRenameProvider(selector, {
        provideRenameEdits(document, position, newName, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.doRename) {
                        return null;
                    }
                    return mode.doRename(document, position, newName);
                }, null, `Error while computing find definition for ${document.uri.toString()}`, token);
            });
        }
    }));
    context.subscriptions.push(vscode.languages.registerReferenceProvider(selector, {
        provideReferences(document, position, context, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    const mode = languageModes.getMode(document.languageId);
                    if (!mode || !mode.findReferences) {
                        return null;
                    }
                    return mode.findReferences(document, position);
                }, null, `Error while computing find references for ${document.uri.toString()}`, token);
            });
        }
    }));
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider('yacc', {
        provideDocumentSemanticTokens(document, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return runner_1.runSafe(() => {
                    return semanticProvider.getSemanticTokens(document);
                }, null, `Error while computing semantic tokens for ${document.uri.toString()}`, token);
            });
        }
    }, new vscode.SemanticTokensLegend(semanticProvider.legend.types, semanticProvider.legend.modifiers)));
    // The content of a text document has changed. 
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(change => {
        triggerValidation(change.document);
    }));
    // A document has closed: clear all diagnostics
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(document => {
        cleanPendingValidation(document);
        diagnostics.set(document.uri, []);
    }));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            if (configurationChanged) {
                validateTextDocument(editor.document, true);
            }
            else {
                triggerValidation(editor.document);
            }
        }
    }));
    // Configuration is changed, trigger validation
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
        configurationChanged = event.affectsConfiguration('yash.YYTYPE');
    }));
    if (vscode.window.activeTextEditor) {
        triggerValidation(vscode.window.activeTextEditor.document);
    }
}
exports.activate = activate;
function cleanPendingValidation(textDocument) {
    const request = pendingValidationRequests[textDocument.uri.toString()];
    if (request) {
        clearTimeout(request);
        delete pendingValidationRequests[textDocument.uri.toString()];
    }
}
function triggerValidation(textDocument) {
    cleanPendingValidation(textDocument);
    pendingValidationRequests[textDocument.uri.toString()] = setTimeout(() => {
        delete pendingValidationRequests[textDocument.uri.toString()];
        validateTextDocument(textDocument);
    }, validationDelayMs);
}
function validateTextDocument(document, force) {
    return __awaiter(this, void 0, void 0, function* () {
        const mode = languageModes.getMode(document.languageId);
        if (!mode || !mode.doValidation) {
            return null;
        }
        diagnostics.set(document.uri, mode.doValidation(document, force));
        configurationChanged = false;
    });
}
//# sourceMappingURL=extension.js.map