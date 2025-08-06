"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronRight, 
  Home, 
  FileText, 
  Edit, 
  Download, 
  Send, 
  Plus,
  Trash2,
  Upload,
  Settings
} from "lucide-react";

// Mock data for invoice details
const mockInvoiceData = {
  id: "INV-001",
  invoiceNumber: "INV-2024-001",
  status: "paid",
  amount: 1200.00,
  currency: "USD",
  subject: "Website Development Services",
  email: "john.doe@example.com",
  customerName: "John Doe",
  phone: "+1-555-0123",
  billingAddress: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  },
  createdDate: "2024-01-10",
  dueDate: "2024-02-10",
  lastUpdated: "2024-01-15",
  lineItems: [
    {
      id: "item-1",
      description: "Website Design",
      quantity: 1,
      rate: 800.00,
      amount: 800.00
    },
    {
      id: "item-2", 
      description: "Frontend Development",
      quantity: 1,
      rate: 400.00,
      amount: 400.00
    }
  ],
  discount: {
    amount: 120.00,
    percentage: 10
  },
  tax: {
    amount: 91.80,
    percentage: 8.5
  },
  total: 1171.80,
  terms: {
    paymentTerms: "Payment is due within 30 days of invoice date",
    lateFees: "1.5% monthly interest",
    paymentMethods: ["Bank Transfer", "Credit Card", "Check"]
  },
  attachments: [
    {
      id: "att-1",
      fileName: "invoice-INV-001.pdf",
      fileType: "pdf",
      fileSize: 245,
      uploadDate: "2024-01-10"
    },
    {
      id: "att-2",
      fileName: "contract-agreement.docx", 
      fileType: "docx",
      fileSize: 156,
      uploadDate: "2024-01-10"
    }
  ],
  notes: "Customer requested early delivery. Will need to expedite shipping.",
  activityLog: [
    {
      id: "act-1",
      type: "created",
      description: "Invoice Created",
      timestamp: "2024-01-10 09:15"
    },
    {
      id: "act-2", 
      type: "sent",
      description: "Invoice Sent",
      timestamp: "2024-01-10 14:30"
    },
    {
      id: "act-3",
      type: "viewed", 
      description: "Invoice Viewed",
      timestamp: "2024-01-12 11:45"
    },
    {
      id: "act-4",
      type: "payment",
      description: "Payment Received", 
      timestamp: "2024-01-15 16:20"
    },
    {
      id: "act-5",
      type: "paid",
      description: "Invoice Paid",
      timestamp: "2024-01-15 16:20"
    }
  ]
};

