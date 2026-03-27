import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve('./') // project root
const CLI = path.join(ROOT, 'dist/index.js')
const FIXTURE = path.join(ROOT, 'test/fixture')
const TMP = path.join(ROOT, 'test/tmp')

/** Run CLI from the fixture directory and capture stdout */
const runCLI = (args = '') => {
    return execSync(`node "${CLI}" ${args}`, {
        cwd: FIXTURE,
        encoding: 'utf8',
    })
}

beforeAll(() => {
    // Ensure a clean tmp output directory
    fs.mkdirSync(TMP, { recursive: true })
})

afterAll(() => {
    // Clean up tmp directory after tests
    fs.rmSync(TMP, { recursive: true, force: true })
})

// ---------------------------------------------------------------------------
// 1. No crash on . and no-arg invocations
// ---------------------------------------------------------------------------
describe('default invocation', () => {
    it('does not crash when run with "." (regression: TypeError: path must not be empty)', () => {
        expect(() => runCLI(`. -o "${TMP}" -n default-dot.md`)).not.toThrow()
    })

    it('does not crash when run with no path argument', () => {
        expect(() => runCLI(`-o "${TMP}" -n default-no-arg.md`)).not.toThrow()
    })
})

// ---------------------------------------------------------------------------
// 2. Output file is created and has content
// ---------------------------------------------------------------------------
describe('output file creation', () => {
    it('creates the output file', () => {
        runCLI(`. -o "${TMP}" -n out.md`)
        expect(fs.existsSync(path.join(TMP, 'out.md'))).toBe(true)
    })

    it('output file contains the file tree section', () => {
        runCLI(`. -o "${TMP}" -n out-tree.md`)
        const content = fs.readFileSync(path.join(TMP, 'out-tree.md'), 'utf8')
        expect(content).toContain('Project Tree')
    })

    it('output file contains a known source file path', () => {
        runCLI(`. -o "${TMP}" -n out-src.md`)
        const content = fs.readFileSync(path.join(TMP, 'out-src.md'), 'utf8')
        expect(content).toContain('src/hello.js')
    })
})

// ---------------------------------------------------------------------------
// 3. Ignore rules
// ---------------------------------------------------------------------------
describe('ignore rules', () => {
    it('excludes .gitignore-d files from output (.env)', () => {
        runCLI(`. -o "${TMP}" -n out-gitignore.md`)
        const content = fs.readFileSync(path.join(TMP, 'out-gitignore.md'), 'utf8')
        // .env is in fixture/.gitignore — should not appear anywhere
        expect(content).not.toContain('TOP_SECRET')

        // 2. Check that .env does NOT appear as a file in the Project Tree
        // (Searching for .env with tree characters or as a standalone file block)
        expect(content).not.toMatch(/├── .env/)
        expect(content).not.toMatch(/└── .env/)

        // 3. Check that there is no header for the .env file content
        expect(content).not.toContain('### .env')
    })

    it('shows .contextignore-d file in the tree but NOT in file contents', () => {
        runCLI(`. -o "${TMP}" -n out-contextignore.md`)
        const content = fs.readFileSync(path.join(TMP, 'out-contextignore.md'), 'utf8')
        // big-docs.txt should appear in the tree section
        expect(content).toContain('big-docs.txt')
        // but its content should NOT be dumped into the file
        expect(content).not.toContain('very large documentation file')
    })
})

// ---------------------------------------------------------------------------
// 4. Output formats
// ---------------------------------------------------------------------------
describe('--format option', () => {
    it('produces valid JSON with --format json', () => {
        runCLI(`. --format json -o "${TMP}" -n out.json`)
        const raw = fs.readFileSync(path.join(TMP, 'out.json'), 'utf8')
        const parsed = JSON.parse(raw) // throws if invalid JSON
        expect(parsed).toHaveProperty('trees')
        expect(parsed).toHaveProperty('files')
        expect(Array.isArray(parsed.files)).toBe(true)
    })

    it('produces plain-text separators with --format txt', () => {
        runCLI(`. --format txt -o "${TMP}" -n out.txt`)
        const content = fs.readFileSync(path.join(TMP, 'out.txt'), 'utf8')
        expect(content).toContain('========================================')
    })
})

// ---------------------------------------------------------------------------
// 5. --compress flag
// ---------------------------------------------------------------------------
describe('--compress flag', () => {
    it('produces a smaller file than without compression', () => {
        runCLI(`. -o "${TMP}" -n out-normal.md`)
        runCLI(`. --compress -o "${TMP}" -n out-compressed.md`)
        const normal = fs.statSync(path.join(TMP, 'out-normal.md')).size
        const compressed = fs.statSync(path.join(TMP, 'out-compressed.md')).size
        expect(compressed).toBeLessThan(normal)
    })
})

// ---------------------------------------------------------------------------
// 6. --copy flag (clipboard-only, no file created)
// ---------------------------------------------------------------------------
describe('--copy flag', () => {
    it('does not create an output file when --copy is used', () => {
        const outPath = path.join(TMP, 'should-not-exist.md')
        if (fs.existsSync(outPath)) fs.unlinkSync(outPath)

        try {
            runCLI(`. --copy -n should-not-exist.md`)
        } catch {
            // clipboard may fail in CI — that's acceptable, we only care about the file
        }

        expect(fs.existsSync(outPath)).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// 7. Specific path argument
// ---------------------------------------------------------------------------
describe('path argument', () => {
    it('scans only the specified subdirectory when given src/', () => {
        runCLI(`src -o "${TMP}" -n out-src-only.md`)
        const content = fs.readFileSync(path.join(TMP, 'out-src-only.md'), 'utf8')
        expect(content).toContain('hello.js')
        // big-docs.txt lives at the root, not in src/ — should not appear
        expect(content).not.toContain('big-docs.txt')
    })
})
