// Simple test to verify the Sheet component has proper padding
console.log("Testing Sheet padding fix...");

// Read the AgentSearch.tsx file and check if padding classes are present
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/(routes)/dashboard/_components/AgentSearch.tsx');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Check if the SheetContent has the padding classes
const sheetContentLine = fileContent.split('\n').find(line => 
    line.includes('SheetContent') && line.includes('className')
);

if (sheetContentLine && sheetContentLine.includes('p-4') && sheetContentLine.includes('sm:p-6')) {
    console.log("✅ SUCCESS: Sheet padding classes found correctly applied:");
    console.log(`   ${sheetContentLine.trim()}`);
    console.log("   - p-4: Adds padding for small screens");
    console.log("   - sm:p-6: Adds larger padding for sm+ screens");
} else {
    console.log("❌ FAILED: Sheet padding classes not found");
    console.log("Found line:", sheetContentLine);
}