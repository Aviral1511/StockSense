"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const path = usePathname(); // to highlight active link

    const linkStyle = (route) =>
        `hover:text-gray-300 transition ${path === route ? "text-blue-400 font-semibold" : "text-white"
        }`;

    return (
        <nav className="bg-gray-900 px-6 py-4 shadow-md flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="text-white font-bold text-xl hover:text-blue-400 transition">
                StockSense
            </Link>

            {/* Right Menu */}
            <div className="flex gap-6 text-sm md:text-base">
                {/* <Link href="/" className={linkStyle("/")}>
                    Dashboard
                </Link> */}

                <Link href="/add-product" className={linkStyle("/add-product")}>
                    Add Product
                </Link>

                <Link href="/low-stock" className={linkStyle("/low-stock")}>
                    Low Stock
                </Link>
                <Link href="/suppliers" className={linkStyle("/suppliers")}>
                    Suppliers
                </Link>
            </div>
        </nav>
    );
}
