
import { LightningElement, track } from 'lwc';

export default class ManufacturingCostingWizard extends LightningElement {
    @track currentStep = 1;
    @track projectData = {
        products: [],
        manufacturingEfforts: {},
        supplierSelections: {},
        manufacturingCosts: {},
        salesData: {}
    };

    steps = [
        { 
            id: 1, 
            title: 'Material Specification', 
            description: 'Define product materials and specifications',
            role: 'Design Team',
            component: 'c-material-specification'
        },
        { 
            id: 2, 
            title: 'Manufacturing Efforts', 
            description: 'Estimate manufacturing time requirements',
            role: 'Design Team',
            component: 'c-manufacturing-efforts'
        },
        { 
            id: 3, 
            title: 'Supplier Selection', 
            description: 'Select suppliers and get unit costs',
            role: 'Costing Team',
            component: 'c-supplier-selection'
        },
        { 
            id: 4, 
            title: 'Manufacturing Costs', 
            description: 'Review manufacturing costs and direct expenses',
            role: 'Costing Team',
            component: 'c-manufacturing-costs'
        },
        { 
            id: 5, 
            title: 'Sales Summary', 
            description: 'Set margins, discounts and generate quote',
            role: 'Sales Team',
            component: 'c-sales-summary'
        }
    ];

    get currentStepData() {
        return this.steps.find(step => step.id === this.currentStep);
    }

    get progressValue() {
        return (this.currentStep / this.steps.length) * 100;
    }

    get isPreviousDisabled() {
        return this.currentStep === 1;
    }

    get isNextDisabled() {
        return this.currentStep === this.steps.length;
    }

    get showMaterialSpecification() {
        return this.currentStep === 1;
    }

    get showManufacturingEfforts() {
        return this.currentStep === 2;
    }

    get showSupplierSelection() {
        return this.currentStep === 3;
    }

    get showManufacturingCosts() {
        return this.currentStep === 4;
    }

    get showSalesSummary() {
        return this.currentStep === 5;
    }

    handleNext() {
        if (this.currentStep < this.steps.length) {
            this.currentStep++;
        }
    }

    handlePrevious() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    handleStepClick(event) {
        this.currentStep = parseInt(event.target.dataset.stepId);
    }

    handleDataUpdate(event) {
        this.projectData = { ...this.projectData, ...event.detail };
    }
}
