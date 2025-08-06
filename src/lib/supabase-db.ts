import { supabase } from './supabase'

// Invoice operations
export async function saveInvoice(invoiceData: {
  subject: string
  selectedCustomer: string
  dueDate: string
  currency: string
  selectedProducts: any[]
  notesContent: string
  termsContent: string
  footerContent: string
  couponCode: string
  discountType: string
  discountAmount: string
  subtotal: number
  tax: number
  discount: number
  total: number
}) {
  try {
    // Get customer info
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('id', invoiceData.selectedCustomer)
      .single()

    // Generate invoice ID and number
    const invoiceId = `INV-${Date.now()}`
    const invoiceNumber = `INV-2024-${String(Date.now()).slice(-6)}`

    // Insert invoice
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        id: invoiceId,
        invoice_number: invoiceNumber,
        subject: invoiceData.subject,
        customer_id: invoiceData.selectedCustomer,
        customer_name: customer?.name,
        customer_email: customer?.email,
        due_date: invoiceData.dueDate,
        currency: invoiceData.currency,
        subtotal: invoiceData.subtotal,
        tax: invoiceData.tax,
        discount: invoiceData.discount,
        total: invoiceData.total,
        status: 'sent',
        notes: invoiceData.notesContent,
        terms: invoiceData.termsContent,
        footer: invoiceData.footerContent,
        coupon_code: invoiceData.couponCode,
        discount_type: invoiceData.discountType,
        discount_amount: parseFloat(invoiceData.discountAmount) || 0
      })
      .select()
      .single()

    if (invoiceError) throw invoiceError

    // Insert invoice products
    const productsToInsert = invoiceData.selectedProducts.map((product) => ({
      id: `${invoiceId}-${product.id}`,
      invoice_id: invoiceId,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      price: product.price,
      quantity: product.quantity,
      tax: product.tax,
      subtotal: product.price * product.quantity
    }))

    const { error: productsError } = await supabase
      .from('invoice_products')
      .insert(productsToInsert)

    if (productsError) throw productsError

    return { invoiceId, invoiceNumber }
  } catch (error) {
    console.error('Error saving invoice:', error)
    throw error
  }
}

export async function getInvoices() {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching invoices:', error)
    throw error
  }
}

export async function getInvoiceById(id: string) {
  try {
    // Get invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single()

    if (invoiceError) throw invoiceError
    if (!invoice) return null

    // Get invoice products
    const { data: products, error: productsError } = await supabase
      .from('invoice_products')
      .select('*')
      .eq('invoice_id', id)

    if (productsError) throw productsError

    return { ...invoice, products: products || [] }
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function deleteInvoice(id: string) {
  try {
    // Delete invoice products first (due to foreign key constraint)
    const { error: productsError } = await supabase
      .from('invoice_products')
      .delete()
      .eq('invoice_id', id)

    if (productsError) throw productsError

    // Delete the invoice
    const { error: invoiceError } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)

    if (invoiceError) throw invoiceError

    return true
  } catch (error) {
    console.error('Error deleting invoice:', error)
    throw error
  }
}

export async function getCustomers() {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}

export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
} 