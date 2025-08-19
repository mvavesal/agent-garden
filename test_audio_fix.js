// Test script to verify audio configuration fix
const fs = require('fs');
const path = require('path');

// Read the session page file to check voice configuration
const sessionPagePath = path.join(__dirname, 'app', '(routes)', 'dashboard', 'agents', '[sessionId]', 'page.tsx');
const sessionPageContent = fs.readFileSync(sessionPagePath, 'utf8');

console.log('=== AUDIO CONFIGURATION FIX TEST ===');

// Check if voice provider is changed from playht to azure
const azureProviderRegex = /provider:\s*'azure'/;
const hasAzureProvider = azureProviderRegex.test(sessionPageContent);
console.log('✓ Voice provider changed to Azure:', hasAzureProvider ? 'YES' : 'NO');

// Check if PlayHT provider is removed
const playhtProviderRegex = /provider:\s*'playht'/;
const hasPlayhtProvider = playhtProviderRegex.test(sessionPageContent);
console.log('✓ PlayHT provider removed:', !hasPlayhtProvider ? 'YES' : 'NO');

// Check if default voiceId is updated to compatible one
const andrewVoiceRegex = /voiceId:\s*sessionDetail\.selectedAgent\?\.voiceId\s*\?\?\s*'andrew'/;
const hasAndrewVoice = andrewVoiceRegex.test(sessionPageContent);
console.log('✓ Default voiceId updated to andrew:', hasAndrewVoice ? 'YES' : 'NO');

// Check if VAPI configuration is still present
const vapiConfigRegex = /const vapi = new Vapi\(process\.env\.NEXT_PUBLIC_VAPI_API_KEY!\)/;
const hasVapiConfig = vapiConfigRegex.test(sessionPageContent);
console.log('✓ VAPI configuration maintained:', hasVapiConfig ? 'YES' : 'NO');

// Check if voice configuration structure is maintained
const voiceConfigRegex = /voice:\s*{\s*provider:\s*'azure',\s*voiceId:/;
const hasVoiceConfig = voiceConfigRegex.test(sessionPageContent);
console.log('✓ Voice configuration structure correct:', hasVoiceConfig ? 'YES' : 'NO');

console.log('\n=== SUMMARY ===');
const allChecks = [hasAzureProvider, !hasPlayhtProvider, hasAndrewVoice, hasVapiConfig, hasVoiceConfig];
const passedChecks = allChecks.filter(check => check).length;

console.log(`Tests passed: ${passedChecks}/${allChecks.length}`);

if (passedChecks === allChecks.length) {
    console.log('🎉 All tests passed! Audio configuration fix implemented successfully.');
    console.log('\nChanges made:');
    console.log('- Changed voice provider from PlayHT to Azure');
    console.log('- Updated default voiceId to "andrew" (Azure compatible)');
    console.log('- Maintained VAPI integration and configuration structure');
    console.log('- This should resolve the "no audio" issue during voice calls');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}