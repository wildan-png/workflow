import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Invoice {
  id: string
  invoice_number: string
  subject?: string
  customer_id?: string
  customer_name?: string
  customer_email?: string
  due_date?: string
  currency: string
  subtotal: number
  tax: number
  discount: number
  total: number
  status: string
  notes?: string
  terms?: string
  footer?: string
  coupon_code?: string
  discount_type?: string
  discount_amount?: number
  created_at: string
  updated_at: string
}

export interface InvoiceProduct {
  id: string
  invoice_id: string
  product_id: string
  product_name: string
  product_image: string
  price: number
  quantity: number
  tax: number
  subtotal: number
}

export interface Customer {
  id: string
  name: string
  email: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  created_at: string
} 