# Notes Section

## Overview
Interactive notes area for adding and editing invoice-specific notes and comments.

## Semantic Class
`notes-section`

## Position
- Top of side panel (right column)
- Above activity log
- Within side panel

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Full-width text area with actions
- **Typography**: Readable text with proper spacing
- **Actions**: Save and edit buttons

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Notes                                                        │
├─────────────────────────────────────────────────────────────┤
│ [Text Area]                                                  │
│ Customer requested early delivery.                          │
│ Will need to expedite shipping.                             │
│                                                             │
│ [Save] [Edit]                                               │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Notes Text Area
- **Content**: User-entered notes and comments
- **Placeholder**: "Add notes about this invoice..."
- **Size**: Resizable text area
- **Character Limit**: Optional character limit

### Action Buttons
- **Save**: Save current notes
- **Edit**: Toggle edit mode
- **Clear**: Clear all notes (optional)

## Components
- Card container with header
- Textarea for note input
- Action buttons
- Save/Edit state management
- Character counter (optional)

## Data Structure
```typescript
interface NotesSection {
  notes: string;
  lastUpdated: string;
  isEditing: boolean;
  hasChanges: boolean;
}
```

## State Management
```javascript
const [notes, setNotes] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [hasChanges, setHasChanges] = useState(false);

const handleSave = () => {
  // Save notes to backend
  setIsEditing(false);
  setHasChanges(false);
};

const handleEdit = () => {
  setIsEditing(true);
};
```

## Responsive Behavior
- **Desktop**: Full-width in side panel
- **Tablet**: Full-width in side panel
- **Mobile**: Full-width when stacked

## Implementation Notes
- Auto-save functionality (optional)
- Handle unsaved changes warning
- Implement proper text area sizing
- Consider rich text editing (optional)
- Maintain notes history
- Ensure proper accessibility 