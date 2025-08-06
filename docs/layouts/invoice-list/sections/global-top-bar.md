# Global Top Bar Section

## Overview
Fixed header at the top of the page that remains visible during scrolling.

## Semantic Class
`global-top-bar`

## Position
- Fixed at top of viewport
- Full width
- Above all other content

## Visual Design
- **Background**: Gray placeholder background
- **Height**: Fixed height (e.g., 64px)
- **Border**: Bottom border for separation
- **Z-index**: High z-index to stay above other content

## Content Structure
┌─────────────────────────────────────────────────────────────┐
│ [Logo] [Workspace Selector] [Search] [User Menu] [Settings] │
└─────────────────────────────────────────────────────────────┘


## Components Needed
- Logo/Brand element
- Workspace selector dropdown
- Search input (expandable/collapsible)
- User avatar and menu
- Settings/Help buttons
- Notification indicator

## Responsive Behavior
- **Desktop**: Full horizontal layout
- **Tablet**: Condensed layout with hamburger menu
- **Mobile**: Minimal layout with essential elements only

## Implementation Notes
- Use `position: fixed` for sticky behavior
- Ensure proper spacing and alignment
- Handle mobile menu toggle functionality
- Consider dark/light theme support