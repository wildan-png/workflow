-- Supabase Database Schema for Invoice Management System

-- Create customers table
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create invoices table
CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT NOT NULL,
  subject TEXT,
  customer_id TEXT REFERENCES customers(id),
  customer_name TEXT,
  customer_email TEXT,
  due_date DATE,
  currency TEXT DEFAULT 'USD',
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'draft',
  notes TEXT,
  terms TEXT,
  footer TEXT,
  coupon_code TEXT,
  discount_type TEXT,
  discount_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create invoice_products table
CREATE TABLE invoice_products (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_image TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  tax DECIMAL(10,2) DEFAULT 0,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Insert sample data
INSERT INTO customers (id, name, email) VALUES
  ('1', 'John Doe', 'john@example.com'),
  ('2', 'Jane Smith', 'jane@example.com'),
  ('3', 'Bob Johnson', 'bob@example.com');

INSERT INTO products (id, name, price, image) VALUES
  ('1', 'Website Design', 800.00, '🎨'),
  ('2', 'Frontend Development', 400.00, '💻'),
  ('3', 'SEO Optimization', 300.00, '📈');

-- Create indexes for better performance
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_created_at ON invoices(created_at);
CREATE INDEX idx_invoice_products_invoice_id ON invoice_products(invoice_id);
CREATE INDEX idx_invoice_products_product_id ON invoice_products(product_id);

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_products ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - you can restrict these later)
CREATE POLICY "Allow all operations on customers" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on invoices" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all operations on invoice_products" ON invoice_products FOR ALL USING (true); 