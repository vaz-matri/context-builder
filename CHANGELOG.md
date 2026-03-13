# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.5] - 2026-03-14

### Added
- CLI arg parsing via Commander
- Support for positional directories e.g. `context-builder src views`
- Support `--out`, `-o` directory cli option (defaults to `.`)
- Support `--name`, `-n` filename cli option (defaults to `llm-context.md`)
- Support `--format`, `-f` format cli option (`md`, `txt`, `json` - defaults to `md`)
- Support `--compress`, `-c` flag to optimize generated token count by aggressively stripping comments and excess whitespace
- Support `--version`, `-v` flag
- Added descriptive AI prompt mapping out codebase context, tool version, and omitted files info

### Updated
- **Breaking Change**: Default output file is now `llm-context.md` (was `project-context.txt`)
- context-ignored files no longer appear in the detailed output section (only the tree structure)
- Optimized output content and improved AI context
- Updated keywords payload in `package.json`

## [0.1.4] - 2025-12-19

### Added
- added `.contextignore` to ignore files and folders

### Updated
- Updated ReadMe with context ignore

## [0.1.3] - 2025-10-29

### Added
- added `ReadMe.md`
- added `DeveloperGuide.md`

## [0.1.2] - 2025-10-21

### Added
- made sure it's built before publishing

### Fixed
- logo broken in npm page

## [0.1.1] - 2025-10-01

### Updated
- publish only dist to reduce npm package size

### Changed
- context output file is renamed to `project-context.txt`

## [0.1.0] - 2025-09-29

### Created
- simple project level `context-builder` cli tool
