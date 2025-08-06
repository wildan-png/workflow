import { NextRequest, NextResponse } from 'next/server';
import { saveInvoice, getInvoices } from '@/lib/supabase-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await saveInvoice(body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Invoice saved successfully',
      invoiceId: result.invoiceId,
      invoiceNumber: result.invoiceNumber
    });
  } catch (error) {
    console.error('Error saving invoice:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save invoice' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Fetching invoices...');
    const invoices = await getInvoices();
    console.log('Invoices fetched successfully:', invoices.length);
    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch invoices', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 