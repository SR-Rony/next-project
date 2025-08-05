// components/DashboardNavbar.tsx
"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserType } from "@/types/user";
import { useAppSelector } from "@/app/redux/hook/hook";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user: UserType | null = useAppSelector((state) => state.user.user);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Categorys", href: "/dashboard/categorys" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Customers", href: "/dashboard/customers" },
  ];

  const notificationCount = 3; // replace with Redux data later

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary">
            <ShoppingBag />
            <span className="hidden sm:block">Azpero</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium ${
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              aria-label="Notifications"
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>
            <Link
              href="/user/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-primary"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span>{user?.name || "Profile"}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
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
          <div className="container mx-auto px-4 py-3 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md ${
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Icons */}
            <div className="flex gap-4 mt-3">
              <button aria-label="Notifications" className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
              <Link href="/user/profile" onClick={() => setIsOpen(false)}>
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
