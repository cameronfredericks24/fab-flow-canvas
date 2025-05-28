
import { LightningElement, api, track } from 'lwc';

export default class ManufacturingEfforts extends LightningElement {
    @api projectData;
    
    @track products = [
        { id: 1, name: 'HSG-585 GB', isExisting: true },
        { id: 2, name: 'New Product 1', isExisting: false }
    ];
    
    @track activeProduct = 1;

    manufacturingTypes = [
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

    @track efforts = {};

    get activeProductOptions() {
        return this.products.map(product => ({
            label: product.name + (product.isExisting ? ' (Existing)' : ''),
            value: product.id.toString()
        }));
    }

    get totalEffort() {
        return Object.values(this.efforts).reduce((sum, effort) => sum + (effort.hours || 0), 0);
    }

    get manufacturingProcesses() {
        return this.manufacturingTypes.map(type => ({
            ...type,
            hours: this.efforts[type.id]?.hours || 0,
            hasEffort: (this.efforts[type.id]?.hours || 0) > 0
        }));
    }

    connectedCallback() {
        // Initialize efforts object
        this.efforts = this.manufacturingTypes.reduce((acc, type) => ({
            ...acc,
            [type.id]: { hours: 0 }
        }), {});
    }

    handleProductChange(event) {
        this.activeProduct = parseInt(event.detail.value);
    }

    handleEffortChange(event) {
        const typeId = event.target.dataset.typeId;
        const hours = parseInt(event.target.value) || 0;
        
        this.efforts = {
            ...this.efforts,
            [typeId]: { hours }
        };
    }
}
