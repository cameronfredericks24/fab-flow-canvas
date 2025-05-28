
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from 'lucide-react';
import MaterialSpecification from '@/components/MaterialSpecification';
import ManufacturingEfforts from '@/components/ManufacturingEfforts';
import SupplierSelection from '@/components/SupplierSelection';
import ManufacturingCosts from '@/components/ManufacturingCosts';
import SalesSummary from '@/components/SalesSummary';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    products: [],
    manufacturingEfforts: {},
    supplierSelections: {},
    manufacturingCosts: {},
    salesData: {}
  });

  const steps = [
    { 
      id: 1, 
      title: 'Material Specification', 
      description: 'Define product materials and specifications',
      role: 'Design Team',
      component: MaterialSpecification
    },
    { 
      id: 2, 
      title: 'Manufacturing Efforts', 
      description: 'Estimate manufacturing time requirements',
      role: 'Design Team',
      component: ManufacturingEfforts
    },
    { 
      id: 3, 
      title: 'Supplier Selection', 
      description: 'Select suppliers and get unit costs',
      role: 'Costing Team',
      component: SupplierSelection
    },
    { 
      id: 4, 
      title: 'Manufacturing Costs', 
      description: 'Review manufacturing costs and direct expenses',
      role: 'Costing Team',
      component: ManufacturingCosts
    },
    { 
      id: 5, 
      title: 'Sales Summary', 
      description: 'Set margins, discounts and generate quote',
      role: 'Sales Team',
      component: SalesSummary
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const updateProjectData = (stepData: any) => {
    setProjectData(prev => ({ ...prev, ...stepData }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Make-to-Order Manufacturing Costing
          </h1>
          <p className="text-slate-600 text-lg">
            Streamlined workflow for design specifications, costing analysis, and quote generation
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div 
                  className={`flex items-center cursor-pointer transition-all duration-300 ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep > step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : currentStep === step.id
                        ? 'bg-blue-100 border-blue-600 text-blue-600'
                        : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`font-semibold ${currentStep >= step.id ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-500">{step.description}</p>
                    <Badge variant={currentStep >= step.id ? "default" : "secondary"} className="mt-1 text-xs">
                      {step.role}
                    </Badge>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="p-8">
            {CurrentComponent && (
              <CurrentComponent 
                data={projectData} 
                onUpdate={updateProjectData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentStep={currentStep}
                totalSteps={steps.length}
              />
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 text-slate-600 border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2 text-slate-500">
            Step {currentStep} of {steps.length}
          </div>

          <Button 
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
