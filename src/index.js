import fs from 'fs'
import path from 'path'
import ignore from 'ignore'

const startingDirectory = '.'
const outputFilePath = './project-context.txt'

// --- Ignore Logic Setup ---

// 1. gitIg: For full exclusion from tree and content
const gitIg = ignore()

// Add default and .gitignore rules
const gitignorePath = '.gitignore'
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
    gitIg.add(gitignoreContent)
}
gitIg.add('node_modules')
gitIg.add(path.basename(outputFilePath))
gitIg.add('.git')

// 2. contextIg: For content-only exclusion
const contextIg = ignore()
const contextIgnorePath = '.contextignore'
if (fs.existsSync(contextIgnorePath)) {
    const contextIgnoreContent = fs.readFileSync(contextIgnorePath, 'utf8')
    contextIg.add(contextIgnoreContent)
}

// --- Main Script Logic ---

try {
    fs.writeFileSync(outputFilePath, '')
} catch (err) {
    console.error(`Error clearing output file: ${err.message}`)
}

const generateTree = (dir, prefix = '') => {
    const allFiles = fs.readdirSync(dir)
    // The tree is only affected by .gitignore rules
    const allowedFiles = allFiles.filter(file => !gitIg.ignores(path.join(dir, file)))

    let tree = ''
    allowedFiles.forEach((file, index) => {
        const filePath = path.join(dir, file)
        const isLast = index === allowedFiles.length - 1
        const connector = isLast ? '└── ' : '├── '

        tree += `${prefix}${connector}${file}\n`

        if (fs.statSync(filePath).isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ')
            tree += generateTree(filePath, newPrefix)
        }
    })
    return tree
}

const readDirectoryAndWriteToFile = (directoryPath) => {
    const files = fs.readdirSync(directoryPath)

    files.forEach(file => {
        const filePath = path.join(directoryPath, file)

        // First, check for full exclusion from .gitignore
        if (gitIg.ignores(filePath)) {
            return
        }

        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            readDirectoryAndWriteToFile(filePath)
        } else if (stat.isFile()) {
            let outputContent

            // Next, check for content-only exclusion from .contextignore
            if (contextIg.ignores(filePath)) {
                // If context-ignored, just list the file path
                outputContent = `${filePath}\n\n`
            } else {
                // Otherwise, list the path and the content
                const content = fs.readFileSync(filePath, 'utf8')
                outputContent = `${filePath}\n\`\`\`\n${content}\n\`\`\`\n\n`
            }
            fs.appendFileSync(outputFilePath, outputContent)
        }
    })
}

// --- Execution ---

console.log('Generating file tree and content...')

// 1. Generate and write the tree structure (respects .gitignore)
const treeStructure = generateTree(startingDirectory)
fs.appendFileSync(outputFilePath, path.basename(startingDirectory) + '\n' + treeStructure + '\n\n')

// 2. Read and write file content (respects both .gitignore and .contextignore)
readDirectoryAndWriteToFile(startingDirectory)

console.log(`Processing complete. The output has been written to ${outputFilePath}`)
