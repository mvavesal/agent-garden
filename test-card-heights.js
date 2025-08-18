// Test script to verify agent card heights
console.log("Testing Agent Card Heights");
console.log("========================");

const { AIDoctorAgents } = require('./shared/list.tsx');

// Analyze the variation in content that might affect card heights
console.log("Agent Content Analysis:");
console.log("Number of agents:", AIDoctorAgents.length);
console.log("\nDescription lengths:");

AIDoctorAgents.forEach((agent, index) => {
    const descLength = agent.description.length;
    const tagCount = agent.tags ? agent.tags.length : 0;
    
    console.log(`${index + 1}. ${agent.specialist}:`);
    console.log(`   Description: ${descLength} chars - "${agent.description}"`);
    console.log(`   Tags: ${tagCount} tags - [${agent.tags ? agent.tags.join(', ') : 'none'}]`);
    console.log();
});

// Find min/max description lengths
const descLengths = AIDoctorAgents.map(agent => agent.description.length);
const tagCounts = AIDoctorAgents.map(agent => agent.tags ? agent.tags.length : 0);

console.log("Summary:");
console.log(`Description lengths: ${Math.min(...descLengths)} - ${Math.max(...descLengths)} characters`);
console.log(`Tag counts: ${Math.min(...tagCounts)} - ${Math.max(...tagCounts)} tags`);
console.log("\nVariation in content suggests cards may appear to have different heights");
console.log("despite fixed container height due to internal content layout differences.");