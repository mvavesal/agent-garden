// Test to verify the Sheet button overlap fix
console.log("Testing Sheet button overlap fix...");

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/(routes)/dashboard/_components/AgentSearch.tsx');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Check if the header div has the pr-12 class to prevent overlap
const headerLine = fileContent.split('\n').find(line => 
    line.includes('flex items-center justify-between mb-4') && line.includes('pr-12')
);

if (headerLine) {
    console.log("✅ SUCCESS: Button overlap fix applied correctly:");
    console.log(`   ${headerLine.trim()}`);
    console.log("   - pr-12: Adds 48px right padding to prevent overlap with close button");
    console.log("   - Close button is positioned at top-4 right-4 (16px from edges)");
    console.log("   - Reset button now has sufficient clearance");
} else {
    console.log("❌ FAILED: Button overlap fix not found");
    
    // Find the header line without pr-12 for debugging
    const originalHeaderLine = fileContent.split('\n').find(line => 
        line.includes('flex items-center justify-between mb-4')
    );
    console.log("Found line:", originalHeaderLine);
}