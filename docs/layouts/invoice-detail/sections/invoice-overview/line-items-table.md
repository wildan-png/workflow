# Line Items Table Section

## Overview
Table displaying individual invoice items with descriptions, quantities, rates, and amounts.

## Semantic Class
`line-items-table`

## Position
- Below billing details
- Above totals section
- Within invoice overview (left column)

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Full-width table with proper spacing
- **Typography**: Clear table headers and readable data
- **Borders**: Subtle borders for table structure

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Line Items                                                   │
├─────────────────────────────────────────────────────────────┤
│ Description          │ Qty │ Rate    │ Amount               │
├─────────────────────────────────────────────────────────────┤
│ Website Design       │ 1   │ 800.00  │ 800.00 USD           │
│ Frontend Development │ 1   │ 400.00  │ 400.00 USD           │
│ Total                │     │         │ 1,200.00 USD         │
└─────────────────────────────────────────────────────────────┘
```

## Table Columns

### Description
- **Content**: Item/service description
- **Width**: Flexible, takes remaining space
- **Alignment**: Left-aligned text

### Quantity
- **Content**: Number of units/hours
- **Width**: Fixed width (80px)
- **Alignment**: Center-aligned numbers

### Rate
- **Content**: Price per unit/hour
- **Width**: Fixed width (120px)
- **Alignment**: Right-aligned currency
- **Format**: Currency with gray currency code

### Amount
- **Content**: Total for this line item
- **Width**: Fixed width (140px)
- **Alignment**: Right-aligned currency
- **Format**: Currency with gray currency code

## Components
- Table container with header
- Table headers with proper styling
- Table rows with alternating backgrounds
- Currency formatting for rates and amounts
- Responsive table design

## Data Structure
```typescript
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  currency: string;
}

interface LineItemsTable {
  items: LineItem[];
  currency: string;
}
```

## Responsive Behavior
- **Desktop**: Full table layout with all columns
- **Tablet**: Horizontal scroll with responsive columns
- **Mobile**: Card-based layout instead of table

## Mobile Card Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Website Design                                              │
│ Qty: 1 | Rate: 800.00 USD | Amount: 800.00 USD             │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Frontend Development                                        │
│ Qty: 1 | Rate: 400.00 USD | Amount: 400.00 USD             │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Notes
- Use proper table semantics for accessibility
- Handle empty line items gracefully
- Ensure consistent currency formatting
- Implement responsive table behavior
- Consider edit mode for line items 