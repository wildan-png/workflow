# PRD Workflow - Invoice Management System

A modern Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui components for comprehensive invoice management.

## 🚀 Features

### Core Functionality
- **Invoice Management**: Create, view, edit, and delete invoices
- **Customer Management**: Manage customer information and relationships
- **Product Catalog**: Maintain product inventory with pricing
- **Real-time Preview**: Live preview of invoices as you create them
- **Cloud Database**: Supabase integration for data persistence
- **Responsive Design**: Works seamlessly on desktop and mobile

### Invoice Features
- **Dynamic Product Selection**: Add products with thumbnails and pricing
- **Discount & Coupon System**: Apply percentage or fixed amount discounts
- **Tax Calculation**: Automatic tax calculations
- **Additional Options**: Terms & conditions, notes, and footer customization
- **Multiple Currencies**: Support for USD, EUR, GBP, JPY, CAD, AUD
- **Status Tracking**: Track invoice status (draft, sent, paid, etc.)

### User Experience
- **Modern UI**: Clean, intuitive interface using shadcn/ui components
- **Dark/Light Mode**: Dual theme support
- **Loading States**: Smooth loading experiences
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Layout**: Optimized for all screen sizes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wildan-png/workflow.git
   cd workflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following database tables:

- **customers**: Customer information (name, email, etc.)
- **products**: Product catalog (name, price, image, etc.)
- **invoices**: Invoice headers (subject, customer, totals, etc.)
- **invoice_products**: Invoice line items (products, quantities, prices)

## 📁 Project Structure

```
src/
├── app/
│   ├── add-invoice/          # Invoice creation page
│   ├── invoice-list/         # Invoice listing and details
│   ├── api/                  # API routes
│   └── components/           # Component documentation
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── navigation.tsx        # Navigation component
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── supabase-db.ts       # Database operations
│   └── utils.ts             # Utility functions
└── docs/                    # Documentation and layout plans
```

## 🔧 API Endpoints

- `GET /api/invoices` - Fetch all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/[id]` - Fetch specific invoice
- `DELETE /api/invoices/[id]` - Delete invoice
- `GET /api/customers` - Fetch all customers
- `GET /api/products` - Fetch all products

## 🎨 Design System

The application uses a comprehensive design system built on shadcn/ui components:

- **Semantic Class Naming**: BEM-style classes for easy targeting
- **Component Hierarchy**: Structured component organization
- **Theme Support**: Dark and light mode compatibility
- **Accessibility**: WCAG compliant components

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/wildan-png/workflow/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔄 Recent Updates

### Latest Release (v1.0.0)
- ✅ Complete Supabase integration
- ✅ Full invoice CRUD operations
- ✅ Real-time data synchronization
- ✅ Fixed data mapping issues
- ✅ Improved error handling
- ✅ Enhanced user experience

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**
