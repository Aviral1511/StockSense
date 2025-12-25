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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{margin:20}}>Inventory Dashboard</h2>

      <table border="1" cellPadding="10" style={{margin:"20px auto", width:"85%"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => {
            let status =
              p.quantity <= p.reorderLevel ? "Low Stock" :
              p.quantity <= p.reorderLevel + 5 ? "Warning" : "OK";

            return (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.quantity}</td>

                <td style={{
                  color: status==="Low Stock" ? "red" :
                        status==="Warning" ? "orange" : "green",
                  fontWeight:"bold"
                }}>
                  {status}
                </td>

                <td>
                  <Link href={`/edit/${p._id}`}>Edit</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
