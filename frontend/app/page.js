/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");


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

  {/* Search + Filter */}
  <div className="flex flex-wrap items-center gap-4 mb-6">
    <input
      placeholder="🔍 Search by name or SKU..."
      className="px-4 py-2 w-72 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-600"
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
    />

    <select
      className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 cursor-pointer"
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All Items</option>
      <option value="low">Low Stock (⚠)</option>
      <option value="warning">Warning (🟡)</option>
      <option value="ok">In Stock (🟢)</option>
    </select>
  </div>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-5 shadow-md rounded-lg text-center">
      <p className="text-2xl font-bold text-gray-800">{products.length}</p>
      <p className="text-gray-600">Total Products</p>
    </div>

    <div className="bg-red-100 p-5 shadow-md rounded-lg text-center">
      <p className="text-2xl font-bold text-red-700">
        {products.filter(p => p.quantity <= p.reorderLevel).length}
      </p>
      <p className="text-red-600 font-medium">Low Stock</p>
    </div>

    <div className="bg-yellow-100 p-5 shadow-md rounded-lg text-center">
      <p className="text-2xl font-bold text-yellow-700">
        {products.filter(p => p.quantity > p.reorderLevel && p.quantity <= p.reorderLevel + 5).length}
      </p>
      <p className="text-yellow-600 font-medium">Warning</p>
    </div>
  </div>
  </div>


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
              {products
                .filter(p => p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search))
                .filter(p => {
                  if(filter==="low") return p.quantity <= p.reorderLevel;
                  if(filter==="warning") return p.quantity > p.reorderLevel && p.quantity <= p.reorderLevel + 5;
                  if(filter==="ok") return p.quantity > p.reorderLevel + 5;
                  return true;
                })
                .map((p, index) => {

                  let status =
                    p.quantity <= p.reorderLevel ? "Low Stock" :
                    p.quantity <= p.reorderLevel + 5 ? "Warning" :
                    "In Stock";

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
                            fetchProducts();
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
