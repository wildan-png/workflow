# Tab Section

## Overview
Tabbed interface that contains Overview, Quotation, and Invoice content tabs.

## Semantic Class
`tab-section`

## Position
- Below page header
- Full width
- Main content area

## Visual Design
- **Background**: Gray placeholder background
- **Layout**: Tab interface with content panels
- **Height**: Flexible based on content

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [Overview Tab] [Quotation Tab] [Invoice Tab (active)]       │
├─────────────────────────────────────────────────────────────┤
│ Tab Content Panel                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Overview: Business metrics and charts                   │ │
│ │ OR                                                      │ │
│ │ Quotation: Quote management table                       │ │
│ │ OR                                                      │ │
│ │ Invoice: Filter + Table with Load More                  │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Tab Structure
- **Overview Tab**: Business overview with revenue metrics and charts
- **Quotation Tab**: Quotation management and listing
- **Invoice Tab**: Invoice data table with filter content and load more functionality

## Components
- Tab navigation (Overview | Quotation | Invoice)
- Tab content panels
- Tab switching functionality

## Responsive Behavior
- **Desktop**: Full tab interface
- **Tablet**: Full tab interface with responsive content
- **Mobile**: Stacked tab content or mobile-friendly tab design

## Implementation Notes
- Use shadcn/ui Tabs component
- Handle tab state management
- Ensure proper content switching
- Maintain responsive design
- Consider tab persistence if needed
- Default to Invoice tab as active