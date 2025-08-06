# Preview Content

## Purpose
Live preview display area showing real-time invoice preview based on form data.

## Semantic Class
`preview-content`

## Position
Below the preview header in the live preview panel (right column)

## Content Structure
```
┌─────────────────────────────────────┐
│ Invoice Preview Content              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Invoice Header                  │ │
│ │ [Logo] [Invoice #] [Amount]     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Customer Information            │ │
│ │ [Name] [Email] [Address]        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Line Items                      │ │
│ │ [Product] [Qty] [Price] [Total] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Totals                          │ │
│ │ [Subtotal] [Tax] [Total]        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Visual Design

### Layout
- **Background**: White or light gray
- **Padding**: 16px (p-4)
- **Height**: Flexible (fills available space)
- **Overflow**: Scrollable if content exceeds height

### Container
- **Semantic Class**: `preview-content`
- **Width**: 100% of preview panel
- **Height**: Fill remaining space after header
- **Border**: Optional border for visual separation

## Preview Modes

### Desktop Mode (Default)
- **Width**: Full preview width
- **Layout**: Standard invoice layout
- **Scale**: 100% (no scaling)
- **Semantic Class**: `preview-content--desktop`

### Mobile Mode
- **Width**: Mobile device width (375px)
- **Layout**: Mobile-optimized layout
- **Scale**: Scaled to fit preview area
- **Semantic Class**: `preview-content--mobile`
- **Features**: 
  - Responsive typography
  - Touch-friendly spacing
  - Mobile-specific layout

### Payment Page Mode
- **Width**: Payment page width
- **Layout**: Payment-focused layout
- **Scale**: Scaled to fit preview area
- **Semantic Class**: `preview-content--payment`
- **Features**:
  - Payment form integration
  - Security indicators
  - Payment method display

## Preview Content Sections

### Invoice Header
- **Purpose**: Display invoice branding and key info
- **Content**: Logo, invoice number, amount
- **Semantic Class**: `preview-content__header`

### Customer Information
- **Purpose**: Show customer details
- **Content**: Name, email, address
- **Semantic Class**: `preview-content__customer`

### Line Items
- **Purpose**: Display selected products
- **Content**: Product list with quantities and prices
- **Semantic Class**: `preview-content__line-items`

### Totals Section
- **Purpose**: Show invoice totals
- **Content**: Subtotal, tax, discount, final total
- **Semantic Class**: `preview-content__totals`

### Additional Content
- **Purpose**: Show optional content when enabled
- **Content**: Terms, notes, footer
- **Semantic Class**: `preview-content__additional`

## Real-time Updates

### Form Synchronization
- **Invoice Details**: Update header and customer info
- **Products**: Update line items and totals
- **Options**: Show/hide additional content
- **Calculations**: Real-time total updates

### Update Behavior
- **Immediate**: Update on form change
- **Smooth**: Smooth transitions for changes
- **Debounced**: Prevent excessive updates
- **Loading**: Show loading state if needed

## Responsive Behavior

### Desktop Preview
- **Layout**: Full-width standard layout
- **Typography**: Standard sizes
- **Spacing**: Normal spacing

### Mobile Preview
- **Layout**: Mobile-optimized layout
- **Typography**: Larger touch-friendly text
- **Spacing**: Increased spacing for touch

### Payment Page Preview
- **Layout**: Payment-focused layout
- **Typography**: Clear, readable text
- **Spacing**: Optimized for payment flow

## Implementation Notes

### Data Binding
- Bind form data to preview components
- Handle real-time updates efficiently
- Maintain preview state consistency

### Performance Optimization
- Use efficient re-rendering strategies
- Implement debouncing for frequent updates
- Consider virtual scrolling for large content

### Accessibility
- Include proper ARIA labels
- Support keyboard navigation
- Add screen reader support
- Maintain color contrast ratios

### Error Handling
- Show fallback content for missing data
- Handle preview rendering errors
- Display appropriate error messages

### Preview Scaling
- Implement proper scaling for different modes
- Maintain aspect ratios
- Ensure content remains readable
- Handle overflow appropriately 