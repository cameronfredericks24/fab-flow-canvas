
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, DollarSign, Calculator, Lock } from 'lucide-react';

interface SupplierSelectionProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const SupplierSelection: React.FC<SupplierSelectionProps> = ({ data, onUpdate }) => {
  const [products] = useState([
    { id: 1, name: 'HSG-585 GB', isExisting: true },
    { id: 2, name: 'New Product 1', isExisting: false }
  ]);
  const [activeProduct, setActiveProduct] = useState(1);

  const suppliers = [
    { id: 'supplier-1', name: 'Advanced Materials Ltd', rating: 4.8, location: 'Mumbai' },
    { id: 'supplier-2', name: 'Precision Components Inc', rating: 4.6, location: 'Delhi' },
    { id: 'supplier-3', name: 'Quality Steel Works', rating: 4.9, location: 'Chennai' },
    { id: 'supplier-4', name: 'Industrial Solutions', rating: 4.7, location: 'Pune' }
  ];

  const materialSections = [
    {
      id: 'gear-internals',
      title: 'Gear Internals',
      materials: [
        { id: 1, name: 'Steel Gear 42mm', specs: 'OD: 42mm, ID: 15mm, Weight: 0.8kg' },
        { id: 2, name: 'Brass Pinion 28mm', specs: 'OD: 28mm, ID: 10mm, Weight: 0.3kg' }
      ]
    },
    {
      id: 'casing',
      title: 'Casing',
      materials: [
        { id: 1, name: 'Cast Iron Housing', specs: 'Material: CI, Weight: 5.2kg' },
        { id: 2, name: 'Aluminum Cover', specs: 'Material: AL6061, Weight: 1.8kg' }
      ]
    },
    {
      id: 'bearings',
      title: 'Bearings',
      materials: [
        { id: 1, name: 'SKF Deep Groove Ball Bearing', specs: 'Size: 6205, Type: Ball Bearing' },
        { id: 2, name: 'Timken Roller Bearing', specs: 'Size: 32008, Type: Tapered Roller' }
      ]
    },
    {
      id: 'accessories',
      title: 'Accessories',
      materials: [
        { id: 1, name: 'Oil Seal 25x40x7', specs: 'Particulars: NBR, Temperature: -40°C to 120°C' },
        { id: 2, name: 'Gasket Set', specs: 'Particulars: Rubber composite, Standard grade' }
      ]
    }
  ];

  const [selections, setSelections] = useState({});
  const [costs, setCosts] = useState({});

  const handleSupplierChange = (sectionId: string, materialId: number, supplierId: string) => {
    setSelections(prev => ({
      ...prev,
      [`${sectionId}-${materialId}`]: supplierId
    }));
    
    // Auto-populate unit cost based on supplier selection
    const baseCost = Math.random() * 500 + 50; // Simulated cost
    setCosts(prev => ({
      ...prev,
      [`${sectionId}-${materialId}`]: baseCost.toFixed(2)
    }));
  };

  const calculateSectionTotal = (section: any) => {
    return section.materials.reduce((total: number, material: any) => {
      const cost = parseFloat(costs[`${section.id}-${material.id}`] || '0');
      return total + cost;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return materialSections.reduce((total, section) => total + calculateSectionTotal(section), 0);
  };

  const renderMaterialSection = (section: any) => {
    return (
      <Card key={section.id} className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
            <Package className="w-5 h-5 text-blue-600" />
            {section.title}
            <Badge variant="outline" className="ml-auto">
              ${calculateSectionTotal(section).toFixed(2)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-3 px-3 py-2 bg-slate-50 rounded-lg">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Material
              </Label>
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Specifications
              </Label>
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Supplier
              </Label>
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Unit Cost
              </Label>
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Qty
              </Label>
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Total Cost
              </Label>
            </div>

            {/* Material Rows */}
            {section.materials.map((material: any) => {
              const selectionKey = `${section.id}-${material.id}`;
              const unitCost = parseFloat(costs[selectionKey] || '0');
              const quantity = 1; // Default quantity
              const totalCost = unitCost * quantity;

              return (
                <div key={material.id} className="grid grid-cols-6 gap-3 items-center p-3 bg-white border border-slate-100 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-700 text-sm">{material.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Design locked</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{material.specs}</div>
                  <div>
                    <Select onValueChange={(value) => handleSupplierChange(section.id, material.id, value)}>
                      <SelectTrigger className="h-9 text-sm border-slate-200 focus:border-blue-400">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <div>
                                <div className="font-medium">{supplier.name}</div>
                                <div className="text-xs text-slate-500">{supplier.location} • ⭐ {supplier.rating}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={costs[selectionKey] || ''}
                      onChange={(e) => setCosts(prev => ({ ...prev, [selectionKey]: e.target.value }))}
                      placeholder="0.00"
                      className="h-9 text-sm border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      defaultValue="1"
                      className="h-9 text-sm border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="font-semibold text-slate-700">
                    ${totalCost.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Supplier Selection</h2>
          <p className="text-slate-600 mt-1">Select suppliers and determine unit costs for materials</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-sm text-slate-600">Total Material Cost:</span>
          <Badge variant="default" className="bg-green-600">
            ${calculateGrandTotal().toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs value={activeProduct.toString()} onValueChange={(value) => setActiveProduct(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-5 gap-2 bg-slate-100 p-1">
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
            <div className="space-y-6">
              {materialSections.map(renderMaterialSection)}
              
              {/* Cost Summary */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-700">Total Material Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${calculateGrandTotal().toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SupplierSelection;
