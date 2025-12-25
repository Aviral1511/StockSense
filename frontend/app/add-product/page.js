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
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>

        <form onSubmit={submit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              required
              placeholder="Enter product name"
              onChange={e=>setForm({...form,name:e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">SKU</label>
            <input
              required
              placeholder="Unique SKU code"
              onChange={e=>setForm({...form,sku:e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              required
              type="number"
              placeholder="Available quantity"
              onChange={e=>setForm({...form,quantity:e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Reorder Level</label>
            <input
              type="number"
              defaultValue={5}
              placeholder="Default is 5"
              onChange={e=>setForm({...form,reorderLevel:e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
                       hover:bg-green-700 transition cursor-pointer">
            Add Product
          </button>

          <button 
            type="button"
            onClick={()=>router.push("/")}
            className="w-full text-gray-100 font-bold hover:bg-red-600 cursor-pointer bg-red-500 py-3 rounded-lg">
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}
