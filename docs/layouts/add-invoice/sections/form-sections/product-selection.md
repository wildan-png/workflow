# Product Selection

## Purpose
Product list management section for adding, removing, and configuring products in the invoice.

## Semantic Class
`product-selection`

## Position
Second section in the form (left column)

## Content Structure
```
┌─────────────────────────────────────┐
│ Product Selection                   │
├─────────────────────────────────────┤
│ Selected Products List              │
│ ┌─────────────────────────────────┐ │
│ │ [Image] Product Name | Qty | Tax│ │
│ │ [Remove Button]                 │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Image] Product Name | Qty | Tax│ │
│ │ [Remove Button]                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Add Coupon                          │
│ [Button/Input]                      │
├─────────────────────────────────────┤
│ Add Discount                        │
│ [Button/Input]                      │
├─────────────────────────────────────┤
│ [Add Product] Link Button           │
└─────────────────────────────────────┘
```

## Visual Design

### Layout
- **Background**: White
- **Padding**: 24px (p-6)
- **Border**: Rounded corners
- **Margin**: Bottom margin for spacing

### Section Header
- **Title**: "Product Selection"
- **Styling**: text-lg font-semibold text-gray-900
- **Semantic Class**: `product-selection__title`

## Components

### Selected Products List
- **Purpose**: Display selected products in table format
- **Semantic Class**: `product-selection__products-list`
- **Empty State**: "No products selected. Click 'Add Product' to get started."

#### Product Row Structure
```
┌─────────────────────────────────────────────────────────┐
│ [Image] Product Name | Qty: [Input] | Tax: [Input] | [X] │
└─────────────────────────────────────────────────────────┘
```

#### Product Row Elements
- **Product Image**: Small thumbnail (40x40px)
- **Product Name**: Text display
- **Quantity**: Number input (min: 1)
- **Tax**: Number input (percentage, 0-100)
- **Remove Button**: X icon button

### Add Coupon
- **Type**: Button that opens coupon input/modal
- **Text**: "Add Coupon"
- **Icon**: Plus icon
- **Semantic Class**: `product-selection__add-coupon-button`
- **Action**: Open coupon input field or modal

### Add Discount
- **Type**: Button that opens discount input/modal
- **Text**: "Add Discount"
- **Icon**: Plus icon
- **Semantic Class**: `product-selection__add-discount-button`
- **Action**: Open discount input field or modal

### Add Product Link
- **Type**: Link button
- **Text**: "Add Product"
- **Icon**: Plus icon
- **Semantic Class**: `product-selection__add-product-link`
- **Action**: Open product selection modal/catalog

## Product Row Details

### Product Image
- **Size**: 40x40px
- **Border**: Rounded corners
- **Fallback**: Placeholder icon
- **Semantic Class**: `product-selection__product-image`

### Product Name
- **Type**: Text display
- **Styling**: font-medium text-gray-900
- **Semantic Class**: `product-selection__product-name`

### Quantity Input
- **Type**: Number input
- **Min Value**: 1
- **Default**: 1
- **Width**: 80px
- **Semantic Class**: `product-selection__quantity-input`
- **Validation**: Must be positive integer

### Tax Input
- **Type**: Number input
- **Min Value**: 0
- **Max Value**: 100
- **Suffix**: "%"
- **Width**: 80px
- **Semantic Class**: `product-selection__tax-input`
- **Validation**: Must be 0-100

### Remove Button
- **Type**: Icon button
- **Icon**: X/Close icon
- **Color**: Red on hover
- **Semantic Class**: `product-selection__remove-button`
- **Action**: Remove product from list

## Actions

### Add Product Flow
1. Click "Add Product" link
2. Open product catalog/modal
3. Search and select products
4. Add to invoice
5. Update product list

### Coupon Flow
1. Click "Add Coupon" button
2. Show coupon input field
3. Enter coupon code
4. Apply discount to total

### Discount Flow
1. Click "Add Discount" button
2. Show discount input field
3. Enter percentage or amount
4. Apply discount to total

## Validation Rules
- **Products**: At least one product required
- **Quantity**: Must be positive integer
- **Tax**: Must be 0-100 percentage
- **Coupon**: Valid coupon code format
- **Discount**: Must be positive number

## Implementation Notes
- Use dynamic table/list for products
- Implement real-time calculations
- Add loading states for product search
- Include proper error handling
- Support keyboard navigation
- Add confirmation for product removal 