// components/DashboardNavbar.tsx
"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, Bell, User } from "lucide-react";
import Link from "next/link";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Customers", href: "/dashboard/customers" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full z-50  top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary">
            <ShoppingBag className="" />
            Azpero
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>
            <Link href="/dashboard/profile">
              <User className="h-5 w-5 text-gray-600" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <Link href="/dashboard/profile">
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
