import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.js',
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            output: {
                banner: '#!/usr/bin/env node'
            }
        },
        target: 'node18',
        outDir: 'dist',
        emptyOutDir: true
    }
})
