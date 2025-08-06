# Main Content

## Purpose
Two-column layout container for the Add Invoice page, containing form sections on the left and live preview on the right.

## Semantic Class
`add-invoice-content`

## Position
Below the sticky navigation

## Content Structure
```
┌─────────────────┬───────────────┐
│ Form Sections   │ Live Preview  │
│ (Left - 70%)    │ (Right - 30%) │
│                 │               │
│ • Invoice       │ • Preview     │
│   Details       │   Header      │
│ • Product       │ • Invoice     │
│   Selection     │   Preview     │
│ • Additional    │ • Preview     │
│   Options       │   Options     │
│                 │               │
│ ┌─────────────┐ │               │
│ │ Sticky      │ │               │
│ │ Footer      │ │               │
│ │ [Last Saved]│ │               │
│ │ [Cancel]    │ │               │
│ │ [Send]      │ │               │
│ └─────────────┘ │               │
└─────────────────┴───────────────┘
```

## Visual Design

### Layout
- **Display**: CSS Grid
- **Columns**: 70% left, 30% right
- **Gap**: 24px between columns
- **Padding**: 24px horizontal (px-6)
- **Background**: Light gray background

### Left Column (Form Sections)
- **Width**: 70% of container
- **Background**: White
- **Border**: Rounded corners
- **Shadow**: Subtle shadow
- **Semantic Class**: `add-invoice-form`

### Right Column (Live Preview)
- **Width**: 30% of container
- **Background**: White
- **Border**: Rounded corners
- **Shadow**: Subtle shadow
- **Semantic Class**: `live-preview`

## Components

### Form Sections Container
- **Purpose**: Contains all form elements
- **Semantic Class**: `add-invoice-form`
- **Position**: Left column
- **Content**: Invoice details, product selection, additional options, sticky footer

### Live Preview Container
- **Purpose**: Shows real-time invoice preview
- **Semantic Class**: `live-preview`
- **Position**: Right column
- **Content**: Preview header, preview content

## Responsive Behavior

### Desktop (lg+)
- **Layout**: Two-column grid
- **Left**: 70% width
- **Right**: 30% width
- **Gap**: 24px

### Tablet (md)
- **Layout**: Stacked (form on top, preview below)
- **Form**: Full width
- **Preview**: Full width
- **Gap**: 24px vertical

### Mobile (sm)
- **Layout**: Single column
- **Form**: Full width
- **Preview**: Full width (or modal/overlay)
- **Padding**: Reduced horizontal padding

## Implementation Notes
- Use CSS Grid for responsive layout
- Ensure proper spacing and alignment
- Add smooth transitions for responsive changes
- Consider preview collapse/expand functionality
- Maintain proper semantic structure 