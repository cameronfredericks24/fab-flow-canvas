import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, Package, FileText, Download, Send, DollarSign } from 'lucide-react';

interface SalesSummaryProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const SalesSummary: React.FC<SalesSummaryProps> = ({ data, onUpdate }) => {
  const [products] = useState([
    { id: 1, name: 'HSG-585 GB', isExisting: true },
    { id: 2, name: 'New Product 1', isExisting: false }
  ]);
  const [activeProduct, setActiveProduct] = useState(1);

  const [costBreakdown] = useState({
    materialCost: 1245.80,
    manufacturingCost: 2890.50,
    directCost: 485.75,
    subtotal: 4622.05
  });

  const [pricingData, setPricingData] = useState({
    margin: 25,
    discount: 5,
    additionalCharges: 150,
    notes: ''
  });

  const [quoteDetails, setQuoteDetails] = useState({
    customerName: '',
    projectRef: '',
    validityDays: 30,
    paymentTerms: 'net-30',
    deliveryWeeks: 8
  });

  const calculatePricing = () => {
    const { subtotal } = costBreakdown;
    const { margin, discount, additionalCharges } = pricingData;
    
    const marginAmount = (subtotal * margin) / 100;
    const priceBeforeDiscount = subtotal + marginAmount + additionalCharges;
    const discountAmount = (priceBeforeDiscount * discount) / 100;
    const finalPrice = priceBeforeDiscount - discountAmount;
    
    return {
      marginAmount,
      priceBeforeDiscount,
      discountAmount,
      finalPrice
    };
  };

  const pricing = calculatePricing();

