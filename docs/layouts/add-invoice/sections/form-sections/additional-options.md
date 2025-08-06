# Additional Options

## Purpose
Expandable optional sections for additional invoice features like terms, attachments, notes, and footer.

## Semantic Class
`additional-options`

## Position
Third section in the form (left column)

## Content Structure
```
┌─────────────────────────────────────┐
│ Additional Options                   │
├─────────────────────────────────────┤
│ ☐ Terms & Conditions                │
│ ☐ Attachments                       │
│ ☐ Notes                             │
│ ☐ Footer                            │
└─────────────────────────────────────┘
```

## Visual Design

### Layout
- **Background**: White
- **Padding**: 24px (p-6)
- **Border**: Rounded corners
- **Margin**: Bottom margin for spacing

### Section Header
- **Title**: "Additional Options"
- **Styling**: text-lg font-semibold text-gray-900
- **Semantic Class**: `additional-options__title`

## Components

### Checkbox List
- **Purpose**: List of optional features
- **Semantic Class**: `additional-options__checkbox-list`
- **Layout**: Vertical list with checkboxes

### Individual Options

#### Terms & Conditions
- **Type**: Checkbox with expandable content
- **Text**: "Terms & Conditions"
- **Semantic Class**: `additional-options__terms-checkbox`
- **Expanded Content**: Textarea for custom terms
- **Default**: Unchecked

#### Attachments
- **Type**: Checkbox with expandable content
- **Text**: "Attachments"
- **Semantic Class**: `additional-options__attachments-checkbox`
- **Expanded Content**: File upload area
- **Default**: Unchecked

#### Notes
- **Type**: Checkbox with expandable content
- **Text**: "Notes"
- **Semantic Class**: `additional-options__notes-checkbox`
- **Expanded Content**: Textarea for notes
- **Default**: Unchecked

#### Footer
- **Type**: Checkbox with expandable content
- **Text**: "Footer"
- **Semantic Class**: `additional-options__footer-checkbox`
- **Expanded Content**: Textarea for footer text
- **Default**: Unchecked

## Expandable Content Details

### Terms & Conditions Content
- **Type**: Textarea
- **Placeholder**: "Enter your terms and conditions..."
- **Rows**: 4-6 rows
- **Semantic Class**: `additional-options__terms-content`
- **Default Text**: Standard terms template

### Attachments Content
- **Type**: File upload area
- **Multiple**: Yes
- **Accepted Types**: PDF, DOC, DOCX, images
- **Max Size**: 10MB per file
- **Semantic Class**: `additional-options__attachments-content`
- **Upload Button**: "Choose Files" or drag & drop

### Notes Content
- **Type**: Textarea
- **Placeholder**: "Add any additional notes..."
- **Rows**: 3-4 rows
- **Semantic Class**: `additional-options__notes-content`
- **Character Limit**: 500 characters

### Footer Content
- **Type**: Textarea
- **Placeholder**: "Enter footer text..."
- **Rows**: 2-3 rows
- **Semantic Class**: `additional-options__footer-content`
- **Character Limit**: 200 characters

## Interaction Behavior

### Checkbox States
- **Unchecked**: Option is disabled, content hidden
- **Checked**: Option is enabled, content visible
- **Hover**: Subtle highlight
- **Focus**: Clear focus indicator

### Expandable Content
- **Animation**: Smooth slide down/up
- **Duration**: 200-300ms
- **Easing**: Ease-in-out
- **Height**: Auto-adjust to content

### Content Visibility
- **Hidden**: When checkbox unchecked
- **Visible**: When checkbox checked
- **Transition**: Smooth height animation

## Form Validation

### Terms & Conditions
- **Required**: Only if checkbox checked
- **Validation**: Non-empty if enabled

### Attachments
- **Required**: No (optional)
- **Validation**: File type and size limits

### Notes
- **Required**: No (optional)
- **Validation**: Character limit if provided

### Footer
- **Required**: No (optional)
- **Validation**: Character limit if provided

## Implementation Notes
- Use controlled checkboxes with state management
- Implement smooth animations for expand/collapse
- Add proper ARIA attributes for accessibility
- Include loading states for file uploads
- Support keyboard navigation
- Add proper error handling for file uploads
- Implement auto-save for text content 