"use client";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Navbar from "../../../components/Navbar";
import { useParams, useRouter } from "next/navigation";

export default function ViewProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get(`/products`).then(res=>{
      setProduct(res.data.find(p=>p._id===id));
    });
    api.get("/suppliers").then(res=>{
      setSuppliers(res.data.filter(s=>s.products.includes(id)));
    });
  }, []);

  if (!product) 
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;

  // Determine stock status
  let status =
    product.quantity <= product.reorderLevel ? "Low Stock" :
    product.quantity <= product.reorderLevel + 5 ? "Warning" : "Stock OK";

  const statusColor = {
    "Low Stock": "bg-red-100 text-red-700",
    "Warning": "bg-yellow-100 text-yellow-700",
    "Stock OK": "bg-green-100 text-green-700"
  }[status];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={()=>router.push("/")}
            className="text-gray-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-5">

          {/* Product Info */}
          <div>
            <p className="text-gray-700"><strong>SKU:</strong> {product.sku}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="text-gray-700"><strong>Reorder Level:</strong> {product.reorderLevel}</p>

            <p className="flex items-center gap-2 mt-2">
              <strong>Status:</strong>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                {status}
              </span>
            </p>
          </div>

          <hr/>

          {/* Supplier Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Suppliers linked to this product:</h3>

            {suppliers.length > 0 ? (
              <ul className="space-y-2">
                {suppliers.map(s=>(
                  <li key={s._id} className="bg-gray-50 p-3 border rounded-lg">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm text-gray-600">{s.contact}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No supplier linked to this product</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={()=>router.push(`/edit/${product._id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Product
            </button>
            
            <button
              onClick={async ()=>{
                if(!confirm("Are you sure you want to delete this product?")) return;
                await api.delete(`/products/${product._id}`);
                router.push("/");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
