// Test script to check VAPI integration with different agents
const axios = require('axios');

// Test agents - free vs premium
const testAgents = [
    {
        id: 1,
        specialist: "General Physician",
        subscriptionRequired: false,
        voiceId: "will"
    },
    {
        id: 2,
        specialist: "Pediatrician",
        subscriptionRequired: true,
        voiceId: "chris"
    },
    {
        id: 19,
        specialist: "Travel Advisor",
        subscriptionRequired: false,
        voiceId: "Paige"
    }
];

async function testAgentSession(agent) {
    console.log(`\n=== Testing ${agent.specialist} (ID: ${agent.id}) ===`);
    console.log(`Subscription Required: ${agent.subscriptionRequired}`);
    console.log(`Voice ID: ${agent.voiceId}`);
    
    try {
        // Try to create a session
        const response = await axios.post('http://localhost:3000/api/session-chat', {
            notes: 'Test consultation',
            selectedDoctor: agent
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Session created successfully');
        console.log('Session ID:', response.data.sessionId);
        
        // Test if we can fetch the session
        const sessionResponse = await axios.get(`http://localhost:3000/api/session-chat?sessionId=${response.data.sessionId}`);
        console.log('✅ Session retrieved successfully');
        console.log('Selected Doctor Voice ID:', sessionResponse.data.selectedDoctor?.voiceId);
        
    } catch (error) {
        console.log('❌ Error occurred:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', error.response.data);
        } else {
            console.log('Network Error:', error.message);
        }
    }
}

async function runTests() {
    console.log('🧪 Testing VAPI Agent Integration');
    console.log('===================================');
    
    for (const agent of testAgents) {
        await testAgentSession(agent);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
    }
    
    console.log('\n🔍 Analysis:');
    console.log('- Check if all agents can create sessions');
    console.log('- Verify voice IDs are properly configured');
    console.log('- Look for subscription validation issues');
}

runTests().catch(console.error);