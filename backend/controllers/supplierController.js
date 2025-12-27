import Supplier from "../models/Supplier.js";

export const createSupplier = async(req,res)=>{
 try{
   const s = await Supplier.create(req.body);
   res.status(201).json(s);
 }catch(e){res.status(500).json(e);}
};

export const getSuppliers = async(req,res)=>{
  const data = await Supplier.find().populate("products","name sku quantity");
  res.json(data);
};

export const assignProduct = async(req,res)=>{
  const {supplierId,productId}=req.body;
  const sup = await Supplier.findById(supplierId);
  sup.products.push(productId);
  await sup.save();
  res.json(sup);
};
