"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Home,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings
} from "lucide-react";

export default function InvoiceListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  
  // Quotation filters
  const [quotationSearchQuery, setQuotationSearchQuery] = useState("");
  const [quotationStatusFilter, setQuotationStatusFilter] = useState("all");

  // Additional state for load more and deletion
  const [visibleInvoices, setVisibleInvoices] = useState(4); // Show 4 initially
  const [deletedInvoiceIds, setDeletedInvoiceIds] = useState(new Set());
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy quotation data
  const quotations = [
    {
      id: "QUO-001",
      quoteNumber: "QUO-2024-001",
      client: "Acme Corp",
      amount: 5500.00,
      currency: "USD",
      status: "pending",
      validUntil: "2024-02-15",
      createdAt: "2024-01-10"
    },
    {
      id: "QUO-002", 
      quoteNumber: "QUO-2024-002",
      client: "Tech Solutions",
      amount: 3200.00,
      currency: "USD",
      status: "accepted",
      validUntil: "2024-02-20",
      createdAt: "2024-01-12"
    },
    {
      id: "QUO-003",
      quoteNumber: "QUO-2024-003", 
      client: "Digital Agency",
      amount: 8750.00,
      currency: "USD",
      status: "draft",
      validUntil: "2024-02-25",
      createdAt: "2024-01-14"
    },
    {
      id: "QUO-004",
      quoteNumber: "QUO-2024-004",
      client: "StartupXYZ",
      amount: 2100.00,
      currency: "USD", 
      status: "rejected",
      validUntil: "2024-02-10",
      createdAt: "2024-01-08"
    },
    {
      id: "QUO-005",
      quoteNumber: "QUO-2024-005",
      client: "Enterprise Inc",
      amount: 12500.00,
      currency: "USD",
      status: "pending",
      validUntil: "2024-03-01",
      createdAt: "2024-01-16"
    }
  ];



  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "unpaid": return "secondary";
      case "pastdue": return "destructive";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const getQuotationStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted": return "default";
      case "pending": return "secondary";
      case "draft": return "outline";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  // Filter quotations based on search and status
  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotationSearchQuery === "" || 
      quotation.quoteNumber.toLowerCase().includes(quotationSearchQuery.toLowerCase()) ||
      quotation.client.toLowerCase().includes(quotationSearchQuery.toLowerCase());
    
    const matchesStatus = quotationStatusFilter === "all" || 
      quotation.status === quotationStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filter invoices based on search, status, date, and exclude deleted ones
  const filteredInvoices = invoices.filter(invoice => {
    // Exclude deleted invoices
    if (deletedInvoiceIds.has(invoice.id)) {
      return false;
    }

    const matchesSearch = searchQuery === "" || 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      invoice.status === statusFilter;
    
    const matchesDate = dateFilter === "all" || (() => {
      const invoiceDate = new Date(invoice.createdAt);
      const today = new Date();
      
      switch (dateFilter) {
        case "today":
          return invoiceDate.toDateString() === today.toDateString();
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return invoiceDate >= weekAgo;
        case "month":
          return invoiceDate.getMonth() === today.getMonth() && 
                 invoiceDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Get visible invoices for load more functionality  
  const visibleFilteredInvoices = filteredInvoices.slice(0, visibleInvoices);
  const hasMoreInvoices = filteredInvoices.length > visibleInvoices;

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

  // Handle load more functionality
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleInvoices(prev => prev + 4);
      setIsLoadingMore(false);
    }, 1000);
  };

  // Handle invoice deletion from database
  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId));
        // Also remove from deleted set if it was there
        setDeletedInvoiceIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(invoiceId);
          return newSet;
        });
      } else {
        console.error('Failed to delete invoice:', result.message);
        alert('Failed to delete invoice. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice. Please try again.');
    }
  };

  // Fetch invoices from database
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices');
        const result = await response.json();
        
        if (result.success) {
          // Transform database data to match the expected format
          const transformedInvoices = result.invoices.map((invoice: any) => ({
            id: invoice.id,
            amount: invoice.total,
            currency: invoice.currency,
            invoiceNumber: invoice.invoice_number,
            status: invoice.status,
            email: invoice.customer_email || 'N/A',
            subject: invoice.subject || 'N/A',
            lastUpdated: invoice.updated_at,
            createdAt: invoice.created_at
          }));
          
          setInvoices(transformedInvoices);
        } else {
          console.error('Failed to fetch invoices:', result.message);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Handle hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null during hydration to prevent mismatch
  }

  return (
    <div className="invoice-list-page min-h-screen bg-background flex flex-col">
      {/* 1. Stacked Main Navigation */}
      <div className="stacked-main-navigation">
            {/* 1.1 Global Top Bar (fixed) */}
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

        {/* 1.2 Primary Navigation (horizontal) */}
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
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </a>
            <a href="/products" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </a>
            <a href="/reports" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </a>
            <a href="/settings" className="primary-navigation__item flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* 2. Body */}
              <div className="body flex flex-col flex-grow pt-28">
        {/* 2.1 Header for Title */}
        <div className="page-header bg-gray-200 p-6">
          <div className="page-header__breadcrumb text-sm text-gray-600 mb-2">
            <a href="/" className="hover:text-gray-900">Home</a>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>Invoices</span>
          </div>
          <h1 className="page-header__title text-3xl font-bold text-gray-900 mb-2">
            Invoice List
          </h1>
          <p className="page-header__description text-gray-600">
            Manage and view all your invoices
          </p>
        </div>

        {/* 2.2 Tab section */}
        <div className="tab-section bg-gray-200 flex-grow">
          <Tabs defaultValue="invoice" className="tab-section__container">
            <div className="tab-section__header p-6 pb-0">
              <TabsList className="tab-section__list">
                <TabsTrigger value="overview" className="tab-section__trigger">Overview</TabsTrigger>
                <TabsTrigger value="quotation" className="tab-section__trigger">Quotation</TabsTrigger>
                <TabsTrigger value="invoice" className="tab-section__trigger">Invoice</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="tab-section__content p-6 pt-4">
              <div className="overview-tab rounded-lg">
                <div className="overview-tab__content space-y-6">
                  <div className="overview-tab__summary">
                    <h3 className="text-lg font-semibold mb-4">Business Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-green-600">$12,450</div>
                          <div className="text-sm text-gray-600">Total Revenue</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600">24</div>
                          <div className="text-sm text-gray-600">Active Invoices</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-orange-600">8</div>
                          <div className="text-sm text-gray-600">Pending Payments</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="overview-tab__charts">
                    <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-500">Chart Placeholder - Revenue over time</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Quotation Tab */}
            <TabsContent value="quotation" className="tab-section__content p-6 pt-4">
              <div className="quotation-tab rounded-lg">
                <div className="quotation-tab__content space-y-6">
                  <div className="quotation-tab__filter-content">
                    <div className="quotation-tab__filter-wrapper flex items-center justify-between">
                      <div className="quotation-tab__filters flex items-center space-x-4">
                        <div className="quotation-tab__search">
                          <Input
                            placeholder="Search quotations..."
                            value={quotationSearchQuery}
                            onChange={(e) => setQuotationSearchQuery(e.target.value)}
                            className="w-64 bg-white"
                          />
                        </div>
                        <div className="quotation-tab__status-filter">
                          <Select value={quotationStatusFilter} onValueChange={setQuotationStatusFilter}>
                            <SelectTrigger className="w-40 bg-white">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="accepted">Accepted</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="quotation-tab__actions flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Quotation
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="quotation-tab__table">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Quote Number</TableHead>
                              <TableHead>Client</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Valid Until</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredQuotations.map((quotation) => (
                              <TableRow key={quotation.id} className="quotation-tab__row">
                                <TableCell className="quotation-tab__cell-quote-number font-medium">
                                  {quotation.quoteNumber}
                                </TableCell>
                                <TableCell className="quotation-tab__cell-client">
                                  {quotation.client}
                                </TableCell>
                                <TableCell className="quotation-tab__cell-amount">
                                  {formatCurrency(quotation.amount, quotation.currency)}
                                </TableCell>
                                <TableCell className="quotation-tab__cell-status">
                                  <Badge variant={getQuotationStatusBadgeVariant(quotation.status)}>
                                    {quotation.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="quotation-tab__cell-valid-until">
                                  {formatDate(quotation.validUntil)}
                                </TableCell>
                                <TableCell className="quotation-tab__cell-actions">
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {filteredQuotations.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                  No quotations found matching your filters
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Invoice Tab */}
            <TabsContent value="invoice" className="tab-section__content p-6 pt-4">
              <div className="invoice-tab rounded-lg">
                <div className="invoice-tab__content">
                  {/* Filter content moved inside table section */}
                  <div className="table-section__filter-content mb-6">
              <div className="table-section__filter-wrapper flex items-center justify-between">
                <div className="table-section__filters flex items-center space-x-2">
                  <div className="table-section__search">
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 bg-white"
                    />
                  </div>
                  <div className="table-section__status-filter">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 bg-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="pastdue">Past Due</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="table-section__date-filter">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-40 bg-white">
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="table-section__actions flex items-center space-x-2">
                  <Button variant="outline" >
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => window.location.href = "/add-invoice"}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              </div>
            </div>

            {/* Table content */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="table-section__header-amount">Amount</TableHead>
                      <TableHead className="table-section__header-invoice-number">Invoice Number</TableHead>
                      <TableHead className="table-section__header-email">Email</TableHead>
                      <TableHead className="table-section__header-subject">Subject</TableHead>
                      <TableHead className="table-section__header-last-updated">Last Updated</TableHead>
                      <TableHead className="table-section__header-created-at">Created at</TableHead>
                      <TableHead className="table-section__header-actions">Action menu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleFilteredInvoices.map((invoice) => (
                      <TableRow 
                        key={invoice.id} 
                        className="table-section__row cursor-pointer hover:bg-gray-50"
                        onClick={() => window.location.href = `/invoice-list/${invoice.id}`}
                      >
                        <TableCell className="table-section__cell-amount font-medium">
                          {formatCurrency(invoice.amount, invoice.currency)}
                        </TableCell>
                        <TableCell className="table-section__cell-invoice-number">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{invoice.invoiceNumber}</span>
                            <Badge variant={getStatusBadgeVariant(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="table-section__cell-email">
                          {invoice.email}
                        </TableCell>
                        <TableCell className="table-section__cell-subject">
                          {invoice.subject}
                        </TableCell>
                        <TableCell className="table-section__cell-last-updated">
                          {formatDateTime(invoice.lastUpdated)}
                        </TableCell>
                        <TableCell className="table-section__cell-created-at">
                          {formatDate(invoice.createdAt)}
                        </TableCell>
                        <TableCell className="table-section__cell-actions">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteInvoice(invoice.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {isLoading && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          Loading invoices...
                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && visibleFilteredInvoices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No invoices found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
                  {/* Load More Button (inside table section) */}
                  {hasMoreInvoices && (
                    <div className="table-section__load-more flex justify-center mt-6">
                      <Button 
                        variant="outline" 
                        className="table-section__load-more-button"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? "Loading..." : `Load More Invoices (${filteredInvoices.length - visibleInvoices} remaining)`}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 