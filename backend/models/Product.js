import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    reorderLevel: { type: Number, default: 5 }, // Alert threshold
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
