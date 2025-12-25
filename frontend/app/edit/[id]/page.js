"use client";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Navbar from "../../../components/Navbar";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products`).then(res => {
      const item = res.data.find(p => p._id === id);
      setProduct(item);
      setLoading(false);
    });
  }, []);

  const update = async () => {
    await api.put(`/products/${id}`, product);
    router.push("/");
  };

  if (loading || !product) 
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Product</h2>

        {/* NAME */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Product Name</label>
          <input 
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* SKU */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">SKU</label>
          <input 
            value={product.sku}
            onChange={e => setProduct({ ...product, sku: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* QUANTITY */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Quantity</label>
          <input 
            type="number"
            value={product.quantity}
            onChange={e => setProduct({ ...product, quantity: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* REORDER LEVEL */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Reorder Level</label>
          <input 
            type="number"
            value={product.reorderLevel}
            onChange={e => setProduct({ ...product, reorderLevel: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        <button 
          onClick={update}
          className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Save Changes
        </button>

        <button 
          onClick={() => router.push("/")}
          className="w-full mt-3 text-gray-100 font-bold hover:bg-red-600 cursor-pointer bg-red-500 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
