// Test script to reproduce the nested button issue
// This script will search for Button components inside DialogClose without asChild prop

const fs = require('fs');
const path = require('path');

function searchForNestedButtons(dirPath) {
    const results = [];
    
    function searchInFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            
            let insideDialogClose = false;
            let dialogCloseStartLine = 0;
            let braceCount = 0;
            
            lines.forEach((line, index) => {
                const trimmedLine = line.trim();
                
                // Check for DialogClose opening tag
                if (trimmedLine.includes('<DialogClose') && !trimmedLine.includes('</DialogClose>')) {
                    insideDialogClose = true;
                    dialogCloseStartLine = index + 1;
                    braceCount = 1;
                } else if (insideDialogClose) {
                    // Count opening and closing tags/braces to track nesting
                    const openTags = (line.match(/<[^\/][^>]*>/g) || []).length;
                    const closeTags = (line.match(/<\/[^>]*>/g) || []).length;
                    braceCount += openTags - closeTags;
                    
                    // Check for Button component without asChild
                    if (trimmedLine.includes('<Button') && !trimmedLine.includes('asChild')) {
                        results.push({
                            file: filePath,
                            line: index + 1,
                            dialogCloseStart: dialogCloseStartLine,
                            issue: 'Button component inside DialogClose without asChild prop'
                        });
                    }
                    
                    // Check if we've closed the DialogClose
                    if (trimmedLine.includes('</DialogClose>') || braceCount <= 0) {
                        insideDialogClose = false;
                    }
                }
            });
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error.message);
        }
    }
    
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                walkDir(fullPath);
            } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
                searchInFile(fullPath);
            }
        });
    }
    
    walkDir(dirPath);
    return results;
}

console.log('🔍 Searching for nested button issues...\n');

const projectRoot = process.cwd();
const issues = searchForNestedButtons(projectRoot);

if (issues.length > 0) {
    console.log('❌ Found nested button issues:');
    issues.forEach(issue => {
        console.log(`\nFile: ${issue.file}`);
        console.log(`Line ${issue.line}: ${issue.issue}`);
        console.log(`DialogClose starts at line: ${issue.dialogCloseStart}`);
    });
} else {
    console.log('✅ No nested button issues found!');
}

console.log(`\n📊 Checked files in: ${projectRoot}`);