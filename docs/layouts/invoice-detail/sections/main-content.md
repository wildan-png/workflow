# Main Content Section

## Overview
Two-column layout container that holds the invoice overview (left) and side panel (right) sections.

## Semantic Class
`main-content`

## Position
- Below invoice header
- Full width of page
- Contains all detailed invoice information

## Visual Design
- **Layout**: CSS Grid with two columns
- **Left Column**: 70% width (Invoice Overview)
- **Right Column**: 30% width (Side Panel)
- **Gap**: 24px spacing between columns
- **Background**: White or light background

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────┬───────────────┐                         │
│ │ Invoice Overview│ Side Panel    │                         │
│ │ (Left - 70%)    │ (Right - 30%) │                         │
│ │                 │               │                         │
│ │ • Subject       │ • Notes       │                         │
│ │ • Billing       │ • Activity    │                         │
│ │ • Line Items    │   Log         │                         │
│ │ • Totals        │               │                         │
│ │ • Terms         │               │                         │
│ │ • Attachments   │               │                         │
│ └─────────────────┴───────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## Grid Layout
```css
.main-content {
  display: grid;
  grid-template-columns: 1fr 350px; /* or 70% 30% */
  gap: 24px;
  padding: 24px;
}
```

## Content Sections

### Left Column: Invoice Overview
- **Purpose**: Complete invoice details and breakdown
- **Semantic Class**: `invoice-overview`
- **Width**: 70% of main content
- **Sections**: Subject, Billing, Line Items, Totals, Terms, Attachments

### Right Column: Side Panel
- **Purpose**: Notes and activity tracking
- **Semantic Class**: `side-panel`
- **Width**: 30% of main content
- **Sections**: Notes, Activity Log

## Responsive Behavior

### Desktop (1024px+)
- **Layout**: Two-column grid
- **Left Column**: 70% width
- **Right Column**: 30% width
- **Gap**: 24px

### Tablet (768px - 1023px)
- **Layout**: Stacked columns
- **Left Column**: Full width
- **Right Column**: Full width below
- **Gap**: 16px vertical

### Mobile (< 768px)
- **Layout**: Single column
- **Both Columns**: Full width
- **Gap**: 12px vertical
- **Padding**: Reduced padding

## Implementation Notes
- Use CSS Grid for responsive layout
- Ensure proper content flow on mobile
- Maintain consistent spacing across breakpoints
- Handle content overflow gracefully
- Consider sticky positioning for side panel on desktop 