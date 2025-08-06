# Sticky Footer

## Purpose
Fixed footer within the form section showing save status and action buttons.

## Semantic Class
`add-invoice-footer`

## Position
Sticky to bottom of the form section (left column)

## Content Structure
```
┌─────────────────────────────────────────────────────────┐
│ [Last Saved Info] | [Cancel] [Send Invoice]             │
└─────────────────────────────────────────────────────────┘
```

## Visual Design

### Layout
- **Position**: Sticky to bottom of form section
- **Height**: 60px (h-15)
- **Background**: White
- **Border**: Top border (border-t border-gray-200)
- **Padding**: 16px horizontal, 12px vertical (px-4 py-3)
- **Display**: Flex with space-between
- **Z-index**: High enough to stay above content

### Container
- **Semantic Class**: `add-invoice-footer`
- **Position**: Fixed relative to form section
- **Width**: 100% of form section width
- **Shadow**: Subtle top shadow for depth

## Components

### Left Side - Save Status
- **Purpose**: Display last save information
- **Semantic Class**: `add-invoice-footer__saved-info`
- **Content**: "Last saved: [timestamp]" or "Draft saved automatically"
- **Styling**: text-sm text-gray-500

### Right Side - Action Buttons
- **Purpose**: Cancel and send invoice actions
- **Semantic Class**: `add-invoice-footer__actions`
- **Layout**: Horizontal button group

#### Cancel Button
- **Type**: Secondary/outline button
- **Text**: "Cancel"
- **Semantic Class**: `add-invoice-footer__cancel-button`
- **Action**: Navigate back to invoice list
- **Styling**: variant="outline"

#### Send Invoice Button
- **Type**: Primary button
- **Text**: "Send Invoice"
- **Semantic Class**: `add-invoice-footer__send-button`
- **Action**: Create and send invoice
- **Styling**: variant="default" (primary)
- **Icon**: Send icon (optional)

## Save Status Variations

### Auto-save Active
- **Text**: "Draft saved automatically"
- **Icon**: Check icon (optional)
- **Color**: Green text

### Last Save Time
- **Text**: "Last saved: 2 minutes ago"
- **Icon**: Clock icon (optional)
- **Color**: Gray text

### Saving in Progress
- **Text**: "Saving..."
- **Icon**: Loading spinner
- **Color**: Blue text

### Save Error
- **Text**: "Save failed. Retrying..."
- **Icon**: Warning icon
- **Color**: Red text

## Button States

### Cancel Button
- **Default**: Outline style
- **Hover**: Darker outline
- **Focus**: Clear focus ring
- **Disabled**: Grayed out (when sending)

### Send Invoice Button
- **Default**: Primary style
- **Hover**: Darker primary
- **Focus**: Clear focus ring
- **Loading**: Show spinner, disable button
- **Disabled**: When form invalid or sending

## Responsive Behavior

### Desktop
- **Layout**: Full width with space-between
- **Buttons**: Side by side
- **Text**: Full save status text

### Tablet
- **Layout**: Same as desktop
- **Buttons**: Side by side
- **Text**: Abbreviated save status

### Mobile
- **Layout**: Stacked or compact
- **Buttons**: Side by side (if space allows)
- **Text**: "Saved" or timestamp only

## Implementation Notes

### Positioning
- Use `position: sticky` or `position: fixed`
- Ensure proper z-index layering
- Account for form section boundaries

### Auto-save Integration
- Update save status on form changes
- Show loading states during save
- Handle save errors gracefully

### Button Actions
- **Cancel**: Navigate back with confirmation if unsaved changes
- **Send**: Validate form, create invoice, redirect to detail page

### Accessibility
- Include proper ARIA labels
- Support keyboard navigation
- Add focus management
- Include screen reader announcements for save status

### State Management
- Track form changes for unsaved warning
- Manage loading states
- Handle validation errors
- Update save status in real-time 