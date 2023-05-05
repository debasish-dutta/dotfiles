"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *
 *  Modified to adapt the project
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function newSemanticTokenProvider(languageModes) {
    const legend = { types: [], modifiers: [] };
    const legendMappings = {};
    for (let mode of languageModes.getAllModes()) {
        if (mode.getSemanticTokenLegend && mode.getSemanticTokens) {
            const modeLegend = mode.getSemanticTokenLegend();
            legendMappings[mode.getId()] = { types: createMapping(modeLegend.types, legend.types), modifiers: createMapping(modeLegend.modifiers, legend.modifiers) };
        }
    }
    return {
        legend,
        getSemanticTokens(document, ranges) {
            const builder = new vscode_1.SemanticTokensBuilder();
            for (let mode of languageModes.getAllModes()) {
                if (mode.getSemanticTokens) {
                    const mapping = legendMappings[mode.getId()];
                    const tokens = mode.getSemanticTokens(document);
                    applyTypesMapping(tokens, mapping.types);
                    applyModifiersMapping(tokens, mapping.modifiers);
                    tokens.forEach(token => {
                        builder.push(token.start.line, token.start.character, token.length, token.typeIdx, token.modifierSet);
                    });
                }
            }
            return builder.build();
        }
    };
}
exports.newSemanticTokenProvider = newSemanticTokenProvider;
function createMapping(origLegend, newLegend) {
    const mapping = [];
    let needsMapping = false;
    for (let origIndex = 0; origIndex < origLegend.length; origIndex++) {
        const entry = origLegend[origIndex];
        let newIndex = newLegend.indexOf(entry);
        if (newIndex === -1) {
            newIndex = newLegend.length;
            newLegend.push(entry);
        }
        mapping.push(newIndex);
        needsMapping = needsMapping || (newIndex !== origIndex);
    }
    return needsMapping ? mapping : undefined;
}
function applyTypesMapping(tokens, typesMapping) {
    if (typesMapping) {
        for (let token of tokens) {
            token.typeIdx = typesMapping[token.typeIdx];
        }
    }
}
function applyModifiersMapping(tokens, modifiersMapping) {
    if (modifiersMapping) {
        for (let token of tokens) {
            let modifierSet = token.modifierSet;
            if (modifierSet) {
                let index = 0;
                let result = 0;
                while (modifierSet > 0) {
                    if ((modifierSet & 1) !== 0) {
                        result = result + (1 << modifiersMapping[index]);
                    }
                    index++;
                    modifierSet = modifierSet >> 1;
                }
                token.modifierSet = result;
            }
        }
    }
}
//# sourceMappingURL=semanticProvider.js.map