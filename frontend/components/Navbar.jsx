"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6 items-center">
            <Link href="/" className="font-bold text-lg hover:text-gray-300">StockSense</Link>
            <Link href="/add-product" className="hover:text-gray-300">Add Product</Link>
        </nav>
    );
}
