// Test script to verify button consistency implementation
const fs = require('fs');
const path = require('path');

// Read the agent details page file to check button consistency
const agentPagePath = path.join(__dirname, 'app', '(routes)', 'dashboard', 'agent', '[id]', 'page.tsx');
const agentPageContent = fs.readFileSync(agentPagePath, 'utf8');

console.log('=== BUTTON CONSISTENCY TEST ===');

// Check if both buttons use the same base className
const baseClassRegex = /"w-full sm:w-auto px-8 h-12 text-lg"/g;
const matches = agentPageContent.match(baseClassRegex);
const hasSameBaseClass = matches && matches.length >= 2;
console.log('✓ Both buttons use same base class:', hasSameBaseClass ? 'YES' : 'NO');

// Check if Start Consultation button uses default variant (no variant prop)
const startConsultationButtonRegex = /<Button\s+className="w-full sm:w-auto px-8 h-12 text-lg"\s+onClick={onStartConsultation}/;
const hasDefaultStartButton = startConsultationButtonRegex.test(agentPageContent);
console.log('✓ Start Consultation button uses default variant:', hasDefaultStartButton ? 'YES' : 'NO');

// Check if Call button uses default variant (no variant prop)
const callButtonRegex = /<Button\s+className="w-full sm:w-auto px-8 h-12 text-lg mt-3 sm:mt-0"\s+onClick/;
const hasDefaultCallButton = callButtonRegex.test(agentPageContent);
console.log('✓ Call button uses default variant:', hasDefaultCallButton ? 'YES' : 'NO');

// Check if outline variant is removed from Call button
const hasOutlineVariant = /variant="outline"/.test(agentPageContent);
console.log('✓ Outline variant removed:', !hasOutlineVariant ? 'YES' : 'NO');

// Check if custom emerald styling is removed
const hasCustomEmeraldStyling = /border-emerald-600|hover:bg-emerald-100/.test(agentPageContent);
console.log('✓ Custom emerald styling removed:', !hasCustomEmeraldStyling ? 'YES' : 'NO');

// Check if both buttons maintain their functionality
const hasStartConsultationClick = /onClick={onStartConsultation}/.test(agentPageContent);
const hasCallClick = /onClick={\(\) => window\.location\.href = `tel:\${agent\.phoneNumber}`}/.test(agentPageContent);
console.log('✓ Start Consultation functionality maintained:', hasStartConsultationClick ? 'YES' : 'NO');
console.log('✓ Call functionality maintained:', hasCallClick ? 'YES' : 'NO');

// Check if Call button maintains proper conditional display
const hasConditionalDisplay = /agent\.phoneNumber && agent\.phoneNumber\.trim\(\) !== ""/.test(agentPageContent);
console.log('✓ Call button conditional display maintained:', hasConditionalDisplay ? 'YES' : 'NO');

console.log('\n=== SUMMARY ===');
const allChecks = [hasSameBaseClass, hasDefaultStartButton, hasDefaultCallButton, !hasOutlineVariant, !hasCustomEmeraldStyling, hasStartConsultationClick, hasCallClick, hasConditionalDisplay];
const passedChecks = allChecks.filter(check => check).length;

console.log(`Tests passed: ${passedChecks}/${allChecks.length}`);

if (passedChecks === allChecks.length) {
    console.log('🎉 All tests passed! Both buttons now have identical styling.');
    console.log('\nConsistency achieved:');
    console.log('- Both buttons use default variant (no outline)');
    console.log('- Both buttons have identical base styling: w-full sm:w-auto px-8 h-12 text-lg');
    console.log('- Removed custom emerald colors and styling differences');
    console.log('- Both buttons maintain their original functionality');
    console.log('- Call button maintains conditional display logic');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}