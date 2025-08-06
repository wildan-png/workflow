# Invoice Header Section

## Overview
Key invoice information display with prominent status, amount, and action buttons for the current invoice.

## Semantic Class
`invoice-header`

## Position
- Below breadcrumb navigation
- Above main content
- Full width with consistent padding

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Horizontal layout with left info, right actions
- **Spacing**: Generous padding for prominence
- **Typography**: Large, prominent invoice number and amount

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ INV-2024-001                    [Edit] [Download] [Send]    │
│ [Status Badge] 1,200.00 USD                                 │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Left Side (Invoice Info)
- **Invoice Number**: Large, prominent display
- **Status Badge**: Color-coded status indicator
- **Amount**: Large currency display with gray currency code

### Right Side (Actions)
- **Edit Button**: Primary action to edit invoice
- **Download Button**: Download PDF version
- **Send Button**: Send invoice to customer
- **More Actions**: Dropdown for additional actions

## Components
- Invoice number display
- Status badge with color variants
- Currency amount display
- Action buttons (Edit, Download, Send)
- Dropdown menu for additional actions

## Status Badge Variants
- **Paid**: Green badge (default)
- **Unpaid**: Gray badge (secondary)
- **Past Due**: Red badge (destructive)
- **Draft**: Outline badge

## Responsive Behavior
- **Desktop**: Full horizontal layout
- **Tablet**: Stacked layout (info above actions)
- **Mobile**: Single column, actions below info

## Implementation Notes
- Use same status badge logic as invoice list
- Ensure proper button states and loading indicators
- Handle action button permissions/visibility
- Maintain consistent currency formatting 