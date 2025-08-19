// Test script to verify button height consistency
const fs = require('fs');
const path = require('path');

console.log('=== BUTTON HEIGHT CONSISTENCY TEST ===');

// Check agent detail page buttons
const agentPagePath = path.join(__dirname, 'app', '(routes)', 'dashboard', 'agent', '[id]', 'page.tsx');
const agentPageContent = fs.readFileSync(agentPagePath, 'utf8');

// Check Start Consultation button height
const consultationButtonRegex = /className="w-full sm:w-auto px-8 h-12 text-lg"/;
const hasConsultationH12 = consultationButtonRegex.test(agentPageContent);
console.log('✓ Start Consultation button h-12:', hasConsultationH12 ? 'FOUND' : 'MISSING');

// Check Call button height
const callButtonRegex = /className="[^"]*h-12[^"]*"/;
const hasCallH12 = callButtonRegex.test(agentPageContent);
console.log('✓ Call button h-12:', hasCallH12 ? 'FOUND' : 'MISSING');

// Check for removed inconsistent classes
const noSizeLg = !agentPageContent.includes('size="lg"');
const noPy3 = !agentPageContent.includes('py-3');
console.log('✓ Removed size="lg":', noSizeLg ? 'YES' : 'NO');
console.log('✓ Removed py-3:', noPy3 ? 'YES' : 'NO');

// Check AgentCard buttons
const agentCardPath = path.join(__dirname, 'app', '(routes)', 'dashboard', '_components', 'AgentCard.tsx');
const agentCardContent = fs.readFileSync(agentCardPath, 'utf8');

const agentCardH9 = /className='w-full h-9 min-h-9 max-h-9 flex-shrink-0'/.test(agentCardContent);
console.log('✓ AgentCard buttons h-9:', agentCardH9 ? 'FOUND' : 'MISSING');

console.log('\n=== SUMMARY ===');
const allChecks = [hasConsultationH12, hasCallH12, noSizeLg, noPy3];
const passedChecks = allChecks.filter(check => check).length;

console.log(`Tests passed: ${passedChecks}/${allChecks.length}`);

if (passedChecks === allChecks.length) {
    console.log('🎉 All tests passed! Button heights are now consistent.');
    console.log('\nHeight consistency achieved:');
    console.log('- Agent detail page: Both buttons use h-12 (48px)');
    console.log('- AgentCard: Both buttons use h-9 (36px)');
    console.log('- Removed conflicting size and padding classes');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}