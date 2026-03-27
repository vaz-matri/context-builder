import { describe, it, expect } from 'vitest'
import { compressContent } from '../../src/utils.js'

describe('compressContent', () => {
    // --- No compression ---
    it('returns content unchanged when isCompress is false', () => {
        const input = 'const x = 1 // a comment\n\n\nconst y = 2'
        expect(compressContent(input, 'js', false)).toBe(input)
    })

    // --- JS / C-like ---
    describe('JS / C-like extensions', () => {
        it('strips single-line // comments', () => {
            const input = 'const x = 1 // inline comment\nconst y = 2'
            const result = compressContent(input, 'js', true)
            expect(result).not.toContain('//')
            expect(result).toContain('const x = 1')
            expect(result).toContain('const y = 2')
        })

        it('strips standalone // comment lines', () => {
            const input = '// This is a comment\nconst x = 1'
            const result = compressContent(input, 'ts', true)
            expect(result).not.toContain('//')
            expect(result).toContain('const x = 1')
        })

        it('strips multi-line /* */ comments', () => {
            const input = '/* block comment\n   spanning lines */\nconst x = 1'
            const result = compressContent(input, 'js', true)
            expect(result).not.toContain('block comment')
            expect(result).toContain('const x = 1')
        })

        it('works for tsx extension', () => {
            const input = '// comment\nreturn <div />'
            const result = compressContent(input, 'tsx', true)
            expect(result).not.toContain('//')
            expect(result).toContain('return <div />')
        })
    })

    // --- Python / hash-style ---
    describe('Python / hash-style extensions', () => {
        it('strips # comments from .py files', () => {
            const input = '# This is a comment\nx = 1 # inline'
            const result = compressContent(input, 'py', true)
            expect(result).not.toContain('#')
            expect(result).toContain('x = 1')
        })

        it('strips # comments from .rb files', () => {
            const input = '# Ruby comment\nputs "hello"'
            const result = compressContent(input, 'rb', true)
            expect(result).not.toContain('#')
            expect(result).toContain('puts "hello"')
        })

        it('strips # comments from .yml files', () => {
            const input = '# config\nname: myapp'
            const result = compressContent(input, 'yml', true)
            expect(result).not.toContain('#')
            expect(result).toContain('name: myapp')
        })
    })

    // --- HTML-like ---
    describe('HTML / markup extensions', () => {
        it('strips <!-- --> comments from .html files', () => {
            const input = '<!-- comment -->\n<p>hello</p>'
            const result = compressContent(input, 'html', true)
            expect(result).not.toContain('comment')
            expect(result).toContain('<p>hello</p>')
        })

        it('strips multi-line HTML comments', () => {
            const input = '<!--\n  multi-line\n  comment\n-->\n<div/>'
            const result = compressContent(input, 'html', true)
            expect(result).not.toContain('multi-line')
            expect(result).toContain('<div/>')
        })

        it('strips comments from .vue files', () => {
            const input = '<!-- vue comment -->\n<template><p>hi</p></template>'
            const result = compressContent(input, 'vue', true)
            expect(result).not.toContain('vue comment')
        })
    })

    // --- General whitespace ---
    describe('whitespace compression', () => {
        it('collapses multiple blank lines into one', () => {
            const input = 'line1\n\n\n\nline2'
            const result = compressContent(input, 'js', true)
            expect(result).not.toMatch(/\n{2,}/)
        })

        it('trims leading and trailing whitespace', () => {
            const input = '   \nconst x = 1\n   '
            const result = compressContent(input, 'js', true)
            expect(result).toBe('const x = 1')
        })

        it('does not alter unknown extensions (no comment stripping, only whitespace)', () => {
            const input = 'some content\n\n\nmore content'
            const result = compressContent(input, 'xyz', true)
            expect(result).toContain('some content')
            expect(result).toContain('more content')
            expect(result).not.toMatch(/\n{2,}/)
        })
    })
})
