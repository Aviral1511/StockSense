import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

// Create product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update product
export const updateProduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{ new: true });

        // check stock drop
        if(product.quantity <= product.reorderLevel){
           const suppliers = await Supplier.find({products:product._id});
           suppliers.forEach(s=>{
             if(s.contact.includes("@")) sendAlert(s.contact,product);
           });
        }
        
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
