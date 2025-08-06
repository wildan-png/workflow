# Sticky Navigation

## Purpose
Custom navigation header for the Add Invoice page, different from the standard invoice list navigation.

## Semantic Class
`add-invoice-navigation`

## Position
Fixed at top of viewport (z-index: 50)

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] | "Add Invoice" | [Help Button] | [Close Button]     │
└─────────────────────────────────────────────────────────────┘
```

## Visual Design

### Layout
- **Height**: 64px (h-16)
- **Background**: White with border-bottom
- **Padding**: 24px horizontal (px-6)
- **Display**: Flex with space-between

### Left Content
- **Logo**: Company logo (font-bold text-lg)
- **Separator**: Vertical divider (w-px h-6 bg-gray-300)
- **Page Title**: "Add Invoice" (text-lg font-semibold)

### Right Content
- **Help Button**: Ghost button with help icon
- **Close Button**: Ghost button with X icon

## Components

### Logo
- **Type**: Text or image
- **Styling**: font-bold text-lg
- **Semantic Class**: `add-invoice-navigation__logo`

### Page Title
- **Text**: "Add Invoice"
- **Styling**: text-lg font-semibold text-gray-900
- **Semantic Class**: `add-invoice-navigation__title`

### Help Button
- **Type**: Ghost button
- **Icon**: Help/Question mark icon
- **Action**: Open help modal/documentation
- **Semantic Class**: `add-invoice-navigation__help-button`

### Close Button
- **Type**: Ghost button
- **Icon**: X/Close icon
- **Action**: Navigate back to invoice list
- **Semantic Class**: `add-invoice-navigation__close-button`

## Responsive Behavior
- **Desktop**: Full layout with all elements visible
- **Tablet**: Same as desktop
- **Mobile**: Compact layout, smaller text

## Implementation Notes
- Use fixed positioning with high z-index
- Include proper spacing and dividers
- Ensure buttons are accessible with proper ARIA labels
- Add hover states for interactive elements 