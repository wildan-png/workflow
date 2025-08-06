# Billing Details Section

## Overview
Customer and invoice information display including contact details, dates, and billing address.

## Semantic Class
`billing-details`

## Position
- Below subject header (if exists)
- Above line items table
- Within invoice overview (left column)

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Two-column grid for information display
- **Spacing**: Consistent padding and margins
- **Typography**: Clear hierarchy with labels and values

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Billing Details                                              │
├─────────────────────────────────────────────────────────────┤
│ Customer Information    │ Invoice Information              │
│ ┌─────────────────────┐ │ ┌─────────────────────────────┐   │
│ │ Email: john@...     │ │ │ Created: Jan 10, 2024      │   │
│ │ Name: John Doe      │ │ │ Due Date: Feb 10, 2024     │   │
│ │ Phone: +1-555-...   │ │ │ Last Updated: Jan 15, 2024 │   │
│ └─────────────────────┘ │ └─────────────────────────────┘   │
│                         │                                   │
│ Billing Address          │                                   │
│ ┌─────────────────────┐ │                                   │
│ │ 123 Main St         │ │                                   │
│ │ City, State 12345   │ │                                   │
│ │ Country             │ │                                   │
│ └─────────────────────┘ │                                   │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Customer Information
- **Email**: Customer email address
- **Name**: Customer full name
- **Phone**: Contact phone number
- **Billing Address**: Complete billing address

### Invoice Information
- **Created Date**: When invoice was created
- **Due Date**: Payment due date
- **Last Updated**: Last modification date
- **Payment Terms**: Payment terms (if applicable)

## Components
- Card container with header
- Two-column grid layout
- Label-value pairs
- Address formatting
- Date formatting

## Data Structure
```typescript
interface BillingDetails {
  customer: {
    email: string;
    name: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  invoice: {
    createdDate: string;
    dueDate: string;
    lastUpdated: string;
    paymentTerms?: string;
  };
}
```

## Responsive Behavior
- **Desktop**: Two-column grid layout
- **Tablet**: Stacked layout (customer info above invoice info)
- **Mobile**: Single column, all sections stacked

## Implementation Notes
- Use proper date formatting for all dates
- Handle missing optional fields gracefully
- Ensure proper address formatting
- Maintain consistent spacing and typography
- Use semantic HTML for accessibility 