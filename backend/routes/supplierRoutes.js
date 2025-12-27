import express from "express";
import {createSupplier,getSuppliers,assignProduct} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/",createSupplier);
router.get("/",getSuppliers);
router.post("/assign",assignProduct);

export default router;
