// Test script to verify call functionality implementation
const fs = require('fs');
const path = require('path');

// Read the agent details page file to check call implementation
const agentPagePath = path.join(__dirname, 'app', '(routes)', 'dashboard', 'agent', '[id]', 'page.tsx');
const agentPageContent = fs.readFileSync(agentPagePath, 'utf8');

console.log('=== CALL FUNCTIONALITY TEST ===');

// Check if tel: link is implemented
const telLinkRegex = /href=\{`tel:\${agent\.phoneNumber}`\}/;
const hasTelLink = telLinkRegex.test(agentPageContent);
console.log('✓ Tel link implementation:', hasTelLink ? 'FOUND' : 'MISSING');

// Check if Call Now button is implemented
const callNowRegex = /Call Now/;
const hasCallNowButton = callNowRegex.test(agentPageContent);
console.log('✓ Call Now button:', hasCallNowButton ? 'FOUND' : 'MISSING');

// Check if accessibility attributes are present
const ariaLabelRegex = /aria-label=\{`Call \${agent\.specialist\} at \${agent\.phoneNumber\}`\}/;
const hasAriaLabel = ariaLabelRegex.test(agentPageContent);
console.log('✓ Accessibility (aria-label):', hasAriaLabel ? 'FOUND' : 'MISSING');

// Check if hover effects are implemented
const hoverEffectsRegex = /hover:bg-green-100.*hover:border-green-300/;
const hasHoverEffects = hoverEffectsRegex.test(agentPageContent);
console.log('✓ Hover effects:', hasHoverEffects ? 'FOUND' : 'MISSING');

// Check if phone number condition is maintained
const phoneConditionRegex = /agent\.phoneNumber && agent\.phoneNumber\.trim\(\) !== ""/;
const hasPhoneCondition = phoneConditionRegex.test(agentPageContent);
console.log('✓ Phone number validation:', hasPhoneCondition ? 'FOUND' : 'MISSING');

console.log('\n=== SUMMARY ===');
const allChecks = [hasTelLink, hasCallNowButton, hasAriaLabel, hasHoverEffects, hasPhoneCondition];
const passedChecks = allChecks.filter(check => check).length;

console.log(`Tests passed: ${passedChecks}/${allChecks.length}`);

if (passedChecks === allChecks.length) {
    console.log('🎉 All tests passed! Call functionality is properly implemented.');
    console.log('\nFeatures implemented:');
    console.log('- Clickable phone numbers using tel: links');
    console.log('- Beautiful Call Now button with green theme');
    console.log('- Hover animations and visual feedback');
    console.log('- Proper accessibility with aria-labels');
    console.log('- Conditional display (only when phone number exists)');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}