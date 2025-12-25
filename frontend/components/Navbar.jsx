"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
            <Link href="/" style={{ marginRight: 15 }}>StockSense</Link>
            <Link href="/add-product">Add Product</Link>
        </nav>
    );
}
