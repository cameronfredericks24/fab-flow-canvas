
import { LightningElement, api, track } from 'lwc';

export default class SupplierSelection extends LightningElement {
    @api projectData;
    
    @track products = [
        { id: 1, name: 'HSG-585 GB', isExisting: true },
        { id: 2, name: 'New Product 1', isExisting: false }
    ];
    
    @track activeProduct = 1;

    suppliers = [
        { label: 'Advanced Materials Ltd (Mumbai ⭐ 4.8)', value: 'supplier-1' },
        { label: 'Precision Components Inc (Delhi ⭐ 4.6)', value: 'supplier-2' },
        { label: 'Quality Steel Works (Chennai ⭐ 4.9)', value: 'supplier-3' },
        { label: 'Industrial Solutions (Pune ⭐ 4.7)', value: 'supplier-4' }
    ];

    materialSections = [
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

    @track selections = {};
    @track costs = {};
    @track quantities = {};

    get activeProductOptions() {
        return this.products.map(product => ({
            label: product.name + (product.isExisting ? ' (Existing)' : ''),
            value: product.id.toString()
        }));
    }

    get grandTotal() {
        return this.materialSections.reduce((total, section) => {
            return total + section.materials.reduce((sectionTotal, material) => {
                const cost = parseFloat(this.costs[`${section.id}-${material.id}`] || '0');
                const qty = parseInt(this.quantities[`${section.id}-${material.id}`] || '1');
                return sectionTotal + (cost * qty);
            }, 0);
        }, 0);
    }

    get processedMaterialSections() {
        return this.materialSections.map(section => ({
            ...section,
            materials: section.materials.map(material => {
                const key = `${section.id}-${material.id}`;
                const unitCost = parseFloat(this.costs[key] || '0');
                const quantity = parseInt(this.quantities[key] || '1');
                return {
                    ...material,
                    key,
                    unitCost,
                    quantity,
                    totalCost: unitCost * quantity,
                    hasSupplier: !!this.selections[key]
                };
            }),
            sectionTotal: section.materials.reduce((total, material) => {
                const key = `${section.id}-${material.id}`;
                const unitCost = parseFloat(this.costs[key] || '0');
                const quantity = parseInt(this.quantities[key] || '1');
                return total + (unitCost * quantity);
            }, 0)
        }));
    }

    handleProductChange(event) {
        this.activeProduct = parseInt(event.detail.value);
    }

    handleSupplierChange(event) {
        const key = event.target.dataset.key;
        const supplierId = event.detail.value;
        
        this.selections = { ...this.selections, [key]: supplierId };
        
        // Auto-populate unit cost based on supplier selection
        const baseCost = Math.random() * 500 + 50;
        this.costs = { ...this.costs, [key]: baseCost.toFixed(2) };
    }

    handleCostChange(event) {
        const key = event.target.dataset.key;
        const value = event.target.value;
        this.costs = { ...this.costs, [key]: value };
    }

    handleQuantityChange(event) {
        const key = event.target.dataset.key;
        const value = event.target.value;
        this.quantities = { ...this.quantities, [key]: value };
    }
}
