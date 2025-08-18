// Test script to verify category filtering functionality
const fs = require('fs');
const path = require('path');

console.log('Testing Category Filtering Implementation...\n');

// Read the AgentSearch component
const agentSearchPath = path.join(__dirname, 'app/(routes)/dashboard/_components/AgentSearch.tsx');
const agentSearchContent = fs.readFileSync(agentSearchPath, 'utf8');

// Test 1: Check if categories state is added
const hasCategoriesState = agentSearchContent.includes('const [categories, setCategories] = useState<string[]>([])');
console.log(hasCategoriesState ? '✅ Categories state added' : '❌ Categories state missing');

// Test 2: Check if allCategories useMemo is implemented
const hasAllCategories = agentSearchContent.includes('const allCategories = useMemo(');
console.log(hasAllCategories ? '✅ allCategories useMemo implemented' : '❌ allCategories useMemo missing');

// Test 3: Check if category filtering is added to filtered useMemo
const hasCategoryFiltering = agentSearchContent.includes('if (categories.length) {') && 
                            agentSearchContent.includes('list.filter((a) => categories.includes(a.category))');
console.log(hasCategoryFiltering ? '✅ Category filtering logic added' : '❌ Category filtering logic missing');

// Test 4: Check if toggleCategory function exists
const hasToggleCategory = agentSearchContent.includes('const toggleCategory = (c: string) =>');
console.log(hasToggleCategory ? '✅ toggleCategory function added' : '❌ toggleCategory function missing');

// Test 5: Check if categories is included in clearAll
const clearAllIncludesCategories = agentSearchContent.includes('setCategories([])');
console.log(clearAllIncludesCategories ? '✅ clearAll includes categories' : '❌ clearAll missing categories');

// Test 6: Check if hasFilters includes categories
const hasFiltersIncludesCategories = agentSearchContent.includes('categories.length') && 
                                   agentSearchContent.includes('Boolean(search.trim() || tags.length || categories.length || tier !== "all")');
console.log(hasFiltersIncludesCategories ? '✅ hasFilters includes categories' : '❌ hasFilters missing categories');

// Test 7: Check if CategoryPicker component exists
const hasCategoryPicker = agentSearchContent.includes('function CategoryPicker(');
console.log(hasCategoryPicker ? '✅ CategoryPicker component added' : '❌ CategoryPicker component missing');

// Test 8: Check if category UI elements are added
const hasCategoryUI = agentSearchContent.includes('<CategoryPicker allCategories={allCategories}') &&
                     agentSearchContent.includes('Categories') &&
                     agentSearchContent.includes('categories.map((c) =>');
console.log(hasCategoryUI ? '✅ Category UI elements added' : '❌ Category UI elements missing');

// Test 9: Check if desktop Categories popover is added
const hasCategoriesPopover = agentSearchContent.includes('aria-label="Pick categories"') &&
                           agentSearchContent.includes('Filter by categories');
console.log(hasCategoriesPopover ? '✅ Desktop Categories popover added' : '❌ Desktop Categories popover missing');

// Test 10: Check if categories are included in dependencies
const hasCategoryDependencies = agentSearchContent.includes(', categories]') || 
                              agentSearchContent.includes('[agents, debounced, tier, categories, tags]');
console.log(hasCategoryDependencies ? '✅ Category dependencies added to useMemo' : '❌ Category dependencies missing');

console.log('\n📊 Test Summary:');
const tests = [
    hasCategoriesState,
    hasAllCategories, 
    hasCategoryFiltering,
    hasToggleCategory,
    clearAllIncludesCategories,
    hasFiltersIncludesCategories,
    hasCategoryPicker,
    hasCategoryUI,
    hasCategoriesPopover,
    hasCategoryDependencies
];

const passedTests = tests.filter(Boolean).length;
console.log(`${passedTests}/10 tests passed`);

if (passedTests === 10) {
    console.log('🎉 All category filtering functionality implemented successfully!');
} else {
    console.log('⚠️ Some category filtering features may be missing or incomplete.');
}

console.log('\nTest completed!');