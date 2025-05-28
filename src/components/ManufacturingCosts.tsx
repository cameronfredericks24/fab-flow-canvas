import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Factory, DollarSign, Plus, Trash2, Package, Calculator } from 'lucide-react';

interface ManufacturingCostsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ManufacturingCosts: React.FC<ManufacturingCostsProps> = ({ data, onUpdate }) => {
  const [products] = useState([
    { id: 1, name: 'HSG-585 GB', isExisting: true },
    { id: 2, name: 'New Product 1', isExisting: false }
  ]);
  const [activeProduct, setActiveProduct] = useState(1);

  const [manufacturingCosts] = useState([
    { id: 'hobbing', name: 'Hobbing', hours: 8.5, hourlyRate: 45, total: 382.5 },
    { id: 'profile-grinding', name: 'Profile Grinding', hours: 4.2, hourlyRate: 65, total: 273 },
    { id: 'vtl', name: 'VTL', hours: 6.0, hourlyRate: 55, total: 330 },
    { id: 'vgm', name: 'VGM', hours: 3.5, hourlyRate: 70, total: 245 },
    { id: 'cyl-grinding', name: 'Cyl Grinding', hours: 5.8, hourlyRate: 60, total: 348 },
    { id: 'boring', name: 'Boring', hours: 7.2, hourlyRate: 50, total: 360 },
    { id: 'hmc', name: 'HMC', hours: 4.5, hourlyRate: 75, total: 337.5 },
    { id: 'heavy-duty-lathes', name: 'Heavy duty lathes', hours: 9.1, hourlyRate: 40, total: 364 },
    { id: 'vmc', name: 'VMC', hours: 3.8, hourlyRate: 80, total: 304 }
  ]);

  const [directCosts, setDirectCosts] = useState([
    { id: 1, name: 'Quality Inspection', amount: 150, enabled: true, isOptional: false },
    { id: 2, name: 'Packaging Materials', amount: 85, enabled: true, isOptional: false },
    { id: 3, name: 'Heat Treatment', amount: 320, enabled: false, isOptional: true },
    { id: 4, name: 'Surface Coating', amount: 180, enabled: false, isOptional: true },
    { id: 5, name: 'Special Tooling', amount: 250, enabled: false, isOptional: true }
  ]);

  const [customDirectCosts, setCustomDirectCosts] = useState([]);

  const addCustomDirectCost = () => {
    const newCost = {
      id: Date.now(),
      name: '',
      amount: 0,
      enabled: true,
      isCustom: true
    };
    setCustomDirectCosts([...customDirectCosts, newCost]);
  };

  const removeCustomDirectCost = (id: number) => {
    setCustomDirectCosts(customDirectCosts.filter(cost => cost.id !== id));
  };

  const updateDirectCost = (id: number, field: string, value: any) => {
    setDirectCosts(prev => prev.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    ));
  };

  const updateCustomDirectCost = (id: number, field: string, value: any) => {
    setCustomDirectCosts(prev => prev.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    ));
  };

  const totalManufacturingCosts = manufacturingCosts.reduce((sum, cost) => sum + cost.total, 0);
  const totalDirectCosts = [...directCosts, ...customDirectCosts]
    .filter(cost => cost.enabled)
    .reduce((sum, cost) => sum + cost.amount, 0);
  const grandTotal = totalManufacturingCosts + totalDirectCosts;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manufacturing Costs</h2>
          <p className="text-slate-600 mt-1">Review manufacturing costs and add direct expenses</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
          <Calculator className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-slate-600">Total Cost:</span>
          <Badge variant="default" className="bg-purple-600">
            ${grandTotal.toFixed(2)}
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
            <div className="space-y-6">
              {/* Manufacturing Costs */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                    <Factory className="w-5 h-5 text-blue-600" />
                    Manufacturing Process Costs
                    <Badge variant="outline" className="ml-auto">
                      ${totalManufacturingCosts.toFixed(2)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-slate-50 rounded-lg">
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Process
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Hours
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Rate/Hour
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Total Cost
                      </Label>
                    </div>

                    {/* Manufacturing Cost Rows */}
                    {manufacturingCosts.map((cost) => (
                      <div key={cost.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-white border border-slate-100 rounded-lg">
                        <div className="font-medium text-slate-700">{cost.name}</div>
                        <div className="text-sm text-slate-600">{cost.hours} hrs</div>
                        <div className="text-sm text-slate-600">${cost.hourlyRate}/hr</div>
                        <div className="font-semibold text-green-600">${cost.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Direct Costs */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Direct Costs
                    <Badge variant="outline" className="ml-auto">
                      ${totalDirectCosts.toFixed(2)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-slate-50 rounded-lg">
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Cost Item
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Amount
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Status
                      </Label>
                      <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Include
                      </Label>
                    </div>

                    {/* Standard Direct Costs */}
                    {directCosts.map((cost) => (
                      <div key={cost.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-white border border-slate-100 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">{cost.name}</span>
                          {cost.isOptional && (
                            <Badge variant="outline" className="text-xs">Optional</Badge>
                          )}
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={cost.amount}
                            onChange={(e) => updateDirectCost(cost.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="h-9 text-sm border-slate-200 focus:border-blue-400"
                          />
                        </div>
                        <div>
                          {cost.enabled ? (
                            <Badge variant="default" className="bg-green-100 text-green-700">Included</Badge>
                          ) : (
                            <Badge variant="outline" className="text-slate-400">Excluded</Badge>
                          )}
                        </div>
                        <div>
                          <Switch
                            checked={cost.enabled}
                            onCheckedChange={(checked) => updateDirectCost(cost.id, 'enabled', checked)}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Custom Direct Costs */}
                    {customDirectCosts.map((cost) => (
                      <div key={cost.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div>
                          <Input
                            placeholder="Cost item name"
                            value={cost.name}
                            onChange={(e) => updateCustomDirectCost(cost.id, 'name', e.target.value)}
                            className="h-9 text-sm border-slate-200 focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={cost.amount}
                            onChange={(e) => updateCustomDirectCost(cost.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="h-9 text-sm border-slate-200 focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <Badge variant="default" className="bg-blue-100 text-blue-700">Custom</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={cost.enabled}
                            onCheckedChange={(checked) => updateCustomDirectCost(cost.id, 'enabled', checked)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCustomDirectCost(cost.id)}
                            className="w-8 h-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addCustomDirectCost}
                      className="w-full border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Custom Direct Cost
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Summary */}
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Manufacturing Costs</span>
                      <span className="font-medium">${totalManufacturingCosts.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Direct Costs</span>
                      <span className="font-medium">${totalDirectCosts.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-purple-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-700">Total Manufacturing Cost</span>
                        <span className="text-2xl font-bold text-purple-600">${grandTotal.toFixed(2)}</span>
                      </div>
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

export default ManufacturingCosts;
