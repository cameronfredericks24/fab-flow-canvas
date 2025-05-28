
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, Calculator } from 'lucide-react';

interface ManufacturingEffortsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ManufacturingEfforts: React.FC<ManufacturingEffortsProps> = ({ data, onUpdate }) => {
  const [products] = useState([
    { id: 1, name: 'HSG-585 GB', isExisting: true },
    { id: 2, name: 'New Product 1', isExisting: false }
  ]);
  const [activeProduct, setActiveProduct] = useState(1);

  const manufacturingTypes = [
    { id: 'hobbing', name: 'Hobbing', ref: 'HOB-001' },
    { id: 'profile-grinding', name: 'Profile Grinding', ref: 'PG-002' },
    { id: 'vtl', name: 'VTL', ref: 'VTL-003' },
    { id: 'vgm', name: 'VGM', ref: 'VGM-004' },
    { id: 'cyl-grinding', name: 'Cyl Grinding', ref: 'CG-005' },
    { id: 'boring', name: 'Boring', ref: 'BOR-006' },
    { id: 'hmc', name: 'HMC', ref: 'HMC-007' },
    { id: 'heavy-duty-lathes', name: 'Heavy duty lathes', ref: 'HDL-008' },
    { id: 'vmc', name: 'VMC', ref: 'VMC-009' }
  ];

  const [efforts, setEfforts] = useState(
    manufacturingTypes.reduce((acc, type) => ({
      ...acc,
      [type.id]: { hours: 0 }
    }), {})
  );

  const totalEffort = Object.values(efforts).reduce((sum: number, effort: any) => sum + (effort.hours || 0), 0);

  const handleEffortChange = (typeId: string, hours: number) => {
    setEfforts(prev => ({
      ...prev,
      [typeId]: { hours }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manufacturing Details</h2>
          <p className="text-slate-600 mt-1">Estimate manufacturing effort hours for each process</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-slate-600">Total Effort:</span>
          <Badge variant="default" className="bg-blue-600">
            {totalEffort} hrs
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
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Manufacturing Processes
                  <Badge variant="outline" className="ml-auto">
                    {manufacturingTypes.length} processes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-slate-50 rounded-lg">
                    <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Mfg Type
                    </Label>
                    <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Ref
                    </Label>
                    <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Est. Effort (hrs)
                    </Label>
                    <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Status
                    </Label>
                  </div>

                  {/* Manufacturing Types */}
                  {manufacturingTypes.map((type) => (
                    <div key={type.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-white border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
                      <div className="font-medium text-slate-700">
                        {type.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {type.ref}
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="0"
                          value={efforts[type.id]?.hours || ''}
                          onChange={(e) => handleEffortChange(type.id, parseInt(e.target.value) || 0)}
                          className="h-9 text-sm border-slate-200 focus:border-blue-400"
                        />
                      </div>
                      <div>
                        {efforts[type.id]?.hours > 0 ? (
                          <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                            Estimated
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-400">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">Total Manufacturing Effort</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">{totalEffort}</span>
                        <span className="text-sm text-slate-500">hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManufacturingEfforts;
