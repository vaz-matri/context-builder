# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.7] - wip

### Added
- Unit and Integration test suites for core logic and CLI execution.

### Changed
- Refined the AI system prompt injected at the top of generated context files. Now uses structured markdown with explicit instructions for the LLM regarding data structure, exclusion rules, and handling of missing file contents.

### Fixed
- Fixed `TypeError: path must not be empty` crash when running `context-builder` on the current directory (`.`). The `ignore` check is now correctly skipped when `path.relative()` returns an empty string.

## [0.2.2] - 2026-03-26

### Added
- Support for parsing individual files in addition to directories.

## [0.2.1] - 2026-03-15

### Fixed
- Resolved an issue with parsing multiple starting directories.

## [0.2.0] - 2026-03-14

### Added
- Ability to supply multiple root folders to scan (e.g., `context-builder src views`).
- Support for `--out`, `-o` directory option (defaults to `.`).
- Support for `--name`, `-n` filename option (defaults to `llm-context.md`).
- Support for `--format`, `-f` output formats (`md`, `txt`, `json`).
- Support for `--compress`, `-c` flag to strip comments and excess whitespace for token optimization.
- Support for `--copy` flag to load the parsed codebase directly into the clipboard via `clipboardy`.
- Support for `--version`, `-v` flag.
- Added descriptive AI prompt mapping out codebase context, tool version, and omitted files info.

### Changed
- **Breaking Change**: Default output file is now `llm-context.md` (previously `project-context.txt`).
- Context-ignored files no longer appear in the detailed output section (they remain visible in the tree structure only).
- Optimized output content and improved AI context clarity.
- Updated `package.json` keywords for better discoverability.

## [0.1.4] - 2025-12-19

### Added
- Introduced `.contextignore` file support to manually exclude specific files and folders.

### Changed
- Updated `README.md` with detailed instructions on using `.contextignore`.

## [0.1.3] - 2025-10-29

### Added
- Initial `README.md` and `DeveloperGuide.md`.

## [0.1.2] - 2025-10-21

### Changed
- Improved the release workflow to ensure a fresh build is generated before publishing.

### Fixed
- Fixed broken logo rendering on the NPM package page.

## [0.1.1] - 2025-10-01

### Changed
- Renamed default output file to `project-context.txt`.
- Optimized NPM package size by only publishing the `dist/` directory.

## [0.1.0] - 2025-09-29

### Added
- Initial release of the `context-builder` CLI tool.
