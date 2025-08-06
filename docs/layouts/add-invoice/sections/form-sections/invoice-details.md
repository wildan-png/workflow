# Invoice Details

## Purpose
Basic invoice information form section for collecting essential invoice data.

## Semantic Class
`invoice-details`

## Position
First section in the form (left column)

## Content Structure
```
┌─────────────────────────────────────┐
│ Invoice Details                     │
├─────────────────────────────────────┤
│ Select User/Contact                 │
│ [Dropdown/Search]                   │
├─────────────────────────────────────┤
│ Subject                             │
│ [Text Input]                        │
├─────────────────────────────────────┤
│ Due Date                            │
│ [Date Picker]                       │
├─────────────────────────────────────┤
│ Amount                              │
│ [Number Input] [Currency Select]    │
└─────────────────────────────────────┘
```

## Visual Design

### Layout
- **Background**: White
- **Padding**: 24px (p-6)
- **Border**: Rounded corners
- **Margin**: Bottom margin for spacing

### Section Header
- **Title**: "Invoice Details"
- **Styling**: text-lg font-semibold text-gray-900
- **Semantic Class**: `invoice-details__title`

## Form Fields

### Select User/Contact
- **Type**: Dropdown with search functionality
- **Placeholder**: "Select a customer or contact"
- **Required**: Yes
- **Semantic Class**: `invoice-details__contact-select`
- **Validation**: Must select a valid contact

### Subject
- **Type**: Text input
- **Placeholder**: "Enter invoice subject"
- **Required**: Yes
- **Max Length**: 255 characters
- **Semantic Class**: `invoice-details__subject-input`
- **Validation**: Required field

### Due Date
- **Type**: Date picker
- **Default**: 30 days from today
- **Required**: Yes
- **Semantic Class**: `invoice-details__due-date-picker`
- **Validation**: Must be future date

### Amount
- **Type**: Number input with currency selector
- **Layout**: Inline (amount input + currency dropdown)
- **Placeholder**: "0.00"
- **Required**: Yes
- **Min Value**: 0
- **Semantic Class**: `invoice-details__amount-input`
- **Currency Selector**: `invoice-details__currency-select`
- **Validation**: Must be positive number

## Form Layout

### Field Groups
- **Contact Selection**: Full width
- **Subject**: Full width
- **Due Date**: Full width
- **Amount & Currency**: Inline layout

### Spacing
- **Between Fields**: 16px (space-y-4)
- **Field Labels**: 8px below label (mb-2)
- **Input Groups**: 8px between elements (space-x-2)

## Validation Rules
- **Contact**: Required, must be valid contact
- **Subject**: Required, max 255 characters
- **Due Date**: Required, must be future date
- **Amount**: Required, must be positive number

## Implementation Notes
- Use proper form validation
- Add loading states for contact search
- Implement auto-save on field change
- Add proper error messages
- Support keyboard navigation
- Include proper ARIA labels 