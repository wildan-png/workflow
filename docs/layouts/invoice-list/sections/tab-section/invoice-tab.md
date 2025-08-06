# Invoice Tab Section

## Overview
Invoice management tab content with integrated filter and table functionality (previously the main table section).

## Semantic Class
`invoice-tab`

## Position
- Inside tab-section component
- Third tab in the tab interface (active by default)
- Full width of tab content area

## Visual Design
- **Background**: White background within gray tab container
- **Layout**: Filter section on top, table below
- **Spacing**: Consistent spacing between filter and table

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Filter Content: [Search] [Status] [Date] [Actions]          │
├─────────────────────────────────────────────────────────────┤
│ Table Header: 
│ [ Amount | Invoice Number | Email | Subject | Last Updated | Created at │ Action menu ]
├─────────────────────────────────────────────────────────────┤
│ Table Content
│ [ Amount + Currency (i.e. USD) | Invoice number + badge status (paid, unpaid, pastdue, draft) | Email | Subject | Last updated | Created at | more menu icon button]
│ ...                                                        │
│ ...                                                        │
├─────────────────────────────────────────────────────────────┤
│ [Load More Button]                                         │
└─────────────────────────────────────────────────────────────┘
```

## Section Structure

### Filter Content
- Search input field
- Status filter dropdown (paid, unpaid, pastdue, draft)
- Date range filter dropdown
- Action buttons (Import, Export, Create Invoice)

### Table Structure
#### Table Header
- Amount
- Invoice Number
- Email
- Subject
- Last Updated
- Created at
- Action menu

#### Table Body
- Data rows with invoice information
- Amount with currency formatting (e.g., $1,200.00 USD)
- Invoice number with status badge (paid, unpaid, pastdue, draft)
- Email address
- Subject line
- Last updated timestamp
- Created date
- More menu icon button

#### Table Footer
- Load More button for pagination

## Table Columns
- **Amount**: Invoice amount with currency (e.g., $1,200.00 USD)
- **Invoice Number**: Unique invoice number with status badge
- **Email**: Customer email address
- **Subject**: Invoice subject/description
- **Last Updated**: Timestamp of last modification
- **Created at**: Invoice creation date
- **Action menu**: More options button (three dots icon)

## Components
### Filter Components
- Search input field
- Status filter dropdown
- Date range filter dropdown
- Action buttons (Import, Export, Create)

### Table Components
- Data table with sorting
- Status badges (paid, unpaid, pastdue, draft)
- Currency formatting
- Date/time formatting
- More menu icon button
- Load more button
- Empty state
- Loading state

## Responsive Behavior
- **Desktop**: Full table layout with all columns
- **Tablet**: Horizontal scroll with responsive columns
- **Mobile**: Card-based layout instead of table

## Implementation Notes
- Inherits from previous table-section implementation
- Filter integration within tab content
- Currency and date formatting functions
- Status badge variants for each invoice status
- Search and filter functionality
- Load more pagination
- Action menu for invoice operations
- Responsive table design