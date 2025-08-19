// Test script to verify phone number display functionality
const fs = require('fs');
const path = require('path');

// Read the shared list file to check agent phone numbers
const listPath = path.join(__dirname, 'shared', 'list.tsx');
const listContent = fs.readFileSync(listPath, 'utf8');

// Extract phone numbers from the list
const phoneNumberRegex = /phoneNumber:\s*"([^"]*)"/g;
let match;
const phoneNumbers = [];

while ((match = phoneNumberRegex.exec(listContent)) !== null) {
    phoneNumbers.push(match[1]);
}

console.log('=== AGENT PHONE NUMBERS TEST ===');
console.log('Total phone number entries found:', phoneNumbers.length);
console.log('\nPhone numbers:');
phoneNumbers.forEach((phone, index) => {
    console.log(`Agent ${index + 1}: ${phone === '' ? '(empty)' : phone}`);
});

console.log('\n=== SUMMARY ===');
const emptyCount = phoneNumbers.filter(phone => phone === '').length;
const nonEmptyCount = phoneNumbers.filter(phone => phone !== '').length;

console.log(`Agents with phone numbers: ${nonEmptyCount}`);
console.log(`Agents without phone numbers: ${emptyCount}`);
console.log('\n✅ Test completed. Phone numbers should display for agents with non-empty phoneNumber values.');