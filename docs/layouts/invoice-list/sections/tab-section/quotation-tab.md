# Quotation Tab Section

## Overview
Quotation management tab content displaying quotation list with create functionality.

## Semantic Class
`quotation-tab`

## Position
- Inside tab-section component
- Second tab in the tab interface
- Full width of tab content area

## Visual Design
- **Background**: White background within gray tab container
- **Layout**: Header with action button, table below
- **Spacing**: Consistent spacing between header and table

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Quotations                              [Create Quotation]  │
├─────────────────────────────────────────────────────────────┤
│ Quote Number | Client | Amount | Status | Valid Until | Actions │
├─────────────────────────────────────────────────────────────┤
│ QUO-2024-001 | Acme Corp | $5,500.00 | Pending | Feb 15 | ⋮ │
│ QUO-2024-002 | Tech Solutions | $3,200.00 | Accepted | Feb 20 | ⋮ │
│ QUO-2024-003 | Digital Agency | $8,750.00 | Draft | Feb 25 | ⋮ │
└─────────────────────────────────────────────────────────────┘
```

## Content Sections

### Quotation Header
- **Title**: "Quotations"
- **Create Button**: Primary action button for creating new quotations

### Quotation Table
- **Quote Number**: Unique quotation identifier
- **Client**: Client/company name
- **Amount**: Quotation amount with currency
- **Status**: Badge with status (Pending, Accepted, Draft)
- **Valid Until**: Expiration date
- **Actions**: More options menu

## Table Columns
- **Quote Number**: Unique identifier (e.g., QUO-2024-001)
- **Client**: Customer/company name
- **Amount**: Quotation amount with currency formatting
- **Status**: Status badge with variants:
  - Pending (secondary)
  - Accepted (default/green)
  - Draft (outline)
- **Valid Until**: Quote expiration date
- **Actions**: More options button (three dots icon)

## Components
- Header with title and create button
- Data table with quotation information
- Status badges for different states
- More options button for actions
- Responsive table layout

## Responsive Behavior
- **Desktop**: Full table layout
- **Tablet**: Horizontal scroll with responsive columns
- **Mobile**: Card-based layout instead of table

## Implementation Notes
- Use Table component for quotation listing
- Status badges with appropriate color variants
- Date formatting for valid until dates
- Action menu for quote operations (edit, delete, convert to invoice)
- Consider pagination or load more for large datasets
- Integration with quotation creation flow