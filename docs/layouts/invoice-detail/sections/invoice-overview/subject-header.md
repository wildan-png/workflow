# Subject Header Section

## Overview
Conditional display of the invoice subject/description as a prominent header. Only shows when the invoice has a subject.

## Semantic Class
`subject-header`

## Position
- Top of invoice overview (left column)
- Below main content container
- Above billing details section

## Visual Design
- **Background**: White background with subtle border
- **Typography**: Large, prominent heading
- **Spacing**: Generous padding for emphasis
- **Conditional**: Hidden when no subject exists

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Website Development Services                                │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements
- **Subject Text**: Large heading with invoice subject
- **Conditional Display**: Only renders when subject exists

## Components
- Large heading element
- Conditional rendering logic
- Consistent typography styling

## Conditional Logic
```javascript
// Only render if invoice has a subject
{invoice.subject && (
  <div className="subject-header">
    <h2>{invoice.subject}</h2>
  </div>
)}
```

## Responsive Behavior
- **Desktop**: Large heading, full width
- **Tablet**: Large heading, full width
- **Mobile**: Slightly smaller heading, full width

## Implementation Notes
- Use semantic h2 heading for accessibility
- Ensure proper contrast and readability
- Handle long subject text gracefully
- Maintain consistent spacing with other sections 