import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Database file path
const dbPath = path.join(process.cwd(), 'invoices.db');

// Database instance
let db: Database | null = null;

// Initialize database
export async function initDatabase() {
  if (db) return db;
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoiceNumber TEXT NOT NULL,
      subject TEXT,
      customerId TEXT,
      customerName TEXT,
      customerEmail TEXT,
      dueDate TEXT,
      currency TEXT DEFAULT 'USD',
      subtotal REAL DEFAULT 0,
      tax REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      total REAL DEFAULT 0,
      status TEXT DEFAULT 'draft',
      notes TEXT,
      terms TEXT,
      footer TEXT,
      couponCode TEXT,
      discountType TEXT,
      discountAmount REAL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invoice_products (
      id TEXT PRIMARY KEY,
      invoiceId TEXT NOT NULL,
      productId TEXT NOT NULL,
      productName TEXT NOT NULL,
      productImage TEXT,
      price REAL NOT NULL,
      quantity INTEGER DEFAULT 1,
      tax REAL DEFAULT 0,
      subtotal REAL NOT NULL,
      FOREIGN KEY (invoiceId) REFERENCES invoices (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert sample data if tables are empty
  const customerCount = await db.get('SELECT COUNT(*) as count FROM customers');
  if (customerCount.count === 0) {
    await db.exec(`
      INSERT INTO customers (id, name, email) VALUES
        ('1', 'John Doe', 'john@example.com'),
        ('2', 'Jane Smith', 'jane@example.com'),
        ('3', 'Bob Johnson', 'bob@example.com');
    `);
  }

  const productCount = await db.get('SELECT COUNT(*) as count FROM products');
  if (productCount.count === 0) {
    await db.exec(`
      INSERT INTO products (id, name, price, image) VALUES
        ('1', 'Website Design', 800, '🎨'),
        ('2', 'Frontend Development', 400, '💻'),
        ('3', 'SEO Optimization', 300, '📈');
    `);
  }

  return db;
}

// Get database instance
export async function getDatabase() {
  if (!db) {
    await initDatabase();
  }
  return db;
}

// Invoice types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  subject?: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  dueDate?: string;
  currency: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  notes?: string;
  terms?: string;
  footer?: string;
  couponCode?: string;
  discountType?: string;
  discountAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceProduct {
  id: string;
  invoiceId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  tax: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  createdAt: string;
}

// Database operations
export async function saveInvoice(invoiceData: {
  subject: string;
  selectedCustomer: string;
  dueDate: string;
  currency: string;
  selectedProducts: any[];
  notesContent: string;
  termsContent: string;
  footerContent: string;
  couponCode: string;
  discountType: string;
  discountAmount: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}) {
  const db = await getDatabase();
  
  // Generate invoice ID and number
  const invoiceId = `INV-${Date.now()}`;
  const invoiceNumber = `INV-2024-${String(Date.now()).slice(-6)}`;
  
  // Get customer info
  const customer = await db.get('SELECT * FROM customers WHERE id = ?', [invoiceData.selectedCustomer]);
  
  // Insert invoice
  await db.run(`
    INSERT INTO invoices (
      id, invoiceNumber, subject, customerId, customerName, customerEmail,
      dueDate, currency, subtotal, tax, discount, total, status,
      notes, terms, footer, couponCode, discountType, discountAmount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    invoiceId, invoiceNumber, invoiceData.subject, invoiceData.selectedCustomer,
    customer?.name, customer?.email, invoiceData.dueDate, invoiceData.currency,
    invoiceData.subtotal, invoiceData.tax, invoiceData.discount, invoiceData.total,
    'sent', invoiceData.notesContent, invoiceData.termsContent, invoiceData.footerContent,
    invoiceData.couponCode, invoiceData.discountType, parseFloat(invoiceData.discountAmount) || 0
  ]);

  // Insert invoice products
  for (const product of invoiceData.selectedProducts) {
    await db.run(`
      INSERT INTO invoice_products (
        id, invoiceId, productId, productName, productImage, price, quantity, tax, subtotal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      `${invoiceId}-${product.id}`, invoiceId, product.id, product.name,
      product.image, product.price, product.quantity, product.tax,
      product.price * product.quantity
    ]);
  }

  return { invoiceId, invoiceNumber };
}

export async function getInvoices() {
  const db = await getDatabase();
  return await db.all(`
    SELECT * FROM invoices 
    ORDER BY createdAt DESC
  `);
}

export async function getInvoiceById(id: string) {
  const db = await getDatabase();
  const invoice = await db.get('SELECT * FROM invoices WHERE id = ?', [id]);
  if (!invoice) return null;
  
  const products = await db.all('SELECT * FROM invoice_products WHERE invoiceId = ?', [id]);
  return { ...invoice, products };
}

export async function getCustomers() {
  const db = await getDatabase();
  return await db.all('SELECT * FROM customers ORDER BY name');
}

export async function getProducts() {
  const db = await getDatabase();
  return await db.all('SELECT * FROM products ORDER BY name');
} 