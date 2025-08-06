# Totals Section

## Overview
Summary of invoice totals including subtotal, discounts, taxes, and final amount.

## Semantic Class
`totals-section`

## Position
- Below line items table
- Above terms and conditions
- Within invoice overview (left column)

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Right-aligned summary with clear hierarchy
- **Typography**: Large, prominent final total
- **Spacing**: Consistent spacing between line items

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Totals                                                      │
├─────────────────────────────────────────────────────────────┤
│ Subtotal:                                   1,200.00 USD   │
│ Discount (10%):                              -120.00 USD   │
│ Tax (8.5%):                                   +91.80 USD   │
├─────────────────────────────────────────────────────────────┤
│ Total:                                      1,171.80 USD   │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Subtotal
- **Content**: Sum of all line items
- **Format**: Currency with gray currency code
- **Alignment**: Right-aligned

### Discount (Optional)
- **Content**: Discount amount and percentage
- **Format**: Negative currency with gray currency code
- **Display**: Only shown if discount exists
- **Alignment**: Right-aligned

### Tax (Optional)
- **Content**: Tax amount and percentage
- **Format**: Positive currency with gray currency code
- **Display**: Only shown if tax exists
- **Alignment**: Right-aligned

### Final Total
- **Content**: Final invoice amount
- **Format**: Large, prominent currency display
- **Alignment**: Right-aligned
- **Styling**: Bold, larger font size

## Components
- Card container with header
- Right-aligned summary layout
- Currency formatting for all amounts
- Conditional display for optional items
- Prominent final total styling

## Data Structure
```typescript
interface TotalsSection {
  subtotal: number;
  discount?: {
    amount: number;
    percentage: number;
  };
  tax?: {
    amount: number;
    percentage: number;
  };
  total: number;
  currency: string;
}
```

## Calculation Logic
```javascript
const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
const discountAmount = discount ? (subtotal * discount.percentage) / 100 : 0;
const taxAmount = tax ? ((subtotal - discountAmount) * tax.percentage) / 100 : 0;
const total = subtotal - discountAmount + taxAmount;
```

## Responsive Behavior
- **Desktop**: Right-aligned summary layout
- **Tablet**: Right-aligned summary layout
- **Mobile**: Full-width layout with right alignment

## Implementation Notes
- Ensure accurate calculations
- Handle optional discount and tax gracefully
- Use consistent currency formatting
- Maintain proper alignment and spacing
- Consider edit mode for totals 