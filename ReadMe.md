# <img src="logo/logo_long_desc_bg_white.svg" alt="CONTEXT Builder">

[![Version](https://img.shields.io/badge/version-0.2.7--alpha-blue)](https://github.com/your-repo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is CONTEXT Builder?

**CONTEXT Builder** is a CLI utility that parses your codebase directory and compresses it into a single, high-density artifact optimized for **LLM (Large Language Model) digestion**.

If you prefer your own IDE (VS Code, Vim, Sublime) over AI-native editors but still want the power of Claude or ChatGPT, this tool is for you. It instantly generates a context file containing your project's structure and code, which you can simply upload or paste into any AI chat.

### Why use it?
- **Token Efficiency**: Aggressively strips comments and whitespace with the `--compress` flag.
- **Smart Filtering**: Automatically honors `.gitignore` and supports a custom `.contextignore`.
- **AI-Ready**: Injects a structured system prompt at the top of every file to help the AI understand exactly how to assist you.
- **Clipboard First**: By default, it copies your context to the clipboard for instant pasting.

---

## Installation

Install globally using **pnpm** (preferred) or npm:

```bash
pnpm add -g @json-express/context-builder
# OR
npm install -g @json-express/context-builder
```

---

## Usage

Navigate to your project directory and run the tool. By default, it processes the current directory, generates `llm-context.md`, and copies the content to your clipboard.

```bash
context-builder
```

### Files & Directories
You can specify one or more **directories or individual files** as arguments:

```bash
# Mix and match folders and specific files
context-builder src/components README.md package.json
```

### Options

| Flag | Description |
| :--- | :--- |
| `-o, --out <dir>` | Output directory (defaults to `.`) |
| `-n, --name <file>`| Output filename (defaults to `llm-context.md`) |
| `-f, --format <fmt>`| Output format: `md`, `txt`, or `json` (defaults to `md`) |
| `-c, --compress`   | **Token Saver**: Strips comments and excess whitespace |
| `--copy`           | **Clipboard Only**: Skips file generation and only copies to clipboard |
| `-v, --version`    | Output version |
| `-h, --help`       | Display help |

### Examples

**1. Compress and save to a specific folder:**
```bash
context-builder src -o ./dist -n context.txt -f txt -c
```

**2. Direct-to-Clipboard (No file created):**
Ideal for small features where you just want to "grab and go" to ChatGPT.
```bash
context-builder src/utils/helper.js --copy
```

---

## Ignoring Files

### Automatic `.gitignore`
CONTEXT Builder automatically detects and respects your `.gitignore`. Files like `node_modules`, build artifacts, and secrets are excluded by default.

### Custom `.contextignore`
Sometimes you want a file in Git, but it's too big for an AI's memory (like a `pnpm-lock.yaml` or large SVGs). Create a `.contextignore` file in your root using standard glob patterns:

```text
# Keep in Git, but hide from AI
pnpm-lock.yaml
**/assets/*.svg
docs/legacy/
```

### Priority

CONTEXT Builder follows a specific priority logic to decide what makes it into your context:

1. **Explicit Arguments (Highest Priority)**: If you pass a specific file path as an argument (e.g., `context-builder config.json`), it will be included in the context even if it exists in a sub-folder that might otherwise be ignored.
2. **`.contextignore`**: Files matching patterns here will appear in the **Project Tree** (so the AI knows the file exists), but their **content will be hidden** to save tokens.
3. **`.gitignore`**: Files matching these patterns are completely excluded from both the tree and the content.

---

## Uninstallation

```bash
pnpm uninstall -g @json-express/context-builder
```
