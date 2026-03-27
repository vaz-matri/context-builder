# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.7] - 2026-03-28

### Added
- **Explicit Path Overrides**: Files and folders specifically passed as CLI arguments now bypass `.gitignore` and `.contextignore` rules, allowing users to force-include specific assets.
- **Test Suite**: Added comprehensive unit and integration tests for core logic, CLI execution, and the new override feature.

### Changed
- **AI System Prompt**: Refined the prompt injected at the top of context files with structured markdown and explicit instructions for the LLM regarding data structure and exclusion rules.
- **Traversal Logic**: Updated directory scanning to distinguish between top-level user-specified paths and recursively discovered sub-items to ensure ignore rules are only bypassed when intended.
- **Test Assertions**: Improved integration test logic to prevent "false positive" failures caused by ignored filenames (like `.env`) appearing inside the text content of other files.

### Fixed
- **CLI Crash**: Fixed `TypeError: path must not be empty` error occurring when running `context-builder` on the current directory (`.`).

## [0.2.2] - 2026-03-26

### Added
- **File Support**: Added support for parsing individual files in addition to directories.

## [0.2.1] - 2026-03-15

### Fixed
- **Multi-path Parsing**: Resolved an issue where specifying multiple starting directories would not parse correctly.

## [0.2.0] - 2026-03-14

### Added
- **Multi-path Input**: Ability to supply multiple root folders to scan (e.g., `context-builder src views`).
- **CLI Options**: Added `--out` (directory), `--name` (filename), and `--format` (md, txt, json) for better output control.
- **Token Optimization**: Added `--compress` flag to strip comments and excess whitespace to reduce context window usage.
- **Clipboard Integration**: Support for `--copy` flag to load the parsed codebase directly into the clipboard via `clipboardy`.
- **Context Metadata**: Added descriptive AI prompt mapping out codebase context, tool version, and omitted files info.

### Changed
- **Breaking Change**: Default output file renamed to `llm-context.md` (previously `project-context.txt`).
- **Exclusion Logic**: Context-ignored files no longer appear in the content section (visible in the tree structure only).
- **Package Metadata**: Updated `package.json` keywords and descriptions for better NPM discoverability.

## [0.1.4] - 2025-12-19

### Added
- **Context Exclusions**: Introduced `.contextignore` file support to manually exclude specific files and folders from the content section.

### Changed
- **Documentation**: Updated `README.md` with detailed instructions on using `.contextignore`.

## [0.1.3] - 2025-10-29

### Added
- **Documentation**: Initial `README.md` and `DeveloperGuide.md`.

## [0.1.2] - 2025-10-21

### Changed
- **Release Workflow**: Improved the CI/CD workflow to ensure a fresh build is generated before publishing to NPM.

### Fixed
- **Assets**: Fixed broken logo rendering on the NPM package page.

## [0.1.1] - 2025-10-01

### Changed
- **Default Naming**: Renamed default output file to `project-context.txt`.
- **NPM Optimization**: Reduced package size by only publishing the `dist/` directory and excluding source files.

## [0.1.0] - 2025-09-29

### Added
- **Initial Release**: Core logic for directory scanning, `.gitignore` support, and basic text output.
