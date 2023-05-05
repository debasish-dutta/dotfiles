"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const common_1 = require("../common");
function doLEXValidation(document, lexDocument) {
    const diags = [];
    lexDocument.problems.forEach(problem => {
        const range = new vscode_1.Range(document.positionAt(problem.offset), document.positionAt(problem.end));
        let severity = vscode_1.DiagnosticSeverity.Information;
        switch (problem.type) {
            case common_1.ProblemType.Error:
                severity = vscode_1.DiagnosticSeverity.Error;
                break;
            case common_1.ProblemType.Information:
                severity = vscode_1.DiagnosticSeverity.Information;
                break;
            case common_1.ProblemType.Warning:
                severity = vscode_1.DiagnosticSeverity.Warning;
                break;
        }
        const diag = new vscode_1.Diagnostic(range, problem.message, severity);
        if (problem.related) {
            diag.relatedInformation = [new vscode_1.DiagnosticRelatedInformation(new vscode_1.Location(document.uri, new vscode_1.Range(document.positionAt(problem.related.offset), document.positionAt(problem.related.end))), problem.related.message)];
        }
        diags.push(diag);
    });
    return diags;
}
exports.doLEXValidation = doLEXValidation;
//# sourceMappingURL=lexValidation.js.map