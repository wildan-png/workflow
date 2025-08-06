# Invoice Detail Page Layout

## Overview
Detailed view page for individual invoices with two-column layout showing complete invoice information and side panel for notes and activity tracking.

## Layout Structure
```
┌─────────────────────────────────────┐
│ 1. Sticky Navigation                │
│ ├── Global Top Bar (fixed)          │
│ └── Primary Navigation (horizontal) │
├─────────────────────────────────────┤
│ 2. Breadcrumb Navigation            │
│ Home > Invoices > [Invoice Number]  │
├─────────────────────────────────────┤
│ 3. Invoice Header                   │
│ ├── Invoice Number & Status         │
│ ├── Amount & Currency               │
│ └── Action Buttons                  │
├─────────────────────────────────────┤
│ 4. Main Content (Two-Column)        │
│ ┌─────────────────┬───────────────┐ │
│ │ Invoice Overview│ Side Panel    │ │
│ │ (Left - 70%)    │ (Right - 30%) │ │
│ │                 │               │ │
│ │ • Subject       │ • Notes       │ │
│ │ • Billing       │ • Activity    │ │
│ │ • Line Items    │   Log         │ │
│ │ • Totals        │               │ │
│ │ • Terms         │               │ │
│ │ • Attachments   │               │ │
│ └─────────────────┴───────────────┘ │
└─────────────────────────────────────┘
```

## Page Sections

### 1. [Sticky Navigation](./sections/sticky-navigation.md)
- **Purpose**: Same navigation as invoice list page
- **Semantic Class**: `sticky-navigation`
- **Position**: Fixed at top of viewport
- **Content**: [View Detailed Documentation](./sections/sticky-navigation.md)

### 2. [Breadcrumb Navigation](./sections/breadcrumb-navigation.md)
- **Purpose**: Navigation path and return to list
- **Semantic Class**: `breadcrumb-navigation`
- **Position**: Below navigation, above header
- **Content**: [View Detailed Documentation](./sections/breadcrumb-navigation.md)

### 3. [Invoice Header](./sections/invoice-header.md)
- **Purpose**: Key invoice information and actions
- **Semantic Class**: `invoice-header`
- **Position**: Below breadcrumb
- **Content**: [View Detailed Documentation](./sections/invoice-header.md)

### 4. [Main Content](./sections/main-content.md)
- **Purpose**: Two-column layout container
- **Semantic Class**: `main-content`
- **Position**: Below invoice header
- **Content**: [View Detailed Documentation](./sections/main-content.md)

#### 4.1 [Invoice Overview (Left Column)](./sections/invoice-overview/)
- **Purpose**: Complete invoice details and breakdown
- **Semantic Class**: `invoice-overview`
- **Position**: Left side of main content
- **Content**: [View Detailed Documentation](./sections/invoice-overview/)

##### 4.1.1 [Subject Header](./sections/invoice-overview/subject-header.md)
- **Purpose**: Invoice subject/description (conditional display)
- **Semantic Class**: `subject-header`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/subject-header.md)

##### 4.1.2 [Billing Details](./sections/invoice-overview/billing-details.md)
- **Purpose**: Customer and invoice information
- **Semantic Class**: `billing-details`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/billing-details.md)

##### 4.1.3 [Line Items Table](./sections/invoice-overview/line-items-table.md)
- **Purpose**: Invoice items breakdown
- **Semantic Class**: `line-items-table`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/line-items-table.md)

##### 4.1.4 [Totals Section](./sections/invoice-overview/totals-section.md)
- **Purpose**: Subtotal, discount, tax, and final total
- **Semantic Class**: `totals-section`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/totals-section.md)

##### 4.1.5 [Terms & Conditions](./sections/invoice-overview/terms-conditions.md)
- **Purpose**: Payment terms and conditions
- **Semantic Class**: `terms-conditions`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/terms-conditions.md)

##### 4.1.6 [Attachments](./sections/invoice-overview/attachments.md)
- **Purpose**: File attachments and uploads
- **Semantic Class**: `attachments`
- **Content**: [View Detailed Documentation](./sections/invoice-overview/attachments.md)

#### 4.2 [Side Panel (Right Column)](./sections/side-panel/)
- **Purpose**: Notes and activity tracking
- **Semantic Class**: `side-panel`
- **Position**: Right side of main content
- **Content**: [View Detailed Documentation](./sections/side-panel/)

##### 4.2.1 [Notes Section](./sections/side-panel/notes-section.md)
- **Purpose**: Add and edit invoice notes
- **Semantic Class**: `notes-section`
- **Content**: [View Detailed Documentation](./sections/side-panel/notes-section.md)

##### 4.2.2 [Activity Log](./sections/side-panel/activity-log.md)
- **Purpose**: Timeline of invoice events and actions
- **Semantic Class**: `activity-log`
- **Content**: [View Detailed Documentation](./sections/side-panel/activity-log.md)

## Semantic Class Naming Convention

### BEM Pattern
- **Block**: Main component (e.g., `invoice-detail`)
- **Element**: Child elements (e.g., `invoice-detail__header`)
- **Modifier**: Variations (e.g., `invoice-detail__status--paid`)

### Class Structure
```
invoice-detail-page
├── sticky-navigation
│   ├── global-top-bar
│   └── primary-navigation
├── breadcrumb-navigation
├── invoice-header
│   ├── invoice-header__number
│   ├── invoice-header__status
│   ├── invoice-header__amount
│   └── invoice-header__actions
└── main-content
    ├── invoice-overview
    │   ├── subject-header
    │   ├── billing-details
    │   ├── line-items-table
    │   ├── totals-section
    │   ├── terms-conditions
    │   └── attachments
    └── side-panel
        ├── notes-section
        └── activity-log
```

## Component Requirements

### ShadCN Components Used
- `Card` - For container sections
- `Button` - For actions and navigation
- `Badge` - For status indicators
- `Table` - For line items and activity log
- `Textarea` - For notes input
- `Input` - For form fields
- `Select` - For dropdown selections
- `Breadcrumb` - For navigation path

### Responsive Considerations
- **Desktop**: Full two-column layout
- **Tablet**: Stacked layout (side panel below)
- **Mobile**: Single column, side panel at bottom

## File Structure
```
src/app/invoice-list/
├── page.tsx (list page)
├── [invoiceId]/
│   └── page.tsx (detail page)
├── components/
│   ├── invoice-header.tsx
│   ├── invoice-overview/
│   │   ├── subject-header.tsx
│   │   ├── billing-details.tsx
│   │   ├── line-items-table.tsx
│   │   ├── totals-section.tsx
│   │   ├── terms-conditions.tsx
│   │   └── attachments.tsx
│   └── side-panel/
│       ├── notes-section.tsx
│       └── activity-log.tsx
└── types/
    └── invoice.ts
```

## Navigation Flow
- **Entry Point**: Click "View Details" in invoice list dropdown
- **URL Pattern**: `/invoice-list/[invoiceId]`
- **Return Path**: Breadcrumb "Invoices" link or browser back
- **Deep Linking**: Direct URL access supported

## Implementation Guidelines
- Use dynamic routing with Next.js App Router
- Implement proper 404 handling for invalid invoice IDs
- Ensure responsive design for all screen sizes
- Maintain consistent styling with invoice list page
- Use proper loading states and error handling
- Implement proper data fetching and caching

## Status
- **Documentation**: ✅ Complete
- **Implementation**: 🟡 Planned
- **Testing**: 🟡 Pending 