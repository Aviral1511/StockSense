"use client";
import { useState } from "react";
import { api } from "../../lib/api";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
    reorderLevel: 5
  });

  const submit = async(e)=>{
    e.preventDefault();
    await api.post("/products", form);
    router.push("/");
  }

  return (
    <div>
      <Navbar />
      <h2 style={{margin:20}}>Add Product</h2>

      <form onSubmit={submit} style={{padding:20}}>
        <input placeholder="Name" required
          onChange={e=>setForm({...form,name:e.target.value})}/> <br/><br/>

        <input placeholder="SKU" required
          onChange={e=>setForm({...form,sku:e.target.value})}/> <br/><br/>

        <input type="number" placeholder="Quantity" required
          onChange={e=>setForm({...form,quantity:e.target.value})}/> <br/><br/>

        <input type="number" placeholder="Reorder Level (default 5)"
          onChange={e=>setForm({...form,reorderLevel:e.target.value})}/> <br/><br/>

        <button type="submit" style={{padding:10,background:"black",color:"white"}}>
          Add Product
        </button>
      </form>
    </div>
  );
}
