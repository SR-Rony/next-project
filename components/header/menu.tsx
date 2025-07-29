"use client";


import Link from "next/link";

export default function MenuItem() {

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div className="hidden md:flex justify-center container mx-auto items-center bg-[#232f3e] px-4 py-2 text-sm gap-6 border-t border-gray-700">
            {menuItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-hover_color transition font-medium"
                >
                    {item.name}
                </Link>
            ))}
      </div>
    )
}