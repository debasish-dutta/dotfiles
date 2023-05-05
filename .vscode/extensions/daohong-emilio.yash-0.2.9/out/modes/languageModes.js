"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaccLanguageServices_1 = require("../languages/yaccLanguageServices");
const lexLanguageService_1 = require("../languages/lexLanguageService");
const yaccMode_1 = require("./yaccMode");
const lexMode_1 = require("./lexMode");
function getLanguageModes(supportedLanguages) {
    const yaccLanguageService = yaccLanguageServices_1.getLanguageService();
    const lexLanguageService = lexLanguageService_1.getLanguageService();
    let modelCaches = [];
    let modes = Object.create(null);
    if (supportedLanguages['yacc']) {
        modes['yacc'] = yaccMode_1.getYACCMode(yaccLanguageService);
    }
    if (supportedLanguages['lex']) {
        modes['lex'] = lexMode_1.getLEXMode(lexLanguageService);
    }
    return {
        getAllModes() {
            let result = [];
            for (let languageId in modes) {
                let mode = modes[languageId];
                if (mode) {
                    result.push(mode);
                }
            }
            return result;
        },
        getMode(languageId) {
            return modes[languageId];
        },
        onDocumentRemoved(document) {
            modelCaches.forEach(mc => mc.onDocumentRemoved(document));
            for (let mode in modes) {
                modes[mode].onDocumentRemoved(document);
            }
        },
        dispose() {
            modelCaches.forEach(mc => mc.dispose());
            modelCaches = [];
            for (let mode in modes) {
                modes[mode].dispose();
            }
            modes = {};
        }
    };
}
exports.getLanguageModes = getLanguageModes;
//# sourceMappingURL=languageModes.js.map