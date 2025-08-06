# Breadcrumb Navigation Section

## Overview
Navigation path showing the user's current location and providing easy return to the invoice list.

## Semantic Class
`breadcrumb-navigation`

## Position
- Below sticky navigation
- Above invoice header
- Full width with consistent padding

## Visual Design
- **Background**: White or transparent background
- **Text**: Gray text with hover states
- **Separators**: ChevronRight icons between items
- **Padding**: Consistent with page layout

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Home > Invoices > INV-2024-001                              │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements
- **Home**: Link to main dashboard
- **Invoices**: Link back to invoice list
- **Current Invoice**: Current invoice number (non-clickable)

## Components
- Breadcrumb container
- Navigation links with hover states
- ChevronRight separator icons
- Current page indicator

## Responsive Behavior
- **Desktop**: Full breadcrumb path visible
- **Tablet**: Full breadcrumb path visible
- **Mobile**: May truncate or stack if needed

## Implementation Notes
- Use Next.js Link components for navigation
- Ensure proper accessibility with ARIA labels
- Handle long invoice numbers gracefully
- Maintain consistent spacing and typography 