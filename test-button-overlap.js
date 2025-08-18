// Test script to identify button overlap issues in agent cards
console.log("Testing Button Overlap Issues");
console.log("============================");

const { AIDoctorAgents } = require('./shared/list.tsx');

// Calculate space allocation and identify potential overflow
const cardLayout = {
    totalHeight: 420,
    imageHeight: 230,
    contentHeight: 190,
    sections: {
        title: { allocated: 6 + 1 }, // h-6 + mt-1
        description: { allocated: 10 + 1 }, // h-10 + mt-1  
        tags: { allocated: 12 + 2 }, // h-12 + mt-2
        buttons: { allocated: 86 } // h-[86px]
    }
};

// Check if content sections might overflow
const upperContentSpace = cardLayout.sections.title.allocated + 
                          cardLayout.sections.description.allocated + 
                          cardLayout.sections.tags.allocated;

const availableFlexGrowSpace = cardLayout.contentHeight - cardLayout.sections.buttons.allocated;

console.log("Layout Analysis:");
console.log(`Content area height: ${cardLayout.contentHeight}px`);
console.log(`Upper content sections need: ${upperContentSpace}px`);
console.log(`Button area takes: ${cardLayout.sections.buttons.allocated}px`);
console.log(`Available flex-grow space: ${availableFlexGrowSpace}px`);

if (upperContentSpace > availableFlexGrowSpace) {
    console.log("\n❌ PROBLEM IDENTIFIED: Content sections exceed available space");
    console.log("This could cause content to overlap with buttons");
    console.log(`Overflow: ${upperContentSpace - availableFlexGrowSpace}px`);
} else {
    console.log("\n✅ Space allocation appears correct");
}

// Analyze agents with longest content that might cause overflow
console.log("\nAgents with potential overflow risks:");
AIDoctorAgents.forEach((agent, index) => {
    const titleLength = agent.specialist.length;
    const descLength = agent.description.length;
    const tagCount = agent.tags ? agent.tags.length : 0;
    
    // Risk factors: long titles, long descriptions, many tags
    if (titleLength > 20 || descLength > 65 || tagCount > 4) {
        console.log(`${index + 1}. ${agent.specialist}:`);
        console.log(`   Title: ${titleLength} chars`);
        console.log(`   Description: ${descLength} chars`);
        console.log(`   Tags: ${tagCount} items`);
    }
});

console.log("\nPotential Solutions:");
console.log("1. Ensure proper spacing between content and buttons");
console.log("2. Add proper z-index layering");
console.log("3. Adjust flex-grow behavior to prevent overlap");