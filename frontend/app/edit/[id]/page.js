"use client";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Navbar from "../../../components/Navbar";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    api.get(`/products`).then(res=>{
      const item = res.data.find(p=>p._id===id);
      setProduct(item);
    })
  },[]);

  const update = async ()=>{
    await api.put(`/products/${id}`, product);
    router.push("/");
  }

  if(!product) return "Loading...";

  return (
    <div>
      <Navbar/>
      <h2 style={{margin:20}}>Update Product</h2>

      <div style={{padding:20}}>
        <input value={product.quantity}
          type="number"
          onChange={e=>setProduct({...product, quantity:e.target.value})}/>
        <br/><br/>

        <button onClick={update} style={{padding:10,background:"black",color:"white"}}>
          Save
        </button>
      </div>
    </div>
  );
}
