
import { LightningElement, api, track } from 'lwc';

export default class SalesSummary extends LightningElement {
    @api projectData;
    
    @track products = [
        { id: 1, name: 'HSG-585 GB', isExisting: true },
        { id: 2, name: 'New Product 1', isExisting: false }
    ];
    
    @track activeProduct = 1;

    @track pricingData = {
        margin: 25,
        discount: 0,
        taxes: 18,
        shippingCost: 150
    };

    // Sample data - would come from previous steps
    totalManufacturingCost = 2850.00;

    get activeProductOptions() {
        return this.products.map(product => ({
            label: product.name + (product.isExisting ? ' (Existing)' : ''),
            value: product.id.toString()
        }));
    }

    get basePrice() {
        return this.totalManufacturingCost * (1 + this.pricingData.margin / 100);
    }

    get discountAmount() {
        return this.basePrice * (this.pricingData.discount / 100);
    }

    get priceAfterDiscount() {
        return this.basePrice - this.discountAmount;
    }

    get taxAmount() {
        return this.priceAfterDiscount * (this.pricingData.taxes / 100);
    }

    get finalQuotePrice() {
        return this.priceAfterDiscount + this.taxAmount + this.pricingData.shippingCost;
    }

    get profitMargin() {
        return ((this.finalQuotePrice - this.totalManufacturingCost - this.pricingData.shippingCost - this.taxAmount) / this.finalQuotePrice * 100).toFixed(1);
    }

    get quoteSummary() {
        return [
            { label: 'Manufacturing Cost', amount: this.totalManufacturingCost, type: 'cost' },
            { label: 'Base Price (with margin)', amount: this.basePrice, type: 'price' },
            { label: 'Discount Applied', amount: -this.discountAmount, type: 'discount' },
            { label: 'Price After Discount', amount: this.priceAfterDiscount, type: 'price' },
            { label: 'Taxes (GST)', amount: this.taxAmount, type: 'tax' },
            { label: 'Shipping Cost', amount: this.pricingData.shippingCost, type: 'shipping' },
            { label: 'Final Quote Price', amount: this.finalQuotePrice, type: 'total' }
        ];
    }

    handleProductChange(event) {
        this.activeProduct = parseInt(event.detail.value);
    }

    handleMarginChange(event) {
        this.pricingData = { ...this.pricingData, margin: parseFloat(event.target.value) || 0 };
    }

    handleDiscountChange(event) {
        this.pricingData = { ...this.pricingData, discount: parseFloat(event.target.value) || 0 };
    }

    handleTaxChange(event) {
        this.pricingData = { ...this.pricingData, taxes: parseFloat(event.target.value) || 0 };
    }

    handleShippingChange(event) {
        this.pricingData = { ...this.pricingData, shippingCost: parseFloat(event.target.value) || 0 };
    }

    handleGenerateQuote() {
        // Implementation for quote generation
        console.log('Generating quote...', this.quoteSummary);
        // Would typically call Apex method to generate PDF and send email
    }

    handleSaveQuote() {
        // Implementation for saving quote
        console.log('Saving quote...', this.pricingData);
        // Would typically call Apex method to save quote record
    }
}
