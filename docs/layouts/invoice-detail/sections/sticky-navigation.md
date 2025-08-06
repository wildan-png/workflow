# Sticky Navigation Section

## Overview
Same navigation structure as the invoice list page, providing consistent navigation across the application.

## Semantic Class
`sticky-navigation`

## Position
- Fixed at top of viewport
- Above all other content
- Same structure as invoice list page

## Visual Design
- **Global Top Bar**: Fixed at very top (z-50, 64px height)
- **Primary Navigation**: Fixed below global bar (z-40, 48px height)
- **Background**: Gray placeholder background
- **Border**: Bottom border for separation

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Global Top Bar (fixed)                                      │
│ [Logo] [Account] [Shop] | [Search] | [Mode] [Create] [User] │
├─────────────────────────────────────────────────────────────┤
│ Primary Navigation (fixed)                                  │
│ [Home] [Invoices] [Customers] [Products] [Reports] [Settings] │
└─────────────────────────────────────────────────────────────┘
```

## Components
- Global Top Bar with account/shop selectors
- Primary Navigation with menu items
- Search functionality
- Mode toggle (Pro/Lite)
- Create dropdown
- User avatar and settings

## Responsive Behavior
- **Desktop**: Full horizontal layout
- **Tablet**: Condensed layout with hamburger menu
- **Mobile**: Minimal layout with essential elements only

## Implementation Notes
- Reuse same navigation components from invoice list page
- Maintain consistent styling and behavior
- Ensure proper z-index layering
- Handle mobile menu toggle functionality 