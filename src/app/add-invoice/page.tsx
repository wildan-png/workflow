"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  HelpCircle, 
  X, 
  Plus, 
  Trash2, 
  Send, 
  Save,
  Monitor,
  Smartphone,
  CreditCard,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

export default function AddInvoicePage() {
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  
  // Product state
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  // Database data state
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Additional options state
  const [showTerms, setShowTerms] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  
  // Additional options content
  const [termsContent, setTermsContent] = useState("Payment is due within 30 days. Late payments may incur additional fees.");
  const [notesContent, setNotesContent] = useState("Thank you for your business!");
  const [footerContent, setFooterContent] = useState("© 2024 Your Company. All rights reserved.");
  
  // Coupon and discount state
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountType, setDiscountType] = useState("percentage"); // "percentage" or "fixed"
  
  // Preview state
  const [previewMode, setPreviewMode] = useState("desktop");
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true);
  
  // Save state
  const [lastSaved, setLastSaved] = useState("Draft saved automatically");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set default due date to 30 days from now
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 30);
    setDueDate(defaultDueDate.toISOString().split('T')[0]);
    
    // Fetch customers and products from database
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch customers
        const customersResponse = await fetch('/api/customers');
        const customersData = await customersResponse.json();
        if (customersData.success) {
          setCustomers(customersData.customers);
        }
        
        // Fetch products
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        if (productsData.success) {
          setProducts(productsData.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAddProduct = (product: any) => {
    const newProduct = {
      ...product,
      quantity: 1,
      tax: 0,
      uniqueId: `${product.id}-${Date.now()}` // Use uniqueId for internal tracking, keep original id for database
    };
    setSelectedProducts([...selectedProducts, newProduct]);
    setShowAddProduct(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.uniqueId !== productId));
  };

  const handleProductChange = (productId: string, field: string, value: any) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.uniqueId === productId ? { ...p, [field]: value } : p
    ));
  };

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (product.price * product.quantity * (product.tax / 100));
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const discount = calculateDiscount();
    return subtotal + tax - discount;
  };

  const calculateDiscount = () => {
    if (!discountAmount || discountAmount === "0") return 0;
    const amount = parseFloat(discountAmount);
    if (discountType === "percentage") {
      return (calculateSubtotal() * amount) / 100;
    } else {
      return amount;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(`Last saved: ${new Date().toLocaleTimeString()}`);
    setIsSaving(false);
  };

  const handleSendInvoice = async () => {
    // Validate form
    if (!selectedCustomer || !subject || !dueDate || selectedProducts.length === 0) {
      alert("Please fill in all required fields and add at least one product.");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Prepare invoice data
      const invoiceData = {
        subject,
        selectedCustomer,
        dueDate,
        currency,
        selectedProducts,
        notesContent: showNotes ? notesContent : '',
        termsContent: showTerms ? termsContent : '',
        footerContent: showFooter ? footerContent : '',
        couponCode: showCoupon ? couponCode : '',
        discountType,
        discountAmount,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        discount: calculateDiscount(),
        total: calculateTotal()
      };

      // Save invoice to database
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();

      if (result.success) {
        setLastSaved(`Invoice ${result.invoiceNumber} sent successfully!`);
        // Redirect to invoice list after a short delay
        setTimeout(() => {
          window.location.href = '/invoice-list';
        }, 1500);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      setLastSaved("Failed to send invoice. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-invoice-page min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Sticky Navigation */}
      <div className="add-invoice-navigation fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="add-invoice-navigation__left flex items-center space-x-4">
          <div className="add-invoice-navigation__logo font-bold text-lg">Logo</div>
          <div className="add-invoice-navigation__divider w-px h-6 bg-gray-300"></div>
          <div className="add-invoice-navigation__title text-lg font-semibold text-gray-900">Add Invoice</div>
        </div>
        <div className="add-invoice-navigation__right flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="add-invoice-navigation__help-button">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="add-invoice-navigation__close-button" onClick={() => window.location.href = "/invoice-list"}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="add-invoice-content flex flex-col h-screen" style={{ paddingTop: '96px', paddingLeft: '64px', paddingRight: '64px', }}>
        <div className="add-invoice-layout grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Form Sections */}
          <div className="add-invoice-form lg:col-span-3 flex flex-col min-h-0">
            
            {/* Scrollable Form Content */}
            <div className="add-invoice-form__content flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Invoice Details */}
              <Card className="invoice-details">
              <CardHeader className="invoice-details__header">
                <CardTitle className="invoice-details__title">Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="invoice-details__body p-6">
                <div className="invoice-details__content space-y-4">
                  <div className="invoice-details__field">
                    <label className="invoice-details__field-label block text-sm font-medium mb-2">Select User/Contact</label>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                      <SelectTrigger className="invoice-details__contact-select">
                        <SelectValue placeholder="Select a customer or contact" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer: any) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} ({customer.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="invoice-details__field">
                    <label className="invoice-details__field-label block text-sm font-medium mb-2">Subject</label>
                    <Input 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter invoice subject"
                      className="invoice-details__subject-input"
                    />
                  </div>
                  
                  <div className="invoice-details__field">
                    <label className="invoice-details__field-label block text-sm font-medium mb-2">Due Date</label>
                    <Input 
                      type="date" 
                      value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)}
                      className="invoice-details__due-date-picker"
                    />
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="product-selection">
              <CardHeader className="product-selection__header">
                <CardTitle className="product-selection__title">Product Selection</CardTitle>
              </CardHeader>
              <CardContent className="product-selection__body p-6">
                <div className="product-selection__content space-y-4">

                {/* Add Product */}
                  <Button 
                    variant="link" 
                    onClick={() => setShowAddProduct(true)}
                    className="product-selection__add-product-link h-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                  
                  {/* Selected Products List */}
                  <div className="product-selection__products-list">
                    {selectedProducts.length === 0 ? (
                      <div className="product-selection__empty-state text-left pb-16 text-gray-500">
                        No products selected. Click 'Add Product' to get started.
                      </div>
                    ) : (
                      <div className="product-selection__products space-y-3">
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="product-selection__product flex items-center justify-between p-3 border rounded">
                            <div className="product-selection__product-info flex items-center space-x-3">
                              <span className="product-selection__product-image text-2xl">{product.image}</span>
                              <div className="product-selection__product-details">
                                <div className="product-selection__product-name font-medium">{product.name}</div>
                                <div className="product-selection__product-price text-sm text-gray-500">
                                  {currency} {product.price}
                                </div>
                              </div>
                            </div>
                            <div className="product-selection__product-controls flex items-center space-x-2">
                              <div className="product-selection__quantity-group">
                                <label className="text-xs text-gray-500">Qty</label>
                                <Input 
                                  type="number" 
                                  min="1"
                                  value={product.quantity} 
                                  onChange={(e) => handleProductChange(product.id, 'quantity', parseInt(e.target.value))}
                                  className="product-selection__quantity-input w-16 h-8"
                                />
                              </div>
                              <div className="product-selection__tax-group">
                                <label className="text-xs text-gray-500">Tax %</label>
                                <Input 
                                  type="number" 
                                  min="0"
                                  max="100"
                                  value={product.tax} 
                                  onChange={(e) => handleProductChange(product.id, 'tax', parseFloat(e.target.value))}
                                  className="product-selection__tax-input w-16 h-8"
                                />
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveProduct(product.id)}
                                className="product-selection__remove-button text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Coupon & Discount */}
                  <div className="product-selection__actions space-y-2">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setShowCoupon(!showCoupon)}
                      className="product-selection__add-coupon-button w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Coupon
                    </Button>
                    {showCoupon && (
                      <div className="product-selection__coupon-input space-y-2 p-3 border rounded">
                        <Input 
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="product-selection__coupon-code"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowCoupon(false)}
                          className="product-selection__remove-coupon w-full"
                        >
                          Remove Coupon
                        </Button>
                      </div>
                    )}
                    
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setShowDiscount(!showDiscount)}
                      className="product-selection__add-discount-button w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Discount
                    </Button>
                    {showDiscount && (
                      <div className="product-selection__discount-input space-y-2 p-3 border rounded">
                        <div className="product-selection__discount-type flex space-x-2">
                          <Select value={discountType} onValueChange={setDiscountType}>
                            <SelectTrigger className="product-selection__discount-type-select">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage (%)</SelectItem>
                              <SelectItem value="fixed">Fixed Amount</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Input 
                          placeholder={discountType === "percentage" ? "Enter percentage" : "Enter amount"}
                          value={discountAmount}
                          onChange={(e) => setDiscountAmount(e.target.value)}
                          className="product-selection__discount-amount"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowDiscount(false)}
                          className="product-selection__remove-discount w-full"
                        >
                          Remove Discount
                        </Button>
                      </div>
                    )}
                  </div>

 
                </div>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="additional-options mb-8">
              <CardHeader className="additional-options__header">
                <CardTitle className="additional-options__title">Additional Options</CardTitle>
              </CardHeader>
              <CardContent className="additional-options__body p-6">
                <div className="additional-options__content space-y-4">
                  
                  {/* Terms & Conditions */}
                  <div className="additional-options__option">
                    <div className="additional-options__checkbox-group flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={showTerms} 
                        onCheckedChange={(checked) => setShowTerms(checked as boolean)}
                        className="additional-options__terms-checkbox"
                      />
                      <label htmlFor="terms" className="additional-options__terms-label text-sm font-medium">
                        Terms & Conditions
                      </label>
                    </div>
                    {showTerms && (
                      <div className="additional-options__terms-content mt-3">
                        <Textarea 
                          placeholder="Enter your terms and conditions..."
                          value={termsContent}
                          onChange={(e) => setTermsContent(e.target.value)}
                          className="additional-options__terms-textarea min-h-[100px]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Attachments */}
                  <div className="additional-options__option">
                    <div className="additional-options__checkbox-group flex items-center space-x-2">
                      <Checkbox 
                        id="attachments" 
                        checked={showAttachments} 
                        onCheckedChange={(checked) => setShowAttachments(checked as boolean)}
                        className="additional-options__attachments-checkbox"
                      />
                      <label htmlFor="attachments" className="additional-options__attachments-label text-sm font-medium">
                        Attachments
                      </label>
                    </div>
                    {showAttachments && (
                      <div className="additional-options__attachments-content mt-3">
                        <div className="additional-options__file-upload border-2 border-dashed border-gray-300 rounded p-4 text-center">
                          <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="additional-options__option">
                    <div className="additional-options__checkbox-group flex items-center space-x-2">
                      <Checkbox 
                        id="notes" 
                        checked={showNotes} 
                        onCheckedChange={(checked) => setShowNotes(checked as boolean)}
                        className="additional-options__notes-checkbox"
                      />
                      <label htmlFor="notes" className="additional-options__notes-label text-sm font-medium">
                        Notes
                      </label>
                    </div>
                    {showNotes && (
                      <div className="additional-options__notes-content mt-3">
                        <Textarea 
                          placeholder="Add any additional notes..."
                          value={notesContent}
                          onChange={(e) => setNotesContent(e.target.value)}
                          className="additional-options__notes-textarea min-h-[80px]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="additional-options__option">
                    <div className="additional-options__checkbox-group flex items-center space-x-2">
                      <Checkbox 
                        id="footer" 
                        checked={showFooter} 
                        onCheckedChange={(checked) => setShowFooter(checked as boolean)}
                        className="additional-options__footer-checkbox"
                      />
                      <label htmlFor="footer" className="additional-options__footer-label text-sm font-medium">
                        Footer
                      </label>
                    </div>
                    {showFooter && (
                      <div className="additional-options__footer-content mt-3">
                        <Textarea 
                          placeholder="Enter footer text..."
                          value={footerContent}
                          onChange={(e) => setFooterContent(e.target.value)}
                          className="additional-options__footer-textarea min-h-[60px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Sticky Footer */}
            <div className="add-invoice-footer bg-white border-t border-gray-200 pt-4 py-3 flex items-center justify-between" style={{ paddingBottom: '24px' }}>
              <div className="add-invoice-footer__saved-info text-sm text-gray-500">
                {isSaving ? (
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  lastSaved
                )}
              </div>
              <div className="add-invoice-footer__actions flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/invoice-list"}
                  className="add-invoice-footer__cancel-button"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendInvoice}
                  className="add-invoice-footer__send-button"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="live-preview lg:col-span-2 flex flex-col min-h-0 pb-[24px]">
            <Card className="flex flex-col h-full">
              <CardHeader className="preview-header p-4 border-b border-gray-200">
                <div className="preview-header__content flex items-center justify-between">
                  <div className="preview-header__title text-lg font-semibold text-gray-900">
                    Invoice Preview
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    className="preview-header__toggle"
                  >
                    {isPreviewExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                {isPreviewExpanded && (
                  <div className="preview-header__options flex space-x-1 mt-3">
                    <Button 
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                      className="preview-header__option-desktop"
                    >
                      <Monitor className="h-3 w-3 mr-1" />
                      Desktop
                    </Button>
                    <Button 
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                      className="preview-header__option-mobile"
                    >
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mobile
                    </Button>
                    <Button 
                      variant={previewMode === "payment" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("payment")}
                      className="preview-header__option-payment"
                    >
                      <CreditCard className="h-3 w-3 mr-1" />
                      Payment
                    </Button>
                  </div>
                )}
              </CardHeader>
              
              {isPreviewExpanded && (
                <CardContent className="preview-content p-4 flex-1 overflow-y-auto">
                  <div className={`preview-content__container preview-content--${previewMode} bg-white border rounded p-4`}>
                    <div className="preview-content__header mb-4">
                      <div className="preview-content__logo font-bold text-lg mb-2">Logo</div>
                      <div className="preview-content__invoice-info">
                        <div className="preview-content__invoice-number text-sm text-gray-500">Invoice #INV-2024-001</div>
                        {subject && (
                          <div className="preview-content__subject text-sm font-medium text-gray-700 mb-1">
                            {subject}
                          </div>
                        )}
                        {dueDate && (
                          <div className="preview-content__due-date text-sm text-gray-500 mb-1">
                            Due Date: {new Date(dueDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="preview-content__amount text-lg font-bold">{currency} {calculateTotal().toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="preview-content__customer mb-4">
                      <div className="preview-content__customer-name font-medium">
                        {selectedCustomer ? customers.find((c: any) => c.id === selectedCustomer)?.name : "Customer Name"}
                      </div>
                                              <div className="preview-content__customer-email text-sm text-gray-500">
                          {selectedCustomer ? customers.find((c: any) => c.id === selectedCustomer)?.email : "customer@example.com"}
                      </div>
                    </div>
                    
                    <div className="preview-content__line-items mb-4 space-y-3">
                      {selectedProducts.map((product) => (
                        <div key={product.id} className="preview-content__line-item border-b border-gray-100 pb-3">
                          {/* Product Header */}
                          <div className="preview-content__line-item-header flex items-center justify-between mb-2">
                            <div className="preview-content__line-item-info flex items-center space-x-2">
                              <span className="preview-content__line-item-thumbnail text-lg">
                                {product.image}
                              </span>
                              <span className="preview-content__line-item-name font-medium">
                                {product.name}
                              </span>
                            </div>
                            <span className="preview-content__line-item-price text-sm text-gray-600">
                              {currency} {product.price} each
                            </span>
                          </div>
                          
                          {/* Product Details */}
                          <div className="preview-content__line-item-details grid grid-cols-3 gap-2 text-xs text-gray-500">
                            <div className="preview-content__line-item-quantity">
                              Qty: {product.quantity}
                            </div>
                            <div className="preview-content__line-item-tax">
                              Tax: {product.tax}%
                            </div>
                            <div className="preview-content__line-item-subtotal text-right font-medium text-gray-700">
                              {currency} {(product.price * product.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="preview-content__totals border-t pt-2">
                      <div className="preview-content__subtotal flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>{currency} {calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="preview-content__tax flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>{currency} {calculateTax().toFixed(2)}</span>
                      </div>
                      {calculateDiscount() > 0 && (
                        <div className="preview-content__discount flex justify-between text-sm text-green-600">
                          <span>Discount:</span>
                          <span>-{currency} {calculateDiscount().toFixed(2)}</span>
                        </div>
                      )}
                      <div className="preview-content__total flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{currency} {calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Additional Content Sections */}
                    {showNotes && notesContent && (
                      <div className="preview-content__notes mt-4 pt-4 border-t border-gray-100">
                        <div className="preview-content__notes-title text-sm font-medium text-gray-700 mb-2">Notes</div>
                        <div className="preview-content__notes-content text-sm text-gray-600">
                          {notesContent}
                        </div>
                      </div>
                    )}

                    {showTerms && termsContent && (
                      <div className="preview-content__terms mt-4 pt-4 border-t border-gray-100">
                        <div className="preview-content__terms-title text-sm font-medium text-gray-700 mb-2">Terms & Conditions</div>
                        <div className="preview-content__terms-content text-sm text-gray-600">
                          {termsContent}
                        </div>
                      </div>
                    )}

                    {showFooter && footerContent && (
                      <div className="preview-content__footer mt-4 pt-4 border-t border-gray-100">
                        <div className="preview-content__footer-content text-xs text-gray-500 text-center">
                          {footerContent}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Product Selection Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="product-selection-dialog max-w-md">
          <DialogHeader className="product-selection-dialog__header">
            <DialogTitle className="product-selection-dialog__title">Select Product</DialogTitle>
          </DialogHeader>
          
          <Command className="product-selection-dialog__command">
            <CommandInput 
              placeholder="Search products..." 
              className="product-selection-dialog__search"
            />
            <CommandList className="product-selection-dialog__list">
              <CommandEmpty className="product-selection-dialog__empty">
                No products found.
              </CommandEmpty>
              <CommandGroup className="product-selection-dialog__group">
                                        {products.map((product: any) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => handleAddProduct(product)}
                    className="product-selection-dialog__item p-3 cursor-pointer"
                  >
                    <div className="product-selection-dialog__item-content flex items-center space-x-3 w-full">
                      {/* Thumbnail */}
                      <div className="product-selection-dialog__thumbnail text-2xl">
                        {product.image}
                      </div>
                      
                      {/* Product Name & Price Container */}
                      <div className="product-selection-dialog__details flex-1">
                        <div className="product-selection-dialog__name font-medium">
                          {product.name}
                        </div>
                        <div className="product-selection-dialog__price text-sm text-gray-500">
                          {currency} {product.price}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
} 