export default function InvoiceDetailPage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = use(params);
  const [mounted, setMounted] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [hasNotesChanges, setHasNotesChanges] = useState(false);

  // Fetch invoice data from database
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`);
        const result = await response.json();
        
        if (result.success) {
          // Transform database data to match the expected format
          const transformedInvoice = {
            ...result.invoice,
            invoiceNumber: result.invoice.invoice_number,
            customerEmail: result.invoice.customer_email,
            customerName: result.invoice.customer_name,
            createdAt: result.invoice.created_at,
            updatedAt: result.invoice.updated_at,
            dueDate: result.invoice.due_date,
            lineItems: result.invoice.products || []
          };
          setInvoice(transformedInvoice);
          setNotes(result.invoice.notes || "");
        } else {
          console.error('Failed to fetch invoice:', result.message);
        }
      } catch {
        console.error('Error fetching invoice');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="invoice-detail-page min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Loading invoice...</div>
          <div className="text-gray-500">Please wait while we fetch the invoice details.</div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="invoice-detail-page min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Invoice not found</div>
          <div className="text-gray-500">The invoice you&apos;re looking for doesn&apos;t exist.</div>
          <Button 
            onClick={() => window.location.href = '/invoice-list'} 
            className="mt-4"
          >
            Back to Invoice List
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "unpaid": return "secondary";
      case "pastdue": return "destructive";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    return (
      <span>
        {formattedAmount} <span className="text-gray-400">{currency}</span>
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const eventIcons = {
    created: "🆕",
    sent: "📧", 
    viewed: "👁️",
    payment: "💰",
    paid: "✅",
    edited: "✏️",
    deleted: "🗑️"
  };

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

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    setHasNotesChanges(false);
    // In real app, save to backend
  };

  const handleEditNotes = () => {
    setIsEditingNotes(true);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasNotesChanges(value !== (invoice?.notes || ""));
  };

  return (
    <div className="invoice-detail-page min-h-screen bg-background flex flex-col">
      {/* 1. Sticky Navigation - Same as invoice list */}
      <div className="sticky-navigation">
        {/* Global Top Bar */}
        <div className="global-top-bar fixed top-0 left-0 right-0 z-50 h-16 bg-gray-200 border-b border-gray-300 flex items-center justify-between px-6">
          {/* Left Content */}
          <div className="global-top-bar__left flex items-center space-x-4">
            <div className="global-top-bar__logo font-bold text-lg">Logo</div>
            <div className="global-top-bar__divider w-px h-6 bg-gray-300"></div>
            <Select defaultValue="account-1">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-1">Account 1</SelectItem>
                <SelectItem value="account-2">Account 2</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="shop-1">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Shop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shop-1">Shop 1</SelectItem>
                <SelectItem value="shop-2">Shop 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Middle Content */}
          <div className="global-top-bar__middle flex items-center">
            <div className="global-top-bar__search ">
              <Input
                placeholder="Search..."
                className="w-64 bg-white"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="global-top-bar__right flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="global-top-bar__notification relative">
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              <span className="sr-only">Notifications</span>
              🔔
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="global-top-bar__divider w-px h-6 bg-gray-300"></div>
            <div className="global-top-bar__mode-toggle flex items-center space-x-2">
              <span className="text-sm text-gray-600">Pro</span>
              <Button variant="outline" size="sm">
                Switch to Lite
              </Button>
            </div>
                    <Select defaultValue="invoice" onValueChange={(value) => {
          if (value === "invoice") {
            window.location.href = "/add-invoice";
          }
        }}>
          <SelectTrigger className="global-top-bar__create-button bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="invoice">Create Invoice</SelectItem>
            <SelectItem value="quotation">Create Quotation</SelectItem>
            <SelectItem value="customer">Add Customer</SelectItem>
            <SelectItem value="product">Add Product</SelectItem>
          </SelectContent>
        </Select>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="primary-navigation fixed top-16 left-0 right-0 z-40 h-12 bg-gray-200 border-b border-gray-300 flex items-center px-6">
          <nav className="primary-navigation__menu flex items-center space-x-8">
            <a href="/" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a href="/invoice-list" className="primary-navigation__item flex items-center space-x-2 text-blue-600 font-medium">
              <FileText className="h-4 w-4" />
              <span>Invoices</span>
            </a>
            <a href="/customers" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>Customers</span>
            </a>
            <a href="/products" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>Products</span>
            </a>
            <a href="/reports" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>Reports</span>
            </a>
            <a href="/settings" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* 2. Breadcrumb Navigation */}
      <div className="breadcrumb-navigation pt-32 px-6 py-4">
        <div className="breadcrumb-navigation__path flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="breadcrumb-navigation__link hover:text-gray-900">Home</a>
          <ChevronRight className="breadcrumb-navigation__separator h-4 w-4" />
          <a href="/invoice-list" className="breadcrumb-navigation__link hover:text-gray-900">Invoices</a>
          <ChevronRight className="breadcrumb-navigation__separator h-4 w-4" />
          <span className="breadcrumb-navigation__current text-gray-900">{invoice?.invoiceNumber || 'Loading...'}</span>
        </div>
      </div>

      {/* 3. Invoice Header */}
      <div className="invoice-header px-6 pb-6">
        <Card>
          <CardContent className="p-6">
            <div className="invoice-header__content flex items-center justify-between">
              <div className="invoice-header__info flex items-center space-x-4">
                <div className="invoice-header__details">
                  <h1 className="invoice-header__title text-2xl font-bold">{invoice?.invoiceNumber || 'Loading...'}</h1>
                  <div className="invoice-header__meta flex items-center space-x-2 mt-2">
                    <Badge variant={getStatusBadgeVariant(invoice?.status || 'draft')} className="invoice-header__status">
                      {invoice?.status || 'Loading...'}
                    </Badge>
                    <span className="invoice-header__amount text-xl font-semibold">
                      {invoice?.total ? formatCurrency(invoice.total, invoice.currency) : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="invoice-header__actions flex items-center space-x-3">
                <Button variant="outline" className="invoice-header__action-edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="invoice-header__action-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button className="invoice-header__action-send">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Main Content - Two Column Layout */}
      <div className="main-content px-6 pb-6">
        <div className="main-content__layout grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          
          {/* Left Column: Invoice Overview */}
          <div className="invoice-overview space-y-6">
            
            {/* Subject Header */}
            {invoice.subject && (
              <Card className="subject-header">
                <CardContent className="p-6">
                  <h2 className="subject-header__title text-xl font-semibold">{invoice.subject}</h2>
                </CardContent>
              </Card>
            )}

            {/* Billing Details */}
            <Card className="billing-details">
              <CardHeader className="billing-details__header">
                <CardTitle className="billing-details__title">Billing Details</CardTitle>
              </CardHeader>
              <CardContent className="billing-details__body p-6">
                <div className="billing-details__content grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="billing-details__customer">
                    <h3 className="billing-details__section-title font-semibold mb-3">Customer Information</h3>
                    <div className="billing-details__customer-info space-y-2 text-sm">
                      {invoice.customerEmail && (
                        <div className="billing-details__field">
                          <span className="billing-details__field-label font-medium">Email:</span> 
                          <span className="billing-details__field-value">{invoice.customerEmail}</span>
                        </div>
                      )}
                      {invoice.customerName && (
                        <div className="billing-details__field">
                          <span className="billing-details__field-label font-medium">Name:</span> 
                          <span className="billing-details__field-value">{invoice.customerName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="billing-details__invoice">
                    <h3 className="billing-details__section-title font-semibold mb-3">Invoice Information</h3>
                    <div className="billing-details__invoice-info space-y-2 text-sm">
                      {invoice.createdAt && (
                        <div className="billing-details__field">
                          <span className="billing-details__field-label font-medium">Created:</span> 
                          <span className="billing-details__field-value">{formatDate(invoice.createdAt)}</span>
                        </div>
                      )}
                      {invoice.dueDate && (
                        <div className="billing-details__field">
                          <span className="billing-details__field-label font-medium">Due Date:</span> 
                          <span className="billing-details__field-value">{formatDate(invoice.dueDate)}</span>
                        </div>
                      )}
                      {invoice.updatedAt && (
                        <div className="billing-details__field">
                          <span className="billing-details__field-label font-medium">Last Updated:</span> 
                          <span className="billing-details__field-value">{formatDate(invoice.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items Table */}
            <Card className="line-items-table">
              <CardHeader className="line-items-table__header">
                <CardTitle className="line-items-table__title">Line Items</CardTitle>
              </CardHeader>
              <CardContent className="line-items-table__body p-6">
                <Table className=" ">
                  <TableHeader className="line-items-table__table-header">
                    <TableRow className="line-items-table__header-row">
                      <TableHead className="line-items-table__header-description">Description</TableHead>
                      <TableHead className="line-items-table__header-qty text-center">Qty</TableHead>
                      <TableHead className="line-items-table__header-rate text-right">Rate</TableHead>
                      <TableHead className="line-items-table__header-amount text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="line-items-table__table-body">
                    {invoice.lineItems && invoice.lineItems.map((item: any) => (
                      <TableRow key={item.id} className="line-items-table__row">
                        <TableCell className="line-items-table__cell-description">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{item.product_image}</span>
                            <span>{item.product_name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="line-items-table__cell-qty text-center">{item.quantity}</TableCell>
                        <TableCell className="line-items-table__cell-rate text-right">{formatCurrency(item.price, invoice.currency)}</TableCell>
                        <TableCell className="line-items-table__cell-amount text-right">{formatCurrency(item.subtotal, invoice.currency)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Totals Section */}
            <Card className="totals-section">
              <CardHeader className="totals-section__header">
                <CardTitle className="totals-section__title">Totals</CardTitle>
              </CardHeader>
              <CardContent className="totals-section__body p-6">
                <div className="totals-section__content space-y-2 text-right">
                  <div className="totals-section__row flex justify-between">
                    <span className="totals-section__label">Subtotal:</span>
                    <span className="totals-section__value">{formatCurrency(invoice.subtotal || 0, invoice.currency)}</span>
                  </div>
                  {invoice.discount && invoice.discount > 0 && (
                    <div className="totals-section__row totals-section__discount flex justify-between text-red-600">
                      <span className="totals-section__label">Discount:</span>
                      <span className="totals-section__value">-{formatCurrency(invoice.discount, invoice.currency)}</span>
                    </div>
                  )}
                  {invoice.tax && invoice.tax > 0 && (
                    <div className="totals-section__row totals-section__tax flex justify-between">
                      <span className="totals-section__label">Tax:</span>
                      <span className="totals-section__value">+{formatCurrency(invoice.tax, invoice.currency)}</span>
                    </div>
                  )}
                  <div className="totals-section__divider border-t pt-2 mt-4">
                    <div className="totals-section__total flex justify-between text-lg font-bold">
                      <span className="totals-section__label">Total:</span>
                      <span className="totals-section__value">{formatCurrency(invoice.total || 0, invoice.currency)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            {invoice.terms && (
              <Card className="terms-conditions">
                <CardHeader className="terms-conditions__header">
                  <CardTitle className="terms-conditions__title">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="terms-conditions__body p-6">
                  <div className="terms-conditions__content">
                    <div className="terms-conditions__text text-sm whitespace-pre-wrap">
                      {invoice.terms}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Attachments - Using mock data since not in database */}
            <Card className="attachments">
              <CardHeader className="attachments__header">
                <CardTitle className="attachments__title">Attachments</CardTitle>
              </CardHeader>
              <CardContent className="attachments__body p-6">
                <div className="attachments__content grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockInvoiceData.attachments.map((file: any) => (
                    <div key={file.id} className="attachments__file flex items-center justify-between p-3 border rounded">
                      <div className="attachments__file-info flex items-center space-x-3">
                        <span className="attachments__file-icon text-lg">{fileTypeIcons[file.fileType as keyof typeof fileTypeIcons] || fileTypeIcons.default}</span>
                        <div className="attachments__file-details">
                          <div className="attachments__file-name font-medium">{file.fileName}</div>
                          <div className="attachments__file-meta text-sm text-gray-500">{file.fileSize} KB • {formatDate(file.uploadDate)}</div>
                        </div>
                      </div>
                      <div className="attachments__file-actions flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="attachments__download-button">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="attachments__delete-button">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="attachments__upload-button w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Side Panel */}
          <div className="side-panel space-y-6">
            
            {/* Notes Section */}
            <Card className="notes-section">
              <CardHeader className="notes-section__header">
                <CardTitle className="notes-section__title">Notes</CardTitle>
              </CardHeader>
              <CardContent className="notes-section__body p-6">
                <div className="notes-section__content space-y-4">
                  {isEditingNotes ? (
                    <Textarea
                      value={notes}
                      onChange={(e) => handleNotesChange(e.target.value)}
                      placeholder="Add notes about this invoice..."
                      className="notes-section__textarea min-h-[120px]"
                    />
                  ) : (
                    <div className="notes-section__display min-h-[120px] p-3 border rounded bg-gray-50">
                      {notes || "No notes added yet."}
                    </div>
                  )}
                  <div className="notes-section__actions flex items-center space-x-2">
                    {isEditingNotes ? (
                      <>
                        <Button onClick={handleSaveNotes} disabled={!hasNotesChanges} className="notes-section__save-button">
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditingNotes(false)} className="notes-section__cancel-button">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" onClick={handleEditNotes} className="notes-section__edit-button">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="activity-log">
              <CardHeader className="activity-log__header">
                <CardTitle className="activity-log__title">Activity Log</CardTitle>
              </CardHeader>
              <CardContent className="activity-log__body p-6">
                <div className="activity-log__content space-y-3">
                  {mockInvoiceData.activityLog.map((event: any) => (
                    <div key={event.id} className="activity-log__event flex items-start space-x-3">
                      <span className="activity-log__event-icon text-lg">{eventIcons[event.type as keyof typeof eventIcons]}</span>
                      <div className="activity-log__event-details flex-1">
                        <div className="activity-log__event-description text-sm font-medium">{event.description}</div>
                        <div className="activity-log__event-timestamp text-xs text-gray-500">{formatDateTime(event.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 