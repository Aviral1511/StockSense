"use client";
import {Bar, Pie} from 'react-chartjs-2';
import {useEffect,useState} from "react";
import Navbar from "../../components/Navbar";
import {api} from "../../lib/api";
import {Chart,CategoryScale,LinearScale,BarElement,ArcElement,Tooltip,Legend} from 'chart.js';
Chart.register(CategoryScale,LinearScale,BarElement,ArcElement,Tooltip,Legend);

export default function Analytics(){
  const [data,setData]=useState([]);

  useEffect(()=>{api.get("/products").then(r=>setData(r.data))},[]);

  // Status Counts
  const low = data.filter(p => p.quantity <= p.reorderLevel).length;
  const warning = data.filter(p => p.quantity > p.reorderLevel && p.quantity <= p.reorderLevel + 5).length;
  const normal = data.filter(p => p.quantity > p.reorderLevel + 5).length;

  // Bar Chart
  const barData = {
    labels: data.map(p=>p.name),
    datasets:[{
      label:"Stock Quantity",
      data:data.map(p=>p.quantity),
      backgroundColor: data.map(p =>
        p.quantity <= p.reorderLevel ? "rgba(239,68,68,0.7)" :          // red
        p.quantity <= p.reorderLevel + 5 ? "rgba(234,179,8,0.7)" :      // yellow
                                          "rgba(34,197,94,0.7)"         // green
      ),
      borderRadius:6
    }]
  };

  // Pie Chart
  const pieData = {
    labels:["Low Stock","Warning","Normal"],
    datasets:[{
      data:[low,warning,normal],
      backgroundColor:["#ef4444","#eab308","#22c55e"], // red, yellow, green
      hoverOffset:8
    }]
  };

  return(
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      <div className="p-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Analytics Overview</h2>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">

          <div className="bg-white shadow-md p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-gray-600">{data.length}</p>
            <p className="text-gray-700">Total Products</p>
          </div>

          <div className="bg-red-100 shadow-md p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-red-700">{low}</p>
            <p className="text-red-700 font-medium">Low Stock</p>
          </div>

          <div className="bg-yellow-100 shadow-md p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-yellow-700">{warning}</p>
            <p className="text-yellow-700 font-medium">Warning Stock</p>
          </div>

          <div className="bg-green-100 shadow-md p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-green-700">{normal}</p>
            <p className="text-green-700 font-medium">Healthy Stock</p>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Stock Quantity by Product</h3>
            <Bar data={barData}/>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Stock Distribution</h3>
            <div className="w-64 h-64">
              <Pie data={pieData}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
