"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *
 *  Modified to adapt the project
 *--------------------------------------------------------------------------------------------*/
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
function formatError(message, err) {
    if (err instanceof Error) {
        let error = err;
        return `${message}: ${error.message}\n${error.stack}`;
    }
    else if (typeof err === 'string') {
        return `${message}: ${err}`;
    }
    else if (err) {
        return `${message}: ${err.toString()}`;
    }
    return message;
}
exports.formatError = formatError;
function runSafeAsync(func, errorVal, errorMessage, token) {
    return new Promise((resolve) => {
        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
            if (token.isCancellationRequested) {
                resolve(cancelValue());
            }
            return func().then(result => {
                if (token.isCancellationRequested) {
                    resolve(cancelValue());
                    return;
                }
                else {
                    resolve(result);
                }
            }, e => {
                console.error(formatError(errorMessage, e));
                resolve(errorVal);
            });
        }));
    });
}
exports.runSafeAsync = runSafeAsync;
function runSafe(func, errorVal, errorMessage, token) {
    return new Promise((resolve) => {
        setImmediate(() => {
            if (token.isCancellationRequested) {
                resolve(cancelValue());
            }
            else {
                try {
                    let result = func();
                    if (token.isCancellationRequested) {
                        resolve(cancelValue());
                        return;
                    }
                    else {
                        resolve(result);
                    }
                }
                catch (e) {
                    console.error(formatError(errorMessage, e));
                    resolve(errorVal);
                }
            }
        });
    });
}
exports.runSafe = runSafe;
function cancelValue() {
    console.log("Request cancelled...");
    return undefined;
}
//# sourceMappingURL=runner.js.map