  const costSummaryData = [
    { 
      category: 'Material Costs', 
      details: [
        { item: 'Gear Internals', cost: 485.30 },
        { item: 'Casing', cost: 320.50 },
        { item: 'Bearings', cost: 240.00 },
        { item: 'Accessories', cost: 200.00 }
      ],
      total: costBreakdown.materialCost,
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      category: 'Manufacturing Costs', 
      details: [
        { item: 'Hobbing', cost: 382.50 },
        { item: 'Profile Grinding', cost: 273.00 },
        { item: 'VTL', cost: 330.00 },
        { item: 'Other Processes', cost: 1905.00 }
      ],
      total: costBreakdown.manufacturingCost,
      color: 'bg-green-100 text-green-700'
    },
    { 
      category: 'Direct Costs', 
      details: [
        { item: 'Quality Inspection', cost: 150.00 },
        { item: 'Packaging Materials', cost: 85.00 },
        { item: 'Heat Treatment', cost: 250.75 }
      ],
      total: costBreakdown.directCost,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const generateQuote = () => {
    // Here you would integrate with your quote generation system
    console.log('Generating quote with data:', {
      products,
      costBreakdown,
      pricingData,
      quoteDetails,
      finalPrice: pricing.finalPrice
    });
    
    // Show success message or redirect
    alert(`Quote generated successfully! Final price: $${pricing.finalPrice.toFixed(2)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sales Summary & Quote Generation</h2>
          <p className="text-slate-600 mt-1">Review costs, set margins and generate customer quote</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm text-slate-600">Quote Value:</span>
          <Badge variant="default" className="bg-green-600 text-lg px-3 py-1">
            ${pricing.finalPrice.toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs value={activeProduct.toString()} onValueChange={(value) => setActiveProduct(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-slate-100 p-1">
          {products.map((product) => (
            <TabsTrigger 
              key={product.id} 
              value={product.id.toString()}
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Package className="w-4 h-4" />
              {product.name}
              {product.isExisting && (
                <Badge variant="secondary" className="text-xs">Existing</Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {products.map((product) => (
          <TabsContent key={product.id} value={product.id.toString()} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <div className="space-y-6">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {costSummaryData.map((category, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-slate-700">{category.category}</h4>
                            <Badge className={category.color}>
                              ${category.total.toFixed(2)}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {category.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex justify-between text-sm">
                                <span className="text-slate-600">{detail.item}</span>
                                <span className="text-slate-700">${detail.cost.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-700">Subtotal</span>
                          <span className="text-xl font-bold text-slate-800">${costBreakdown.subtotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Configuration */}
              <div className="space-y-6">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Pricing Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="margin" className="text-sm font-medium text-slate-700">
                            Margin (%)
                          </Label>
                          <Input
                            id="margin"
                            type="number"
                            value={pricingData.margin}
                            onChange={(e) => setPricingData(prev => ({ ...prev, margin: parseFloat(e.target.value) || 0 }))}
                            className="mt-1 border-slate-200 focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="discount" className="text-sm font-medium text-slate-700">
                            Discount (%)
                          </Label>
                          <Input
                            id="discount"
                            type="number"
                            value={pricingData.discount}
                            onChange={(e) => setPricingData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                            className="mt-1 border-slate-200 focus:border-blue-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="additional" className="text-sm font-medium text-slate-700">
                          Additional Charges ($)
                        </Label>
                        <Input
                          id="additional"
                          type="number"
                          value={pricingData.additionalCharges}
                          onChange={(e) => setPricingData(prev => ({ ...prev, additionalCharges: parseFloat(e.target.value) || 0 }))}
                          className="mt-1 border-slate-200 focus:border-blue-400"
                        />
                      </div>

                      {/* Pricing Calculation */}
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Subtotal</span>
                            <span>${costBreakdown.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Margin ({pricingData.margin}%)</span>
                            <span>${pricing.marginAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Additional Charges</span>
                            <span>${pricingData.additionalCharges.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Discount ({pricingData.discount}%)</span>
                            <span className="text-red-600">-${pricing.discountAmount.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-green-300 pt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-slate-700">Final Price</span>
                              <span className="text-xl font-bold text-green-600">${pricing.finalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quote Details */}
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Quote Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customer" className="text-sm font-medium text-slate-700">
                          Customer Name
                        </Label>
                        <Input
                          id="customer"
                          value={quoteDetails.customerName}
                          onChange={(e) => setQuoteDetails(prev => ({ ...prev, customerName: e.target.value }))}
                          placeholder="Enter customer name"
                          className="mt-1 border-slate-200 focus:border-blue-400"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="projectRef" className="text-sm font-medium text-slate-700">
                          Project Reference
                        </Label>
                        <Input
                          id="projectRef"
                          value={quoteDetails.projectRef}
                          onChange={(e) => setQuoteDetails(prev => ({ ...prev, projectRef: e.target.value }))}
                          placeholder="Enter project reference"
                          className="mt-1 border-slate-200 focus:border-blue-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="validity" className="text-sm font-medium text-slate-700">
                            Validity (Days)
                          </Label>
                          <Input
                            id="validity"
                            type="number"
                            value={quoteDetails.validityDays}
                            onChange={(e) => setQuoteDetails(prev => ({ ...prev, validityDays: parseInt(e.target.value) || 30 }))}
                            className="mt-1 border-slate-200 focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="delivery" className="text-sm font-medium text-slate-700">
                            Delivery (Weeks)
                          </Label>
                          <Input
                            id="delivery"
                            type="number"
                            value={quoteDetails.deliveryWeeks}
                            onChange={(e) => setQuoteDetails(prev => ({ ...prev, deliveryWeeks: parseInt(e.target.value) || 8 }))}
                            className="mt-1 border-slate-200 focus:border-blue-400"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="payment" className="text-sm font-medium text-slate-700">
                          Payment Terms
                        </Label>
                        <Select 
                          value={quoteDetails.paymentTerms} 
                          onValueChange={(value) => setQuoteDetails(prev => ({ ...prev, paymentTerms: value }))}
                        >
                          <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="net-15">Net 15 Days</SelectItem>
                            <SelectItem value="net-30">Net 30 Days</SelectItem>
                            <SelectItem value="net-45">Net 45 Days</SelectItem>
                            <SelectItem value="advance-50">50% Advance</SelectItem>
                            <SelectItem value="advance-100">100% Advance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                          Additional Notes
                        </Label>
                        <Textarea
                          id="notes"
                          value={pricingData.notes}
                          onChange={(e) => setPricingData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Enter any additional notes or terms..."
                          className="mt-1 border-slate-200 focus:border-blue-400"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button onClick={generateQuote} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Send className="w-4 h-4" />
                Generate Quote
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SalesSummary;
