# Attachments Section

## Overview
File attachments associated with the invoice including uploads and downloads.

## Semantic Class
`attachments`

## Position
- Below terms and conditions
- Bottom of invoice overview (left column)
- Within invoice overview (left column)

## Visual Design
- **Background**: White background with subtle border
- **Layout**: List of file attachments with actions
- **Typography**: Clear file names and descriptions
- **Icons**: File type icons for visual identification

## Content Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Attachments                                                  │
├─────────────────────────────────────────────────────────────┤
│ 📄 invoice-INV-001.pdf                    [Download] [Delete] │
│ 📋 contract-agreement.docx                [Download] [Delete] │
│ 🖼️  project-screenshot.png               [Download] [Delete] │
│                                                             │
│ [+ Upload New File]                                        │
└─────────────────────────────────────────────────────────────┘
```

## Content Elements

### File List
- **File Icon**: Visual indicator of file type
- **File Name**: Display name of the attachment
- **File Size**: Size in KB/MB/GB
- **Upload Date**: When file was uploaded
- **Actions**: Download and delete buttons

### Upload Section
- **Upload Button**: Add new file attachment
- **File Types**: Supported file types
- **Size Limits**: Maximum file size restrictions

## Components
- Card container with header
- File list with icons and actions
- Upload button with file picker
- File type icons
- Action buttons (Download, Delete)

## Data Structure
```typescript
interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  url: string;
}

interface AttachmentsSection {
  files: Attachment[];
  maxFileSize: number;
  allowedTypes: string[];
}
```

## File Type Icons
```javascript
const fileTypeIcons = {
  pdf: "📄",
  doc: "📋",
  docx: "📋",
  xls: "📊",
  xlsx: "📊",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
  default: "📎"
};
```

## Supported File Types
- **Documents**: PDF, DOC, DOCX, XLS, XLSX
- **Images**: PNG, JPG, JPEG
- **Other**: ZIP, RAR (if needed)

## Responsive Behavior
- **Desktop**: Full-width list layout
- **Tablet**: Full-width list layout
- **Mobile**: Stacked layout with full-width buttons

## Implementation Notes
- Handle file upload with proper validation
- Implement file download functionality
- Ensure proper file type detection
- Handle large file uploads gracefully
- Consider file preview functionality
- Implement proper error handling 