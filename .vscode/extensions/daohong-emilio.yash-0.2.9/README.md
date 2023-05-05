# Yet Another Syntax Highlighter

This is yet another syntax highlighter for lex/yacc and flex/bison.

## Features

This extension provides full syntax highlight for these languages and also for the embedded language C/C++.

This extension also supports some basic language features such as:
- Code diagnostic 
- Auto-completion
- Go to Definition
- Go to Type Definition
- Find references
- Rename Symbol
- Hover 

## Preview

### Completion for lex
![](https://github.com/babyraging/yash/raw/HEAD/images/lex_define.gif)
  
### Completion for yacc
![](https://github.com/babyraging/yash/raw/HEAD/images/yacc_symbol.gif)

### Diagnostic

![](https://github.com/babyraging/yash/raw/HEAD/images/redefinition.png)

### More examples

You can find more previews here [previews](https://github.com/babyraging/yash/blob/HEAD/images/README.md).

## Notice

Since 1.43.0 VSCode enabled a new feature called Semantic Highlighting, this extension supports it. 

By default, only the built-in themes has semantic highlighting enabled, so if you are using a 3rd party theme that doesn't support the semantic coloring yet, you have to add these lines to your `settings.json` file to have the feature enabled. 
```json
"editor.tokenColorCustomizations": {
	"[name of the theme]": {
		"semanticHighlighting": true
	}
}
```
For extra information see https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview.

Here is the comparison with and without semantic highlighting. 

On left enabled, on right disabled

![](https://github.com/babyraging/yash/raw/HEAD/images/semantic_comparison.png)

## Requirements

VSCode ^1.44

## Contributors

- [@babyraging](https://github.com/babyraging) - creator
- [@sceriffo](https://github.com/Sceriffo) - creator 
