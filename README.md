# PRD Workflow - Next.js Project

A modern Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui components. This project provides a solid foundation for building beautiful web applications with a comprehensive component library.

## 🚀 Features

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Dark Mode Support** - Built-in theme switching
- **ESLint** - Code quality and consistency
- **Responsive Design** - Mobile-first approach

## 📦 Available Components

This project includes all major shadcn/ui components:

### UI Components
- Button, Badge, Avatar
- Card, Separator, Skeleton
- Progress, Slider
- Tabs, Accordion, Collapsible

### Form Components
- Input, Textarea, Label
- Checkbox, Radio Group, Switch, Toggle
- Select, Form
- Dialog, Alert Dialog

### Navigation & Layout
- Navigation Menu, Menubar
- Dropdown Menu, Context Menu
- Command, Pagination
- Sheet, Drawer

### Data Display
- Table, Calendar
- Carousel, Aspect Ratio
- Alert, Tooltip, Hover Card
- Popover

### Advanced
- Resizable, Scroll Area
- Sonner (Toast notifications)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd prd-workflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## 🎯 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── ui/            # shadcn/ui components
│       └── index.ts   # Component exports
└── lib/               # Utility functions
    └── utils.ts       # shadcn/ui utilities
```

## 🎨 Customization

### Theme Customization
Edit `src/app/globals.css` to customize:
- Color scheme
- Typography
- Spacing
- Border radius
- Shadows

### Component Styling
All components use CSS variables for consistent theming. You can override these in `globals.css` or use Tailwind's arbitrary value syntax.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and shadcn/ui
