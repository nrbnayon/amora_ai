# Wedding Onboarding System

## Overview
The wedding onboarding system has been redesigned as a modal-based flow that appears when users click "Create New Wedding Plan" from the All Weddings page.

## Architecture

### Components Structure

```
components/onboarding/
├── OnboardingModal.tsx      # Main modal container managing the flow
├── Question1Modal.tsx       # Basic Information (Groom/Bride names, location, date)
├── Question2Modal.tsx       # Budget & Priorities
├── Question3Modal.tsx       # Wedding Style & Theme
├── Question4Modal.tsx       # Guests & Personal Touch
├── ProgressIndicator.tsx    # Progress bar component
└── index.ts                 # Exports for easy imports
```

### Data Flow

1. **User clicks "Create New Wedding Plan"** on `/dashboard/all-weddings`
2. **OnboardingModal opens** with Question1
3. **User progresses through 4 steps**, each collecting specific data
4. **On completion**, all data is combined and:
   - A new Wedding object is created
   - Added to the weddings list
   - User is redirected to the wedding dashboard

### Form Data Structure

```typescript
interface OnboardingFormData {
  // Step 1: Basic Information
  yourName: string;           // Groom's name
  partnerName: string;        // Bride's name
  weddingLocation: string;    // Wedding location
  weddingDate: string;        // Wedding date
  
  // Step 2: Budget & Priorities
  budget: string;             // Total budget
  topPriorities: string[];    // Selected priorities
  entertainment: string[];    // Entertainment preferences
  
  // Step 3: Wedding Style & Theme
  weddingStyle: string;       // Wedding style
  atmosphere: string;         // Atmosphere preference
  themeOrColor?: string;      // Optional theme/color
  culturalRituals?: string;   // Optional cultural rituals
  
  // Step 4: Guests & Personal Touch
  guestCount: string;         // Number of guests
  venuePreference: string;    // Dietary restrictions
  mealPreference: string;     // Food service type
  additionalNotes?: string;   // Optional notes
}
```

## Key Features

### 1. Modal-Based Flow
- Non-intrusive user experience
- Can be dismissed and reopened
- Maintains state during the session

### 2. Progressive Disclosure
- 4-step wizard with clear progress indication
- Each step focuses on specific aspects
- Validation at each step before proceeding

### 3. Flexible Data Collection
- Required fields marked with asterisks
- Optional fields for additional customization
- Real-time validation with helpful error messages

### 4. Responsive Design
- Works on all screen sizes
- Touch-friendly for mobile devices
- Accessible keyboard navigation

## Usage

### In a Component

```typescript
import { OnboardingModal } from "@/components/onboarding";
import type { OnboardingFormData } from "@/lib/types";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: OnboardingFormData) => {
    console.log("Wedding data:", data);
    // Process the data
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create Wedding
      </Button>
      
      <OnboardingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onComplete={handleComplete}
      />
    </>
  );
}
```

## Migration from Old System

### What Changed

**Before:**
- Onboarding was a separate page route (`/question1`, `/question2`, etc.)
- Triggered immediately after sign-in
- Full-page experience

**After:**
- Onboarding is a modal dialog
- Triggered by user action (Create New Wedding Plan button)
- Integrated into the All Weddings page
- Users can manage multiple weddings

### Removed Routes
The following routes are now deprecated:
- `/question1`
- `/question2`
- `/question3`
- `/question4`

### Updated Sign-in Flow
- Sign-in now redirects to `/dashboard/all-weddings`
- Users see all their wedding plans
- Can create new plans on demand

## Validation

All form fields use Zod schemas for validation:
- `question1Schema` - Basic information
- `question2Schema` - Budget & priorities
- `question3Schema` - Style & theme
- `question4Schema` - Guests & preferences

## Styling

The onboarding modal uses:
- Tailwind CSS for styling
- shadcn/ui components (Dialog, Input, Button, etc.)
- Custom brand colors (`#8B1874` for primary actions)
- Consistent spacing and typography

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Error messages announced

## Future Enhancements

Potential improvements:
1. Save draft functionality
2. Skip and complete later option
3. Pre-fill from previous weddings
4. AI-powered suggestions
5. Template selection
6. Multi-language support
