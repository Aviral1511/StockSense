import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

export default mongoose.model("Supplier", supplierSchema);
