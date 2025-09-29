import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        ssr: true,
        lib: {
            entry: './src/index.js',
            formats: ['es', 'cjs'],
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
    },
    ssr: {
        noExternal: ['ignore']
    }
})
