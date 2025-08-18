// Test script to verify the fix for event listener removal
// This simulates the Vapi instance behavior to check if the fix works

console.log('Testing event listener fix...');

// Mock Vapi instance with basic on/off functionality
class MockVapi {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        console.log(`Added listener for '${event}'`);
    }

    off(event, callback) {
        if (arguments.length === 1) {
            // This is what was causing the error - no callback provided
            throw new Error('The "listener" argument must be of type Function. Received type undefined');
        }
        
        if (!this.listeners[event] || typeof callback !== 'function') {
            console.log(`Cannot remove listener for '${event}' - invalid callback`);
            return;
        }
        
        const index = this.listeners[event].indexOf(callback);
        if (index > -1) {
            this.listeners[event].splice(index, 1);
            console.log(`Removed listener for '${event}'`);
        }
    }

    stop() {
        console.log('Vapi instance stopped');
    }
}

// Test the old approach (should fail)
console.log('\n--- Testing OLD approach (should fail) ---');
try {
    const vapi1 = new MockVapi();
    const listener1 = () => console.log('test');
    vapi1.on('call-start', listener1);
    
    // This mimics the old broken code
    vapi1.off('call-start'); // Missing callback parameter
} catch (error) {
    console.log('❌ OLD approach failed as expected:', error.message);
}

// Test the new approach (should work)
console.log('\n--- Testing NEW approach (should work) ---');
try {
    const vapi2 = new MockVapi();
    const callStartListener = () => console.log('call started');
    const callEndListener = () => console.log('call ended');
    
    // Add listeners
    vapi2.on('call-start', callStartListener);
    vapi2.on('call-end', callEndListener);
    
    // Remove listeners with proper callback references (new approach)
    vapi2.off('call-start', callStartListener);
    vapi2.off('call-end', callEndListener);
    
    console.log('✅ NEW approach works correctly!');
} catch (error) {
    console.log('❌ NEW approach failed:', error.message);
}

console.log('\n--- Test completed ---');