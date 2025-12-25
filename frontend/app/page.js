/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h2>
          <Link href="/add-product" 
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-4 px-5 font-bold">S.No</th>
                <th className="py-4 px-5 font-bold">Product Name</th>
                <th className="py-4 px-5 font-bold">SKU</th>
                <th className="py-4 px-5 font-bold">Quantity</th>
                <th className="py-4 px-5 font-bold">Status</th>
                <th className="py-4 px-5 font-bold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => {
                let status =
                  p.quantity <= p.reorderLevel ? "Low Stock" :
                  p.quantity <= p.reorderLevel + 5 ? "Warning" : "In Stock";

                const statusColor = {
                  "Low Stock": "bg-red-100 text-red-700",
                  "Warning": "bg-yellow-100 text-yellow-700",
                  "In Stock": "bg-green-100 text-green-700"
                }[status];

                return (
                  <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-5 font-medium">{index + 1}.</td>
                    <td className="py-4 px-5 font-medium">{p.name}</td>
                    <td className="py-4 px-5">{p.sku}</td>
                    <td className="py-4 px-5">{p.quantity}</td>

                    <td className="py-4 px-5">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                        {status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-center flex justify-center gap-2">
                      <Link href={`/edit/${p._id}`}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer">
                        Edit
                      </Link>
                      <Link href={`/view/${p._id}`}
                        className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition cursor-pointer">
                        View
                      </Link>
                      <button
                        onClick={async ()=>{
                        await api.delete(`/products/${p._id}`);
                        fetchProducts(); // refresh list
                        }}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition cursor-pointer">
                        Delete
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
