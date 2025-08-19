// Test script to verify Lucide phone icon and normal button styling implementation
const fs = require('fs');
const path = require('path');

// Read the agent details page file to check implementation
const agentPagePath = path.join(__dirname, 'app', '(routes)', 'dashboard', 'agent', '[id]', 'page.tsx');
const agentPageContent = fs.readFileSync(agentPagePath, 'utf8');

console.log('=== LUCIDE PHONE ICON & NORMAL STYLING TEST ===');

// Check if Lucide Phone icon is imported
const phoneImportRegex = /import.*Phone.*from 'lucide-react'/;
const hasPhoneImport = phoneImportRegex.test(agentPageContent);
console.log('✓ Lucide Phone icon import:', hasPhoneImport ? 'FOUND' : 'MISSING');

// Check if Phone icon is used instead of custom SVG
const phoneIconUsageRegex = /<Phone className="mr-2 h-4 w-4" \/>/;
const hasPhoneIconUsage = phoneIconUsageRegex.test(agentPageContent);
console.log('✓ Phone icon usage:', hasPhoneIconUsage ? 'FOUND' : 'MISSING');

// Check if custom SVG is removed
const customSvgRegex = /<svg.*viewBox="0 0 20 20">/;
const hasCustomSvg = customSvgRegex.test(agentPageContent);
console.log('✓ Custom SVG removed:', !hasCustomSvg ? 'YES' : 'NO');

// Check if normal Button component is used
const normalButtonRegex = /<Button[^>]*variant="outline"/;
const hasNormalButton = normalButtonRegex.test(agentPageContent);
console.log('✓ Normal Button component:', hasNormalButton ? 'FOUND' : 'MISSING');

// Check if custom styling is removed
const customStylingRegex = /bg-green-700|hover:bg-green-800|border-green-700/;
const hasCustomStyling = customStylingRegex.test(agentPageContent);
console.log('✓ Custom styling removed:', !hasCustomStyling ? 'YES' : 'NO');

// Check if tel: functionality is maintained
const telFunctionalityRegex = /window\.location\.href = `tel:\${agent\.phoneNumber}`/;
const hasTelFunctionality = telFunctionalityRegex.test(agentPageContent);
console.log('✓ Tel functionality maintained:', hasTelFunctionality ? 'YES' : 'NO');

// Check if phone number condition is maintained
const phoneConditionRegex = /agent\.phoneNumber && agent\.phoneNumber\.trim\(\) !== ""/;
const hasPhoneCondition = phoneConditionRegex.test(agentPageContent);
console.log('✓ Phone number validation:', hasPhoneCondition ? 'FOUND' : 'MISSING');

console.log('\n=== SUMMARY ===');
const allChecks = [hasPhoneImport, hasPhoneIconUsage, !hasCustomSvg, hasNormalButton, !hasCustomStyling, hasTelFunctionality, hasPhoneCondition];
const passedChecks = allChecks.filter(check => check).length;

console.log(`Tests passed: ${passedChecks}/${allChecks.length}`);

if (passedChecks === allChecks.length) {
    console.log('🎉 All tests passed! Lucide phone icon and normal styling implemented correctly.');
    console.log('\nFeatures implemented:');
    console.log('- Standard Lucide Phone icon instead of custom SVG');
    console.log('- Normal Button component with outline variant');
    console.log('- Removed all custom styling and colors');
    console.log('- Maintained phone call functionality via tel: links');
    console.log('- Proper conditional display logic');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}