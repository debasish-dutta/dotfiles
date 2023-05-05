"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentCache_1 = require("../documentCache");
function getLEXMode(lexLanguageService) {
    const cache = documentCache_1.CreateDocumentCache(10, 60, document => lexLanguageService.parseLexDocument(document));
    return {
        getId() {
            return 'lex';
        },
        doValidation(document) {
            const lex = cache.get(document);
            return lexLanguageService.doValidation(document, lex);
        },
        doComplete(document, position) {
            const lex = cache.get(document);
            return lexLanguageService.doComplete(document, position, lex);
        },
        doHover(document, position) {
            const lex = cache.get(document);
            return lexLanguageService.doHover(document, position, lex);
        },
        findDefinition(document, position) {
            const lex = cache.get(document);
            return lexLanguageService.findDefinition(document, position, lex);
        },
        findReferences(document, position) {
            const lex = cache.get(document);
            return lexLanguageService.findReferences(document, position, lex);
        },
        doRename(document, position, newName) {
            const lex = cache.get(document);
            return lexLanguageService.doRename(document, position, newName, lex);
        },
        onDocumentRemoved(document) {
            cache.onDocumentRemoved(document);
        },
        dispose() {
            cache.dispose();
        }
    };
}
exports.getLEXMode = getLEXMode;
//# sourceMappingURL=lexMode.js.map