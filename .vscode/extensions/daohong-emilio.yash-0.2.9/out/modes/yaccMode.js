"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaccLanguageTypes_1 = require("../languages/yaccLanguageTypes");
const documentCache_1 = require("../documentCache");
function getYACCMode(yaccLanguageService) {
    const cache = documentCache_1.CreateDocumentCache(10, 60, document => yaccLanguageService.parseYACCDocument(document));
    return {
        getId() {
            return 'yacc';
        },
        doValidation(document, force) {
            if (force) {
                return yaccLanguageService.doValidation(document, yaccLanguageService.parseYACCDocument(document));
            }
            const yacc = cache.get(document);
            return yaccLanguageService.doValidation(document, yacc);
        },
        doComplete(document, position) {
            const yacc = cache.get(document);
            return yaccLanguageService.doComplete(document, position, yacc);
        },
        doHover(document, position) {
            const yacc = cache.get(document);
            return yaccLanguageService.doHover(document, position, yacc);
        },
        findTypeDefinition(document, position) {
            const yacc = cache.get(document);
            return yaccLanguageService.findTypeDefinition(document, position, yacc);
        },
        findDefinition(document, position) {
            const yacc = cache.get(document);
            return yaccLanguageService.findDefinition(document, position, yacc);
        },
        findReferences(document, position) {
            const yacc = cache.get(document);
            return yaccLanguageService.findReferences(document, position, yacc);
        },
        doRename(document, position, newName) {
            const yacc = cache.get(document);
            return yaccLanguageService.doRename(document, position, newName, yacc);
        },
        getSemanticTokens(document) {
            const yacc = cache.get(document);
            return yaccLanguageService.getSemanticTokens(document, yacc);
        },
        getSemanticTokenLegend() {
            return { types: yaccLanguageTypes_1.tokenTypes, modifiers: yaccLanguageTypes_1.tokenModifiers };
        },
        onDocumentRemoved(document) {
            cache.onDocumentRemoved(document);
        },
        dispose() {
            cache.dispose();
        }
    };
}
exports.getYACCMode = getYACCMode;
//# sourceMappingURL=yaccMode.js.map