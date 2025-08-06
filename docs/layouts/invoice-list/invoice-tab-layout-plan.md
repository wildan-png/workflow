# Invoice List Page Layout Reference

## Overview
This document defines the layout structure for the Invoice List page and serves as a reference for consistent design patterns across multiple screens.

## Layout Structure

```
┌─────────────────────────────────────┐
│ 1. Stacked Main Navigation          │
│ ├── Global Top Bar (fixed)          │
│ └── Primary Navigation (horizontal) │
├─────────────────────────────────────┤
│ 2. Body                             │
│ ├── Header for Title                │
│ ├── Tab                     
│     │ Overview │ Quotation │ Invoice (active) │                   │
│                               └── Invoice content                 │
│                                   ├── Filter content              │
│                                   ├── Table Header                │
│                                   ├── Table Body                  │
│                                   └── Table Load More             │
└───────────────────────────────────────────────────────────────────┘
```

## Section Details

### 1. Stacked Main Navigation
#### 1.1 [Global Top Bar (fixed)](./sections/global-top-bar.md)
- **Purpose**: Fixed header at the top of the page
- **Semantic Class**: `global-top-bar`
- **Position**: Fixed at top
- **Content**: [View Detailed Documentation](./sections/global-top-bar.md)

#### 1.2 [Primary Navigation (horizontal)](./sections/primary-navigation.md)
- **Purpose**: Horizontal navigation menu
- **Semantic Class**: `primary-navigation`
- **Position**: Below global top bar
- **Content**: [View Detailed Documentation](./sections/primary-navigation.md)

### 2. Body
#### 2.1 [Header for Title](./sections/page-header.md)
- **Purpose**: Page title and description
- **Semantic Class**: `page-header`
- **Position**: Below primary navigation
- **Content**: [View Detailed Documentation](./sections/page-header.md)

#### 2.2 [Table section](./sections/table-section.md)
- **Purpose**: Main data table with load more functionality and integrated filter content
- **Semantic Class**: `table-section`
- **Position**: Below page header
- **Content**: [View Detailed Documentation](./sections/table-section.md)

## Semantic Class Naming Convention

### BEM Pattern
- **Block**: Main component (e.g., `invoice-table`)
- **Element**: Child elements (e.g., `invoice-table__header`)
- **Modifier**: Variations (e.g., `invoice-table__row--selected`)

### Class Structure
```
invoice-list-page
├── stacked-main-navigation
│   ├── global-top-bar
│   └── primary-navigation
└── body
    ├── page-header
    └── table-section
        ├── table-section__filter-content
        │   ├── table-section__search
        │   ├── table-section__filters
        │   └── table-section__actions
        ├── table-section__table-content
        │   ├── table-section__header
        │   ├── table-section__row
        │   └── table-section__load-more
```

## Component Requirements

### ShadCN Components Used
- `Card` - For container sections
- `Button` - For actions and load more
- `Input` - For search and filters
- `Table` - For invoice data display
- `Badge` - For status indicators
- `Select` - For dropdown filters

### Responsive Considerations
- Mobile-first approach
- Collapsible navigation on mobile
- Stacked layout for small screens
- Horizontal layout for desktop

## Usage Guidelines

1. **Consistency**: Use this layout pattern for all list pages
2. **Semantic Naming**: Always use BEM-style class names
3. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
4. **Performance**: Lazy load table data with load more functionality
5. **State Management**: Handle loading states and error states

## Future Extensions

This layout can be adapted for:
- User List pages
- Product List pages
- Order List pages
- Any data table with pagination/load more

## File Structure
```
src/app/invoice-list/
├── page.tsx (main page component)
├── components/
│   ├── table-section.tsx
│   └── page-header.tsx
└── types/
    └── invoice.ts
``` 