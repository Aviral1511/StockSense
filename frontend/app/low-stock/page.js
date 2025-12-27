"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Navbar from "../../components/Navbar";

export default function LowStock() {
  const [items,setItems] = useState([]);

  useEffect(()=>{
    api.get("/products").then(res=>{
      const filtered = res.data.filter(p => p.quantity <= p.reorderLevel);
      setItems(filtered);
    })
  },[]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Low Stock Items</h2>

        {/* Alert Badge */}
        <div className="mb-6">
          {items.length > 0 ? (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg font-medium shadow-sm">
              ⚠ {items.length} product{items.length > 1 && "s"} need restocking!
            </div>
          ) : (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium shadow-sm">
              🎉 All products are well stocked!
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="bg-red-50 border-b">
                  <th className="py-4 px-5 font-semibold">S.No</th>
                  <th className="py-4 px-5 font-semibold">Name</th>
                  <th className="py-4 px-5 font-semibold">SKU</th>
                  <th className="py-4 px-5 font-semibold">Qty</th>
                </tr>
              </thead>

              <tbody>
                {items.map((i, index)=>(
                  <tr key={i._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-5 font-medium">{index + 1}</td>
                    <td className="py-4 px-5 font-semibold text-gray-800">{i.name}</td>
                    <td className="py-4 px-5">{i.sku}</td>
                    <td className="py-4 px-5 text-red-600 font-bold">{i.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
