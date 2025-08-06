# Activity Log Section

## Overview
Timeline of invoice events and actions showing the complete history of the invoice.

## Semantic Class
`activity-log`

## Position
- Below notes section
- Bottom of side panel (right column)
- Within side panel

## Visual Design
- **Background**: White background with subtle border
- **Layout**: Timeline with events and timestamps
- **Typography**: Clear event descriptions and dates
- **Icons**: Event type icons for visual identification

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Activity Log                                                 │
├─────────────────────────────────────────────────────────────┤
│ 🆕 Invoice Created                    Jan 10, 2024 09:15   │
│ 📧 Invoice Sent                       Jan 10, 2024 14:30   │
│ 👁️  Invoice Viewed                    Jan 12, 2024 11:45   │
│ 💰 Payment Received                   Jan 15, 2024 16:20   │
│ ✅ Invoice Paid                       Jan 15, 2024 16:20   │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### Activity Events
- **Event Icon**: Visual indicator of event type
- **Event Description**: What happened
- **Timestamp**: When the event occurred
- **User**: Who performed the action (if applicable)

### Event Types
- **Created**: Invoice was created
- **Sent**: Invoice was sent to customer
- **Viewed**: Customer viewed the invoice
- **Payment**: Payment was received
- **Paid**: Invoice was marked as paid
- **Edited**: Invoice was modified
- **Deleted**: Invoice was deleted

## Components
- Card container with header
- Timeline list with events
- Event icons and descriptions
- Timestamp formatting
- Scrollable content area

## Data Structure
```typescript
interface ActivityEvent {
  id: string;
  type: 'created' | 'sent' | 'viewed' | 'payment' | 'paid' | 'edited' | 'deleted';
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

interface ActivityLog {
  events: ActivityEvent[];
}
```

## Event Icons
```javascript
const eventIcons = {
  created: "🆕",
  sent: "📧",
  viewed: "👁️",
  payment: "💰",
  paid: "✅",
  edited: "✏️",
  deleted: "🗑️"
};
```

## Timeline Formatting
```javascript
const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
```

## Responsive Behavior
- **Desktop**: Full-width in side panel
- **Tablet**: Full-width in side panel
- **Mobile**: Full-width when stacked

## Implementation Notes
- Implement proper date formatting
- Handle timezone conversions
- Consider pagination for long activity logs
- Ensure proper accessibility
- Add loading states for activity fetching
- Consider real-time updates 