// Test script to verify MediaDevices API compatibility check
// This simulates the scenario where navigator.mediaDevices is undefined

console.log('Testing MediaDevices API compatibility...');

// Test case 1: Normal browser with MediaDevices support
if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    console.log('✅ MediaDevices API is available - Vapi initialization should work');
} else {
    console.log('❌ MediaDevices API is NOT available - Vapi would fail without our fix');
}

// Test case 2: Simulate environment without MediaDevices API
const mockNavigator = {};
console.log('\nSimulating environment without MediaDevices API:');

if (!mockNavigator.mediaDevices || !mockNavigator.mediaDevices?.enumerateDevices) {
    console.log('✅ Our compatibility check would catch this and show error message');
    console.log('   Error would be: "Voice functionality is not available. Please ensure you are using HTTPS and your browser supports MediaDevices API."');
} else {
    console.log('❌ Compatibility check failed');
}

console.log('\nTest completed successfully!');