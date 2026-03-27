/**
 * Compresses file content by stripping comments and collapsing blank lines.
 * @param {string} content - Raw file content
 * @param {string} ext - File extension (without dot)
 * @param {boolean} isCompress - Whether compression is enabled
 * @returns {string}
 */
export const compressContent = (content, ext, isCompress) => {
    if (!isCompress) return content

    let compressed = content

    const cLikeExtensions = ['js', 'jsx', 'ts', 'tsx', 'java', 'c', 'cpp', 'cs', 'go', 'php', 'swift', 'kt']
    const hashExtensions = ['py', 'rb', 'yaml', 'yml', 'sh', 'pl', 'r']
    const htmlExtensions = ['html', 'xml', 'vue', 'svelte', 'svg']

    if (cLikeExtensions.includes(ext)) {
        // Remove multi-line comments
        compressed = compressed.replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove single-line comments safely
        compressed = compressed.replace(/(^\s*|\s+)\/\/.*$/gm, '')
    } else if (hashExtensions.includes(ext)) {
        // Remove Python/Ruby style comments
        compressed = compressed.replace(/(^\s*|\s+)#.*$/gm, '')
    } else if (htmlExtensions.includes(ext)) {
        // Remove HTML comments
        compressed = compressed.replace(/<!--[\s\S]*?-->/g, '')
    }

    // Remove excessive blank lines for all files
    compressed = compressed.replace(/\n\s*\n/g, '\n')

    return compressed.trim()
}
