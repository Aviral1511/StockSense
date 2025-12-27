"use client";
import {useEffect,useState} from "react";
import {api} from "../../lib/api";
import Navbar from "../../components/Navbar";

export default function Suppliers(){
  const [suppliers,setSuppliers]=useState([]);
  const [name,setName]=useState("");
  const [contact,setContact]=useState("");

  const load=()=> api.get("/suppliers").then(r=>setSuppliers(r.data));
  useEffect(()=>{load()},[]);

  const add=async()=>{
    if(!name || !contact) return alert("Enter details");
    await api.post("/suppliers",{name,contact});
    setName("");
    setContact("");
    load();
  };

  return(
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Suppliers Management</h1>

        <div className="flex flex-wrap gap-8">

          {/* Add Supplier Card */}
          <div className="bg-white p-6 w-80 shadow-md rounded-xl space-y-4">
            <h2 className="font-bold text-xl text-gray-800">Add Supplier</h2>

            <input
              value={name}
              className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Supplier Name"
              onChange={e=>setName(e.target.value)}
            />

            <input
              value={contact}
              className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contact (Phone / Email)"
              onChange={e=>setContact(e.target.value)}
            />

            <button
              onClick={add}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + Add Supplier
            </button>
          </div>

          {/* Supplier Table */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supplier List</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead>
                  <tr className="bg-gray-50 border-b font-medium">
                    <th className="py-3 px-4">S.No</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Products Provided</th>
                  </tr>
                </thead>

                <tbody>
                  {suppliers.map((s,i)=>(
                    <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-medium">{i+1}.</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">{s.name}</td>
                      <td className="py-3 px-4">{s.contact}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {s.products?.length > 0 ? s.products.map(p=>p.name).join(", ") : "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
