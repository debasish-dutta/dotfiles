"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cacher = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const latex_utensils_1 = require("latex-utensils");
const lw = __importStar(require("../lw"));
const eventbus = __importStar(require("./eventbus"));
const utils = __importStar(require("../utils/utils"));
const inputfilepath_1 = require("../utils/inputfilepath");
const cacherutils_1 = require("./cacherlib/cacherutils");
const pathutils_1 = require("./cacherlib/pathutils");
const watcher_1 = require("./cacherlib/watcher");
const logger_1 = require("./logger");
const syntax_1 = require("./parser/syntax");
const logger = (0, logger_1.getLogger)('Cacher');
class Cacher {
    constructor() {
        this.caches = {};
        this.src = new watcher_1.Watcher();
        this.pdf = new watcher_1.Watcher('.pdf');
        this.bib = new watcher_1.Watcher('.bib');
        this.caching = 0;
        this.promises = {};
        this.src.onChange((filePath) => {
            if (cacherutils_1.CacherUtils.canCache(filePath)) {
                void this.refreshCache(filePath);
            }
        });
        this.src.onDelete((filePath) => {
            if (filePath in this.caches) {
                delete this.caches[filePath];
                logger.log(`Removed ${filePath} .`);
            }
        });
    }
    add(filePath) {
        if (cacherutils_1.CacherUtils.isExcluded(filePath)) {
            logger.log(`Ignored ${filePath} .`);
            return;
        }
        if (!this.src.has(filePath)) {
            logger.log(`Adding ${filePath} .`);
            this.src.add(filePath);
        }
    }
    has(filePath) {
        return Object.keys(this.caches).includes(filePath);
    }
    get(filePath) {
        return this.caches[filePath];
    }
    promise(filePath) {
        return this.promises[filePath];
    }
    get allPromises() {
        return Object.values(this.promises);
    }
    get allPaths() {
        return Object.keys(this.caches);
    }
    reset() {
        this.src.reset();
        this.bib.reset();
        this.pdf.reset();
        Object.keys(this.caches).forEach(filePath => delete this.caches[filePath]);
    }
    async refreshCache(filePath, rootPath) {
        if (cacherutils_1.CacherUtils.isExcluded(filePath)) {
            logger.log(`Ignored ${filePath} .`);
            return;
        }
        if (!cacherutils_1.CacherUtils.canCache(filePath)) {
            return;
        }
        logger.log(`Caching ${filePath} .`);
        this.caching++;
        const content = lw.lwfs.readFileSyncGracefully(filePath);
        this.caches[filePath] = { content, elements: {}, children: [], bibfiles: new Set(), external: {} };
        if (content === undefined) {
            logger.log(`Cannot read ${filePath} .`);
            return;
        }
        const contentTrimmed = utils.stripCommentsAndVerbatim(content);
        rootPath = rootPath || lw.manager.rootFile;
        this.updateChildren(filePath, rootPath, contentTrimmed);
        this.promises[filePath] = this.updateAST(filePath, content).then(() => {
            this.updateElements(filePath, content, contentTrimmed);
            this.updateBibfiles(filePath, contentTrimmed);
        }).finally(() => {
            logger.log(`Cached ${filePath} .`);
            this.caching--;
            delete this.promises[filePath];
            lw.eventBus.fire(eventbus.FileParsed, filePath);
            if (this.caching === 0) {
                void lw.structureViewer.computeTreeStructure();
            }
        });
        return this.promises[filePath];
    }
    async updateAST(filePath, content) {
        const configuration = vscode.workspace.getConfiguration('latex-workshop');
        const fastparse = configuration.get('intellisense.fastparse.enabled');
        const ast = await syntax_1.UtensilsParser.parseLatex(fastparse ? utils.stripText(content) : content).catch((e) => {
            if (latex_utensils_1.latexParser.isSyntaxError(e)) {
                const line = e.location.start.line;
                logger.log(`Error parsing AST of ${filePath} at line ${line}.`);
            }
            return;
        });
        const cache = this.get(filePath);
        if (ast && cache) {
            cache.ast = ast;
        }
    }
    updateChildren(filePath, rootPath, contentTrimmed) {
        rootPath = rootPath || filePath;
        this.updateChildrenInput(filePath, rootPath, contentTrimmed);
        this.updateChildrenXr(filePath, rootPath, contentTrimmed);
        logger.log(`Updated inputs of ${filePath} .`);
    }
    updateChildrenInput(filePath, rootPath, contentTrimmed) {
        const inputFileRegExp = new inputfilepath_1.InputFileRegExp();
        while (true) {
            const result = inputFileRegExp.exec(contentTrimmed, filePath, rootPath);
            if (!result) {
                break;
            }
            if (!fs.existsSync(result.path) || path.relative(result.path, rootPath) === '') {
                continue;
            }
            this.caches[rootPath].children.push({
                index: result.match.index,
                filePath: result.path
            });
            logger.log(`Input ${result.path} from ${filePath} .`);
            if (this.src.has(result.path)) {
                continue;
            }
            this.add(result.path);
            void this.refreshCache(result.path, rootPath);
        }
    }
    updateChildrenXr(filePath, rootPath, contentTrimmed) {
        const externalDocRegExp = /\\externaldocument(?:\[(.*?)\])?\{(.*?)\}/g;
        while (true) {
            const result = externalDocRegExp.exec(contentTrimmed);
            if (!result) {
                break;
            }
            const texDirs = vscode.workspace.getConfiguration('latex-workshop').get('latex.texDirs');
            const externalPath = utils.resolveFile([path.dirname(filePath), path.dirname(rootPath), ...texDirs], result[2]);
            if (!externalPath || !fs.existsSync(externalPath) || path.relative(externalPath, rootPath) === '') {
                logger.log(`Failed resolving external ${result[2]} . Tried ${externalPath} ` +
                    (externalPath && path.relative(externalPath, rootPath) === '' ? ', which is root.' : '.'));
                continue;
            }
            this.caches[rootPath].external[externalPath] = result[1] || '';
            logger.log(`External document ${externalPath} from ${filePath} .` +
                (result[1] ? ` Prefix is ${result[1]}` : ''));
            if (this.src.has(externalPath)) {
                continue;
            }
            this.add(externalPath);
            void this.refreshCache(externalPath, externalPath);
        }
    }
    updateElements(filePath, content, contentTrimmed) {
        lw.completer.citation.update(filePath, content);
        const cache = this.get(filePath);
        if (cache?.ast) {
            const nodes = cache.ast.content;
            const lines = content.split('\n');
            lw.completer.reference.update(filePath, nodes, lines);
            lw.completer.glossary.update(filePath, nodes);
            lw.completer.environment.update(filePath, nodes, lines);
            lw.completer.command.update(filePath, nodes);
        }
        else {
            logger.log(`Use RegExp to update elements of ${filePath} .`);
            lw.completer.reference.update(filePath, undefined, undefined, contentTrimmed);
            lw.completer.glossary.update(filePath, undefined, contentTrimmed);
            lw.completer.environment.update(filePath, undefined, undefined, contentTrimmed);
            lw.completer.command.update(filePath, undefined, contentTrimmed);
        }
        lw.duplicateLabels.run(filePath);
        logger.log(`Updated elements of ${filePath} .`);
    }
    updateBibfiles(filePath, contentTrimmed) {
        const bibReg = /(?:\\(?:bibliography|addbibresource)(?:\[[^[\]{}]*\])?){(.+?)}|(?:\\putbib)\[(.+?)\]/g;
        while (true) {
            const result = bibReg.exec(contentTrimmed);
            if (!result) {
                break;
            }
            const bibs = (result[1] ? result[1] : result[2]).split(',').map(bib => bib.trim());
            for (const bib of bibs) {
                const bibPath = pathutils_1.PathUtils.resolveBibPath(bib, path.dirname(filePath));
                if (bibPath === undefined) {
                    continue;
                }
                this.caches[filePath].bibfiles.add(bibPath);
                logger.log(`Bib ${bibPath} from ${filePath} .`);
                if (!this.bib.has(bibPath)) {
                    this.bib.add(bibPath);
                }
            }
        }
        logger.log(`Updated bibs of ${filePath} .`);
    }
    /**
     * Parses the content of a `.fls` file attached to the given `srcFile`.
     * All `INPUT` files are considered as subfiles/non-tex files included in `srcFile`,
     * and all `OUTPUT` files will be checked if they are `.aux` files.
     * If so, the `.aux` files are parsed for any possible `.bib` files.
     *
     * This function is called after a successful build, when looking for the root file,
     * and to compute the cachedContent tree.
     *
     * @param filePath The path of a LaTeX file.
     */
    async loadFlsFile(filePath) {
        const flsPath = pathutils_1.PathUtils.getFlsFilePath(filePath);
        if (flsPath === undefined) {
            return;
        }
        logger.log(`Parsing .fls ${flsPath} .`);
        const rootDir = path.dirname(filePath);
        const outDir = lw.manager.getOutDir(filePath);
        const ioFiles = cacherutils_1.CacherUtils.parseFlsContent(fs.readFileSync(flsPath).toString(), rootDir);
        for (const inputFile of ioFiles.input) {
            // Drop files that are also listed as OUTPUT or should be ignored
            if (ioFiles.output.includes(inputFile) ||
                cacherutils_1.CacherUtils.isExcluded(inputFile) ||
                !fs.existsSync(inputFile)) {
                continue;
            }
            if (inputFile === filePath || this.src.has(inputFile)) {
                // Drop the current rootFile often listed as INPUT
                // Drop any file that is already watched as it is handled by
                // onWatchedFileChange.
                continue;
            }
            if (path.extname(inputFile) === '.tex') {
                if (!this.has(filePath)) {
                    logger.log(`Cache not finished on ${filePath} when parsing fls.`);
                    await this.refreshCache(filePath);
                }
                // Parse tex files as imported subfiles.
                this.caches[filePath].children.push({
                    index: Number.MAX_VALUE,
                    filePath: inputFile
                });
                this.add(inputFile);
                logger.log(`Found ${inputFile} from .fls ${flsPath} , caching.`);
                void this.refreshCache(inputFile, filePath);
            }
            else if (!this.src.has(inputFile)) {
                // Watch non-tex files.
                this.add(inputFile);
            }
        }
        for (const outputFile of ioFiles.output) {
            if (path.extname(outputFile) === '.aux' && fs.existsSync(outputFile)) {
                logger.log(`Found .aux ${filePath} from .fls ${flsPath} , parsing.`);
                this.parseAuxFile(outputFile, path.dirname(outputFile).replace(outDir, rootDir));
                logger.log(`Parsed .aux ${filePath} .`);
            }
        }
        logger.log(`Parsed .fls ${flsPath} .`);
    }
    parseAuxFile(filePath, srcDir) {
        const content = fs.readFileSync(filePath).toString();
        const regex = /^\\bibdata{(.*)}$/gm;
        while (true) {
            const result = regex.exec(content);
            if (!result) {
                return;
            }
            const bibs = (result[1] ? result[1] : result[2]).split(',').map((bib) => {
                return bib.trim();
            });
            for (const bib of bibs) {
                const bibPath = pathutils_1.PathUtils.resolveBibPath(bib, srcDir);
                if (bibPath === undefined) {
                    continue;
                }
                const rootFile = lw.manager.rootFile;
                if (rootFile && !this.get(rootFile)?.bibfiles.has(bibPath)) {
                    this.get(rootFile)?.bibfiles.add(bibPath);
                    logger.log(`Found .bib ${bibPath} from .aux ${filePath} .`);
                }
                if (!this.bib.has(bibPath)) {
                    this.bib.add(bibPath);
                }
            }
        }
    }
    getTeXChildrenFromFls(texFile) {
        const flsFile = pathutils_1.PathUtils.getFlsFilePath(texFile);
        if (flsFile === undefined) {
            return [];
        }
        const rootDir = path.dirname(texFile);
        const ioFiles = cacherutils_1.CacherUtils.parseFlsContent(fs.readFileSync(flsFile).toString(), rootDir);
        return ioFiles.input;
    }
    /**
     * Return a string array which holds all imported bib files
     * from the given tex `file`. If `file` is `undefined`, traces from the
     * root file, or return empty array if the root file is `undefined`
     *
     * @param file The path of a LaTeX file
     */
    getIncludedBib(file, includedBib = [], children = []) {
        if (file === undefined) {
            file = lw.manager.rootFile;
        }
        if (file === undefined) {
            return [];
        }
        if (!this.has(file)) {
            return [];
        }
        children.push(file);
        const cache = this.get(file);
        if (cache) {
            includedBib.push(...cache.bibfiles);
            for (const child of cache.children) {
                if (children.includes(child.filePath)) {
                    // Already parsed
                    continue;
                }
                this.getIncludedBib(child.filePath, includedBib);
            }
        }
        // Make sure to return an array with unique entries
        return Array.from(new Set(includedBib));
    }
    /**
     * Return a string array which holds all imported tex files
     * from the given `file` including the `file` itself.
     * If `file` is `undefined`, trace from the * root file,
     * or return empty array if the root file is `undefined`
     *
     * @param file The path of a LaTeX file
     */
    getIncludedTeX(file, includedTeX = []) {
        if (file === undefined) {
            file = lw.manager.rootFile;
        }
        if (file === undefined) {
            return [];
        }
        if (!this.has(file)) {
            return [];
        }
        includedTeX.push(file);
        const cache = this.get(file);
        if (cache) {
            for (const child of cache.children) {
                if (includedTeX.includes(child.filePath)) {
                    // Already included
                    continue;
                }
                this.getIncludedTeX(child.filePath, includedTeX);
            }
        }
        return includedTeX;
    }
    /**
     * Return the list of files (recursively) included in `file`
     *
     * @param filePath The file in which children are recursively computed
     * @param basePath The file currently considered as the rootFile
     * @param children The list of already computed children
     */
    async getTeXChildren(filePath, basePath, children) {
        if (!this.has(filePath)) {
            logger.log(`Cache not finished on ${filePath} when getting its children.`);
            await this.refreshCache(filePath, basePath);
        }
        this.get(filePath)?.children.forEach(async (child) => {
            if (children.includes(child.filePath)) {
                // Already included
                return;
            }
            children.push(child.filePath);
            await this.getTeXChildren(child.filePath, basePath, children);
        });
        return children;
    }
}
exports.Cacher = Cacher;
//# sourceMappingURL=cacher.js.map