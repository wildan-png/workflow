# Preview Header

## Purpose
Header section of the live preview panel with title and preview options.

## Semantic Class
`preview-header`

## Position
Top of the live preview panel (right column)

## Content Structure
```
┌─────────────────────────────────────┐
│ Invoice Preview                     │
├─────────────────────────────────────┤
│ [Desktop] [Mobile] [Payment Page]   │
└─────────────────────────────────────┘
```

## Visual Design

### Layout
- **Background**: White
- **Padding**: 16px (p-4)
- **Border**: Bottom border (border-b border-gray-200)
- **Display**: Flex with space-between

### Container
- **Semantic Class**: `preview-header`
- **Height**: Auto (content-based)
- **Width**: 100% of preview panel

## Components

### Title
- **Text**: "Invoice Preview"
- **Styling**: text-lg font-semibold text-gray-900
- **Semantic Class**: `preview-header__title`

### Preview Options
- **Purpose**: Toggle between different preview modes
- **Type**: Button group or tabs
- **Semantic Class**: `preview-header__options`

#### Desktop Option
- **Type**: Button/tab
- **Text**: "Desktop"
- **Icon**: Desktop/monitor icon (optional)
- **Semantic Class**: `preview-header__option-desktop`
- **State**: Active by default

#### Mobile Option
- **Type**: Button/tab
- **Text**: "Mobile"
- **Icon**: Mobile/phone icon (optional)
- **Semantic Class**: `preview-header__option-mobile`
- **State**: Inactive by default

#### Payment Page Option
- **Type**: Button/tab
- **Text**: "Payment Page"
- **Icon**: Credit card icon (optional)
- **Semantic Class**: `preview-header__option-payment`
- **State**: Inactive by default

## Preview Options Behavior

### Desktop View
- **Width**: Full preview width
- **Layout**: Standard invoice layout
- **Scale**: 100% (no scaling)
- **Semantic Class**: `preview-content--desktop`

### Mobile View
- **Width**: Mobile device width (375px)
- **Layout**: Mobile-optimized layout
- **Scale**: Scaled to fit preview area
- **Semantic Class**: `preview-content--mobile`

### Payment Page View
- **Width**: Payment page width
- **Layout**: Payment-focused layout
- **Scale**: Scaled to fit preview area
- **Semantic Class**: `preview-content--payment`

## Interaction States

### Option Selection
- **Active**: Primary color, bold text
- **Inactive**: Gray text, subtle background
- **Hover**: Highlight on hover
- **Focus**: Clear focus indicator

### Preview Updates
- **Real-time**: Updates as form changes
- **Smooth**: Smooth transitions between views
- **Loading**: Show loading state if needed

## Responsive Behavior

### Desktop
- **Layout**: Full header with all options
- **Options**: Horizontal button group
- **Spacing**: Proper spacing between elements

### Tablet
- **Layout**: Same as desktop
- **Options**: Horizontal button group
- **Text**: Full option names

### Mobile
- **Layout**: Compact header
- **Options**: Smaller buttons or dropdown
- **Text**: Abbreviated option names

## Implementation Notes

### State Management
- Track active preview mode
- Update preview content based on selection
- Maintain preview state across form changes

### Preview Rendering
- Render different layouts for each mode
- Scale content appropriately
- Maintain aspect ratios

### Accessibility
- Include proper ARIA labels for options
- Support keyboard navigation
- Add screen reader announcements for mode changes

### Performance
- Optimize preview rendering
- Use efficient re-rendering strategies
- Consider lazy loading for complex previews 