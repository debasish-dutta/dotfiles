"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexScanner_1 = require("./parser/lexScanner");
const lexParser_1 = require("./parser/lexParser");
const lexCompletions_1 = require("./services/lexCompletions");
const lexHover_1 = require("./services/lexHover");
const lexDefinition_1 = require("./services/lexDefinition");
const lexRename_1 = require("./services/lexRename");
const lexReferences_1 = require("./services/lexReferences");
const lexValidation_1 = require("./services/lexValidation");
function getLanguageService() {
    return {
        createScanner: lexScanner_1.createScanner,
        parseLexDocument: document => lexParser_1.parse(document.getText()),
        doValidation: (document, lexDocument) => lexValidation_1.doLEXValidation(document, lexDocument),
        doComplete: (document, position, lexDocument) => lexCompletions_1.doLEXCompletion(document, position, lexDocument),
        doHover: (document, position, lexDocument) => lexHover_1.doLEXHover(document, position, lexDocument),
        findDefinition: (document, position, lexDocument) => lexDefinition_1.doLEXFindDefinition(document, position, lexDocument),
        findReferences: (document, position, lexDocument) => lexReferences_1.doLEXFindReferences(document, position, lexDocument),
        doRename: (document, position, newName, lexDocument) => lexRename_1.doLEXRename(document, position, newName, lexDocument)
    };
}
exports.getLanguageService = getLanguageService;
//# sourceMappingURL=lexLanguageService.js.map