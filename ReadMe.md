# <img src="logo/logo_long_desc_bg_white.svg" alt="CONTEXT Builder">

## What is CONTEXT Builder?

CONTEXT Builder is a CLI tool that helps developers prepare their codebase as context for AI assistants. When working with AI-powered IDEs or co-pilots, your code needs to be formatted properly to be understood by AI tools. However, if you prefer to stick with your favorite code editor rather than switching to an AI-powered IDE, preparing this context manually can be tedious and time-consuming.

CONTEXT Builder solves this problem by automatically converting your codebase into a format that's optimized for AI consumption. Once prepared, you can easily upload this context to your favorite AI tool (like ChatGPT, Claude, or others) and start asking questions about your code, getting suggestions, or debugging issues—all without leaving your preferred development environment.

## Installation

Install CONTEXT Builder globally using pnpm:

```bash
pnpm i -g @json-express/context-builder
```

## Usage

Navigate to your project directory and run the tool:

```bash
cd project-dir
context-builder
```

The tool will process your codebase and generate the context file (`project-context.txt`) that you can upload to your AI assistant.

## Ignoring Files

By default, CONTEXT Builder automatically respects your `.gitignore` file. Any files or folders ignored by Git will not be included in the generated context.

### Using `.contextignore`

Sometimes, you might want to keep certain files in your Git repository but exclude them from the AI context (for example: large documentation files, lock files, or asset metadata that might consume too many tokens).

You can create a `.contextignore` file in your root directory. This file uses the **same pattern syntax as `.gitignore`**.

**Example `.contextignore`:**
```text
# Exclude heavy documentation
/docs/legacy-manuals/

# Exclude specific files
package-lock.json
pnpm-lock.yaml

# Exclude all .svg files from context
**/*.svg
```

## Uninstallation

To remove CONTEXT Builder from your system:

```bash
pnpm uninstall -g @json-express/context-builder
```
