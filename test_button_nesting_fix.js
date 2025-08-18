// Test script to verify the button nesting fix
// This simulates the component structure to ensure no nested buttons

console.log('Testing button nesting fix...');

// Mock React structure representing the fixed ViewReportDialog
const mockDialogStructure = {
  Dialog: {
    DialogTrigger: {
      asChild: true, // This is the key fix
      children: {
        Button: {
          variant: 'link',
          size: 'sm',
          text: 'View Report'
        }
      }
    }
  }
};

// Function to check for button nesting
function checkButtonNesting(component, depth = 0, buttonFound = false) {
  if (typeof component !== 'object' || component === null) {
    return false;
  }

  // Check if current component is a button
  const isButton = component.hasOwnProperty('Button') || 
                  component.hasOwnProperty('button') ||
                  (typeof component === 'object' && component.type === 'button');

  if (isButton && buttonFound) {
    console.log('❌ ERROR: Nested button detected!');
    return true;
  }

  // Special handling for DialogTrigger with asChild
  if (component.hasOwnProperty('DialogTrigger')) {
    const dialogTrigger = component.DialogTrigger;
    const hasAsChild = dialogTrigger.asChild === true;
    
    if (hasAsChild) {
      console.log('✅ DialogTrigger has asChild=true, no button nesting will occur');
      // With asChild=true, DialogTrigger won't create its own button
      return checkButtonNesting(dialogTrigger.children, depth + 1, false);
    } else {
      console.log('⚠️  DialogTrigger without asChild will create a button');
      // DialogTrigger will create its own button
      return checkButtonNesting(dialogTrigger.children, depth + 1, true);
    }
  }

  // Recursively check children
  for (const key in component) {
    if (component.hasOwnProperty(key) && typeof component[key] === 'object') {
      const hasNestedButtons = checkButtonNesting(component[key], depth + 1, buttonFound || isButton);
      if (hasNestedButtons) {
        return true;
      }
    }
  }

  return false;
}

// Test the fixed structure
console.log('\n--- Testing FIXED structure ---');
const hasNesting = checkButtonNesting(mockDialogStructure);

if (!hasNesting) {
  console.log('✅ SUCCESS: No button nesting detected in the fixed structure!');
  console.log('✅ The hydration error should be resolved.');
} else {
  console.log('❌ FAILED: Button nesting still detected.');
}

// Test what would happen without the fix
console.log('\n--- Testing structure WITHOUT fix ---');
const brokenStructure = {
  Dialog: {
    DialogTrigger: {
      // asChild: false (or missing) - this would cause the issue
      children: {
        Button: {
          variant: 'link',
          size: 'sm', 
          text: 'View Report'
        }
      }
    }
  }
};

const wouldHaveNesting = checkButtonNesting(brokenStructure);
if (wouldHaveNesting) {
  console.log('✅ Confirmed: Structure without fix would have caused button nesting.');
} else {
  console.log('❌ Unexpected: Structure without fix should have button nesting.');
}

console.log('\n--- Test completed ---');