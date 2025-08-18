// Test script to verify agent categories are properly implemented
const { AIDoctorAgents } = require('./shared/list.tsx');

console.log('Testing Agent Categories Implementation...\n');

// Test 1: Verify all agents have category field
const agentsWithoutCategory = AIDoctorAgents.filter(agent => !agent.category);
if (agentsWithoutCategory.length > 0) {
    console.error('❌ Error: Found agents without category field:', agentsWithoutCategory.map(a => a.specialist));
} else {
    console.log('✅ All agents have category field');
}

// Test 2: Check category distribution
const categories = {};
AIDoctorAgents.forEach(agent => {
    if (!categories[agent.category]) {
        categories[agent.category] = [];
    }
    categories[agent.category].push(agent.specialist);
});

console.log('\n📊 Category Distribution:');
Object.keys(categories).forEach(category => {
    console.log(`${category}: ${categories[category].length} agents`);
    categories[category].forEach(specialist => {
        console.log(`  - ${specialist}`);
    });
});

// Test 3: Verify limited categories
const expectedCategories = ['Medical', 'Culinary', 'Health & Wellness', 'Professional Services'];
const actualCategories = Object.keys(categories).sort();
const expectedCategoriesSet = new Set(expectedCategories.sort());
const actualCategoriesSet = new Set(actualCategories);

if (JSON.stringify([...expectedCategoriesSet]) === JSON.stringify([...actualCategoriesSet])) {
    console.log('\n✅ Categories are properly limited to expected set');
} else {
    console.log('\n❌ Category mismatch:');
    console.log('Expected:', expectedCategories);
    console.log('Actual:', actualCategories);
}

console.log(`\n📈 Total agents: ${AIDoctorAgents.length}`);
console.log(`📋 Total categories: ${actualCategories.length}`);
console.log('\nTest completed!');