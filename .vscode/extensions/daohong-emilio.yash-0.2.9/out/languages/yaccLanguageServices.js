"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaccScanner_1 = require("./parser/yaccScanner");
const yaccParser_1 = require("./parser/yaccParser");
const yaccCompletions_1 = require("./services/yaccCompletions");
const yaccHover_1 = require("./services/yaccHover");
const yaccDefinitions_1 = require("./services/yaccDefinitions");
const yaccReferences_1 = require("./services/yaccReferences");
const yaccRename_1 = require("./services/yaccRename");
const yaccValidation_1 = require("./services/yaccValidation");
const yaccTypeDefinition_1 = require("./services/yaccTypeDefinition");
function getLanguageService() {
    return {
        createScanner: yaccScanner_1.createScanner,
        parseYACCDocument: document => yaccParser_1.parse(document.getText()),
        doComplete: (document, position, yaccDocument) => yaccCompletions_1.doYACCComplete(document, position, yaccDocument),
        doValidation: (document, yaccDocument) => yaccValidation_1.doYACCValidation(document, yaccDocument),
        getSemanticTokens: (document, yaccDocument) => yaccDocument.getSemanticTokens(document.positionAt.bind(document)),
        doHover: (document, position, yaccDocument) => yaccHover_1.doYACCHover(document, position, yaccDocument),
        findTypeDefinition: (document, position, yaccDocument) => yaccTypeDefinition_1.doYACCFindTypeDefinition(document, position, yaccDocument),
        findDefinition: (document, position, yaccDocument) => yaccDefinitions_1.doYACCFindDefinition(document, position, yaccDocument),
        findReferences: (document, position, yaccDocument) => yaccReferences_1.doYACCFindReferences(document, position, yaccDocument),
        doRename: (document, position, newName, yaccDocument) => yaccRename_1.doYACCRename(document, position, newName, yaccDocument)
    };
}
exports.getLanguageService = getLanguageService;
//# sourceMappingURL=yaccLanguageServices.js.map