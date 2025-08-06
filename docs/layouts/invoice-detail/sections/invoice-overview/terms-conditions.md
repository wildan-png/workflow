# Terms & Conditions Section

## Overview
Payment terms, conditions, and other legal information for the invoice.

## Semantic Class
`terms-conditions`

## Position
- Below totals section
- Above attachments
- Within invoice overview (left column)

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Full-width text content
- **Typography**: Readable text with proper hierarchy
- **Spacing**: Consistent padding and margins

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Terms & Conditions                                          │
├─────────────────────────────────────────────────────────────┤
│ Payment Terms:                                              │
│ • Payment is due within 30 days of invoice date            │
│ • Late payments subject to 1.5% monthly interest           │
│ • All payments must be made in USD                          │
│                                                             │
│ Additional Terms:                                           │
│ • Work begins upon receipt of 50% deposit                   │
│ • Final payment due upon project completion                 │
│ • Changes to scope may affect final pricing                 │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Payment Terms
- **Due Date**: Payment deadline information
- **Late Fees**: Interest or penalties for late payment
- **Payment Methods**: Accepted payment methods
- **Currency**: Required payment currency

### Additional Terms
- **Deposit Requirements**: Upfront payment requirements
- **Project Terms**: Work-related conditions
- **Scope Changes**: How changes affect pricing
- **Legal Clauses**: Any legal requirements

## Components
- Card container with header
- Structured text content
- Bullet points for easy reading
- Proper typography hierarchy

## Data Structure
```typescript
interface TermsConditions {
  paymentTerms: {
    dueDate: string;
    lateFees?: string;
    paymentMethods: string[];
    currency: string;
  };
  additionalTerms: string[];
  legalClauses?: string[];
}
```

## Default Terms Template
```javascript
const defaultTerms = {
  paymentTerms: {
    dueDate: "30 days from invoice date",
    lateFees: "1.5% monthly interest",
    paymentMethods: ["Bank Transfer", "Credit Card", "Check"],
    currency: "USD"
  },
  additionalTerms: [
    "Work begins upon receipt of 50% deposit",
    "Final payment due upon project completion",
    "Changes to scope may affect final pricing"
  ]
};
```

## Responsive Behavior
- **Desktop**: Full-width text layout
- **Tablet**: Full-width text layout
- **Mobile**: Full-width text layout with adjusted padding

## Implementation Notes
- Use semantic HTML for proper structure
- Ensure readable typography and spacing
- Handle long text content gracefully
- Consider edit mode for terms
- Maintain consistent styling with other sections 