
import { LightningElement, api, track } from 'lwc';

export default class ManufacturingCosts extends LightningElement {
    @api projectData;
    
    @track products = [
        { id: 1, name: 'HSG-585 GB', isExisting: true },
        { id: 2, name: 'New Product 1', isExisting: false }
    ];
    
    @track activeProduct = 1;

    @track directCosts = {
        labor: 0,
        overhead: 0,
        utilities: 0,
        maintenance: 0,
        quality: 0,
        packaging: 0
    };

    // Sample data - would come from previous steps in real implementation
    materialCost = 1250.00;
    manufacturingHours = 45;
    hourlyRate = 25.00;

    get activeProductOptions() {
        return this.products.map(product => ({
            label: product.name + (product.isExisting ? ' (Existing)' : ''),
            value: product.id.toString()
        }));
    }

    get manufacturingCost() {
        return this.manufacturingHours * this.hourlyRate;
    }

    get totalDirectCosts() {
        return Object.values(this.directCosts).reduce((sum, cost) => sum + (parseFloat(cost) || 0), 0);
    }

    get totalManufacturingCost() {
        return this.materialCost + this.manufacturingCost + this.totalDirectCosts;
    }

    get costBreakdown() {
        const total = this.totalManufacturingCost;
        return [
            {
                category: 'Material Costs',
                amount: this.materialCost,
                percentage: ((this.materialCost / total) * 100).toFixed(1)
            },
            {
                category: 'Manufacturing Labor',
                amount: this.manufacturingCost,
                percentage: ((this.manufacturingCost / total) * 100).toFixed(1)
            },
            {
                category: 'Direct Costs',
                amount: this.totalDirectCosts,
                percentage: ((this.totalDirectCosts / total) * 100).toFixed(1)
            }
        ];
    }

    get directCostItems() {
        return [
            { id: 'labor', label: 'Additional Labor', value: this.directCosts.labor },
            { id: 'overhead', label: 'Factory Overhead', value: this.directCosts.overhead },
            { id: 'utilities', label: 'Utilities', value: this.directCosts.utilities },
            { id: 'maintenance', label: 'Equipment Maintenance', value: this.directCosts.maintenance },
            { id: 'quality', label: 'Quality Control', value: this.directCosts.quality },
            { id: 'packaging', label: 'Packaging & Shipping', value: this.directCosts.packaging }
        ];
    }

    handleProductChange(event) {
        this.activeProduct = parseInt(event.detail.value);
    }

    handleDirectCostChange(event) {
        const costId = event.target.dataset.costId;
        const value = parseFloat(event.target.value) || 0;
        this.directCosts = { ...this.directCosts, [costId]: value };
    }
}
