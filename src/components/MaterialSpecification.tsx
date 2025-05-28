
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Package, Settings, Cog, Wrench } from 'lucide-react';

interface MaterialSpecificationProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const MaterialSpecification: React.FC<MaterialSpecificationProps> = ({ data, onUpdate }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'HSG-585 GB', isExisting: true },
    { id: 2, name: 'New Product 1', isExisting: false }
  ]);
  const [activeProduct, setActiveProduct] = useState(1);

  const materialSections = [
    {
      id: 'gear-internals',
      title: 'Gear Internals',
      icon: Settings,
      fields: ['Material Name', 'OD (mm)', 'ID (mm)', 'Thk/lg (mm)', 'Weight (kg)', 'Supplier', 'Unit Cost', 'Total Cost']
    },
    {
      id: 'casing',
      title: 'Casing',
      icon: Package,
      fields: ['Material Name', 'Material', 'Weight (kg)', 'Supplier', 'Unit Cost', 'Total Cost']
    },
    {
      id: 'bearing',
      title: 'Bearing',
      icon: Cog,
      fields: ['Material Name', 'Size', 'Bearing Type', 'Make', 'Qty', 'Unit Cost', 'Total Cost']
    },
    {
      id: 'accessories',
      title: 'Other Accessories',
      icon: Wrench,
      fields: ['Name', 'Particulars', 'Cost']
    }
  ];

  const [materialData, setMaterialData] = useState({
    'gear-internals': [{}],
    'casing': [{}],
    'bearing': [{}],
    'accessories': [{}]
  });

  const addProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `New Product ${products.filter(p => !p.isExisting).length + 1}`,
      isExisting: false
    };
    setProducts([...products, newProduct]);
    setActiveProduct(newProduct.id);
  };

  const addMaterialRow = (sectionId: string) => {
    setMaterialData(prev => ({
      ...prev,
      [sectionId]: [...prev[sectionId], {}]
    }));
  };

  const removeMaterialRow = (sectionId: string, index: number) => {
    setMaterialData(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, i) => i !== index)
    }));
  };

  const renderMaterialSection = (section: any) => {
    const Icon = section.icon;
    return (
      <Card key={section.id} className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
            <Icon className="w-5 h-5 text-blue-600" />
            {section.title}
            <Badge variant="outline" className="ml-auto">
              {materialData[section.id].length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${section.fields.length}, 1fr) auto` }}>
              {section.fields.map((field) => (
                <Label key={field} className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  {field}
                </Label>
              ))}
              <div className="w-10"></div>
            </div>

            {/* Data Rows */}
            {materialData[section.id].map((row, index) => (
              <div key={index} className="grid gap-3 items-center p-3 bg-slate-50 rounded-lg" style={{ gridTemplateColumns: `repeat(${section.fields.length}, 1fr) auto` }}>
                {section.fields.map((field) => (
                  <Input
                    key={field}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="h-9 text-sm border-slate-200 focus:border-blue-400"
                  />
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMaterialRow(section.id, index)}
                  className="w-8 h-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => addMaterialRow(section.id)}
              className="w-full border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {section.title} Material
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Material Specification</h2>
          <p className="text-slate-600 mt-1">Define materials and specifications for your products</p>
        </div>
        <Button onClick={addProduct} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
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
              {materialSections.map(renderMaterialSection)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MaterialSpecification;
