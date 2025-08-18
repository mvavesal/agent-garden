// Test script to verify tag filtering behavior
// This simulates the logic implemented in AgentSearch.tsx

const mockAgents = [
    {
        id: 1,
        specialist: "Cardiologist",
        description: "Heart specialist",
        subscriptionRequired: false,
        tags: ["heart", "cardiology", "chest-pain"]
    },
    {
        id: 2,
        specialist: "Dermatologist", 
        description: "Skin specialist",
        subscriptionRequired: true,
        tags: ["skin", "dermatology", "acne"]
    },
    {
        id: 3,
        specialist: "General Practitioner",
        description: "General medicine",
        subscriptionRequired: false,
        tags: ["general", "medicine", "consultation"]
    },
    {
        id: 4,
        specialist: "Neurologist",
        description: "Brain and nerve specialist",
        subscriptionRequired: true,
        tags: ["brain", "neurology", "headache"]
    }
];

// Simulate the new allTags logic
function getAllTags(agents, debounced = "", tier = "all") {
    // First filter agents by search and tier (excluding tag filters)
    let filteredForTags = agents;
    
    if (debounced) {
        const q = debounced.toLowerCase();
        filteredForTags = filteredForTags.filter(
            (a) =>
                a.specialist.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q)
        );
    }
    
    if (tier !== "all") {
        filteredForTags = filteredForTags.filter((a) => (tier === "free" ? !a.subscriptionRequired : a.subscriptionRequired));
    }
    
    // Then collect tags only from the filtered agents
    const set = new Set();
    for (const a of filteredForTags) {
        a.tags?.forEach((t) => set.add(t));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

console.log("🧪 Testing tag filtering logic...\n");

// Test 1: All agents, no filters
console.log("Test 1 - No filters (should show all tags):");
console.log("Tags:", getAllTags(mockAgents));
console.log("Expected: All 12 unique tags\n");

// Test 2: Search for "heart" 
console.log("Test 2 - Search 'heart' (should only show cardiologist tags):");
console.log("Tags:", getAllTags(mockAgents, "heart"));
console.log("Expected: ['cardiology', 'chest-pain', 'heart']\n");

// Test 3: Filter by free tier only
console.log("Test 3 - Free tier only (should show tags from free agents):");
console.log("Tags:", getAllTags(mockAgents, "", "free"));
console.log("Expected: Tags from Cardiologist and GP only\n");

// Test 4: Filter by premium tier only
console.log("Test 4 - Premium tier only (should show tags from premium agents):");
console.log("Tags:", getAllTags(mockAgents, "", "premium"));
console.log("Expected: Tags from Dermatologist and Neurologist only\n");

// Test 5: Search "skin" + premium tier
console.log("Test 5 - Search 'skin' + Premium tier:");
console.log("Tags:", getAllTags(mockAgents, "skin", "premium"));
console.log("Expected: ['acne', 'dermatology', 'skin']\n");

// Test 6: Search that returns no results
console.log("Test 6 - Search 'xyz' (no matches):");
console.log("Tags:", getAllTags(mockAgents, "xyz"));
console.log("Expected: [] (empty array)\n");

console.log("✅ Test completed! The tag filtering logic should now only show tags from currently filtered agents.");