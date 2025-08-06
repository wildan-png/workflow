# Add Invoice Page Layout

## Overview
Form page for creating new invoices with two-column layout showing form sections on the left and live preview on the right.

## Layout Structure
```
┌─────────────────────────────────────┐
│ 1. Sticky Navigation (Custom)       │
│ [Logo] | "Add Invoice" | [Help] [X] │
├─────────────────────────────────────┤
│ 2. Main Content (Two-Column)        │
│ ┌─────────────────┬───────────────┐ │
│ │ Form Sections   │ Live Preview  │ │
│ │ (Left - 70%)    │ (Right - 30%) │ │
│ │                 │               │ │
│ │ • Invoice       │ • Preview     │ │
│ │   Details       │   Header      │ │
│ │ • Product       │ • Invoice     │ │
│ │   Selection     │   Preview     │ │
│ │ • Additional    │ • Preview     │ │
│ │   Options       │   Options     │ │
│ │                 │               │ │
│ │ ┌─────────────┐ │               │ │
│ │ │ Sticky      │ │               │ │
│ │ │ Footer      │ │               │ │
│ │ │ [Last Saved]│ │               │ │
│ │ │ [Cancel]    │ │               │ │
│ │ │ [Send]      │ │               │ │
│ │ └─────────────┘ │               │ │
│ └─────────────────┴───────────────┘ │
└─────────────────────────────────────┘
```

## Page Sections

### 1. [Sticky Navigation](./sections/sticky-navigation.md)
- **Purpose**: Custom navigation for add invoice page
- **Semantic Class**: `add-invoice-navigation`
- **Position**: Fixed at top of viewport
- **Content**: [View Detailed Documentation](./sections/sticky-navigation.md)

### 2. [Main Content](./sections/main-content.md)
- **Purpose**: Two-column layout container
- **Semantic Class**: `add-invoice-content`
- **Position**: Below navigation
- **Content**: [View Detailed Documentation](./sections/main-content.md)

#### 2.1 [Form Sections (Left Column)](./sections/form-sections/)
- **Purpose**: Invoice creation form
- **Semantic Class**: `add-invoice-form`
- **Position**: Left side of main content
- **Content**: [View Detailed Documentation](./sections/form-sections/)

##### 2.1.1 [Invoice Details](./sections/form-sections/invoice-details.md)
- **Purpose**: Basic invoice information
- **Semantic Class**: `invoice-details`
- **Content**: [View Detailed Documentation](./sections/form-sections/invoice-details.md)

##### 2.1.2 [Product Selection](./sections/form-sections/product-selection.md)
- **Purpose**: Product list and management
- **Semantic Class**: `product-selection`
- **Content**: [View Detailed Documentation](./sections/form-sections/product-selection.md)

##### 2.1.3 [Additional Options](./sections/form-sections/additional-options.md)
- **Purpose**: Expandable optional sections
- **Semantic Class**: `additional-options`
- **Content**: [View Detailed Documentation](./sections/form-sections/additional-options.md)

##### 2.1.4 [Sticky Footer](./sections/form-sections/sticky-footer.md)
- **Purpose**: Save status and action buttons
- **Semantic Class**: `add-invoice-footer`
- **Position**: Sticky to bottom of form section
- **Content**: [View Detailed Documentation](./sections/form-sections/sticky-footer.md)

#### 2.2 [Live Preview (Right Column)](./sections/live-preview/)
- **Purpose**: Real-time invoice preview
- **Semantic Class**: `live-preview`
- **Position**: Right side of main content
- **Content**: [View Detailed Documentation](./sections/live-preview/)

##### 2.2.1 [Preview Header](./sections/live-preview/preview-header.md)
- **Purpose**: Preview controls and options
- **Semantic Class**: `preview-header`
- **Content**: [View Detailed Documentation](./sections/live-preview/preview-header.md)

##### 2.2.2 [Preview Content](./sections/live-preview/preview-content.md)
- **Purpose**: Invoice preview display
- **Semantic Class**: `preview-content`
- **Content**: [View Detailed Documentation](./sections/live-preview/preview-content.md)

## Component Requirements

### Required UI Components
- **Navigation**: Custom header with logo, page title, help, and close buttons
- **Form Elements**: Inputs, selects, date pickers, textareas, checkboxes
- **Product Table**: Dynamic table with add/remove functionality
- **Preview Panel**: Expandable/collapsible preview area
- **Sticky Footer**: Fixed footer with save status and actions

### Required Icons
- **Help**: Question mark or help icon
- **Close**: X or close icon
- **Add**: Plus icon
- **Remove**: Trash or minus icon
- **Expand/Collapse**: Chevron icons
- **Save**: Check or save icon

## File Structure
```
src/app/add-invoice/
├── page.tsx (main page component)
└── components/
    ├── invoice-details.tsx
    ├── product-selection.tsx
    ├── additional-options.tsx
    ├── sticky-footer.tsx
    └── live-preview.tsx
```

## Navigation Flow
- **Entry Point**: Invoice list page "Create Invoice" button
- **Exit Points**: 
  - Cancel button → Return to invoice list
  - Close button → Return to invoice list
  - Send Invoice → Create invoice and redirect to detail page

## Implementation Guidelines
- Use semantic class naming (BEM pattern)
- Implement responsive design (mobile-first)
- Add auto-save functionality
- Include form validation
- Support keyboard navigation
- Add loading states for actions 