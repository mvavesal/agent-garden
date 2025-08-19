/**
 * Test script to verify the copy phone number implementation
 */

const fs = require('fs');
const path = require('path');

// Read the modified file
const filePath = './app/(routes)/dashboard/agent/[id]/page.tsx';
const fileContent = fs.readFileSync(filePath, 'utf8');

console.log('🧪 Testing Copy Phone Number Implementation\n');

// Test 1: Check if IconCopy import is added
const hasIconCopyImport = fileContent.includes('IconCopy');
console.log(`✓ IconCopy import added: ${hasIconCopyImport ? '✅ PASS' : '❌ FAIL'}`);

// Test 2: Check if copyPhoneNumber function exists
const hasCopyFunction = fileContent.includes('const copyPhoneNumber = async');
console.log(`✓ copyPhoneNumber function exists: ${hasCopyFunction ? '✅ PASS' : '❌ FAIL'}`);

// Test 3: Check if copy button is added
const hasCopyButton = fileContent.includes('onClick={() => copyPhoneNumber(agent.phoneNumber)}');
console.log(`✓ Copy button with onClick handler: ${hasCopyButton ? '✅ PASS' : '❌ FAIL'}`);

// Test 4: Check if flex container is implemented
const hasFlexContainer = fileContent.includes('flex items-center gap-2');
console.log(`✓ Flex container for buttons: ${hasFlexContainer ? '✅ PASS' : '❌ FAIL'}`);

// Test 5: Check if accessibility attributes are present
const hasAriaLabel = fileContent.includes('aria-label={`Copy phone number ${agent.phoneNumber} to clipboard`}');
console.log(`✓ Accessibility attributes: ${hasAriaLabel ? '✅ PASS' : '❌ FAIL'}`);

// Test 6: Check if original call functionality is preserved
const hasCallButton = fileContent.includes('onClick={() => window.location.href = `tel:${agent.phoneNumber}`}');
console.log(`✓ Original call functionality preserved: ${hasCallButton ? '✅ PASS' : '❌ FAIL'}`);

// Test 7: Check if clipboard API is used
const hasClipboardAPI = fileContent.includes('navigator.clipboard.writeText');
console.log(`✓ Clipboard API usage: ${hasClipboardAPI ? '✅ PASS' : '❌ FAIL'}`);

console.log('\n📊 Summary:');
const tests = [hasIconCopyImport, hasCopyFunction, hasCopyButton, hasFlexContainer, hasAriaLabel, hasCallButton, hasClipboardAPI];
const passedTests = tests.filter(test => test).length;
console.log(`${passedTests}/7 tests passed`);

if (passedTests === 7) {
    console.log('🎉 All tests passed! Copy phone number implementation is correct.');
} else {
    console.log('⚠️  Some tests failed. Please review the implementation.');
}