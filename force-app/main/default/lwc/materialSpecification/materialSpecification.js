
import { LightningElement, api, track } from 'lwc';

export default class MaterialSpecification extends LightningElement {
    @api projectData;
    
    @track products = [
        { id: 1, name: 'HSG-585 GB', isExisting: true },
        { id: 2, name: 'New Product 1', isExisting: false }
    ];
    
    @track activeProduct = 1;
    
    materialSections = [
        {
            id: 'gear-internals',
            title: 'Gear Internals',
            fields: ['Material Name', 'OD (mm)', 'ID (mm)', 'Thk/lg (mm)', 'Weight (kg)', 'Supplier', 'Unit Cost', 'Total Cost']
        },
        {
            id: 'casing',
            title: 'Casing',
            fields: ['Material Name', 'Material', 'Weight (kg)', 'Supplier', 'Unit Cost', 'Total Cost']
        },
        {
            id: 'bearing',
            title: 'Bearing',
            fields: ['Material Name', 'Size', 'Bearing Type', 'Make', 'Qty', 'Unit Cost', 'Total Cost']
        },
        {
            id: 'accessories',
            title: 'Other Accessories',
            fields: ['Name', 'Particulars', 'Cost']
        }
    ];

    @track materialData = {
        'gear-internals': [{}],
        'casing': [{}],
        'bearing': [{}],
        'accessories': [{}]
    };

    get activeProductOptions() {
        return this.products.map(product => ({
            label: product.name + (product.isExisting ? ' (Existing)' : ''),
            value: product.id.toString()
        }));
    }

    get currentProductName() {
        const product = this.products.find(p => p.id === this.activeProduct);
        return product ? product.name : '';
    }

    handleProductChange(event) {
        this.activeProduct = parseInt(event.detail.value);
    }

    handleAddProduct() {
        const newProduct = {
            id: this.products.length + 1,
            name: `New Product ${this.products.filter(p => !p.isExisting).length + 1}`,
            isExisting: false
        };
        this.products = [...this.products, newProduct];
        this.activeProduct = newProduct.id;
    }

    handleAddMaterialRow(event) {
        const sectionId = event.target.dataset.sectionId;
        this.materialData = {
            ...this.materialData,
            [sectionId]: [...this.materialData[sectionId], {}]
        };
    }

    handleRemoveMaterialRow(event) {
        const sectionId = event.target.dataset.sectionId;
        const index = parseInt(event.target.dataset.index);
        this.materialData = {
            ...this.materialData,
            [sectionId]: this.materialData[sectionId].filter((_, i) => i !== index)
        };
    }

    handleFieldChange(event) {
        const sectionId = event.target.dataset.sectionId;
        const index = parseInt(event.target.dataset.index);
        const field = event.target.dataset.field;
        const value = event.target.value;
        
        const updatedSection = [...this.materialData[sectionId]];
        updatedSection[index] = { ...updatedSection[index], [field]: value };
        
        this.materialData = {
            ...this.materialData,
            [sectionId]: updatedSection
        };
    }
}
