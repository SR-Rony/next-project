"use client";

import { useState, useEffect } from "react";
import { Home, ShoppingBag, Phone, Menu, X } from "lucide-react";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type CategoryType = {
  _id: string;
  name: string;
};

const mobileMenuItems = [
  { name: "Category", href: "#", icon: Menu },
  { name: "Home", href: "/", icon: Home },
  { name: "All Products", href: "/shop", icon: ShoppingBag },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function MobileBottomMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/category`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.payload);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  

  return (
    <>
      {/* ✅ Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#232f3e] text-white border-t border-gray-700">
        <div className="flex justify-between px-4 py-2">
          {mobileMenuItems.map((item) => {
            const Icon = item.icon;

            if (item.name === "Category") {
              return (
                <button
                  key={item.name}
                  onClick={() => setSidebarOpen(true)}
                  className="flex flex-col items-center text-xs hover:text-hover_color transition"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center text-xs hover:text-hover_color transition"
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ✅ Sidebar for Categories */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="relative bg-white w-64 h-full shadow-lg p-4 overflow-y-auto">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-bold mb-4 border-b pb-2">Categories</h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/category/${cat.name.toLowerCase()}`}
                      className="flex items-center justify-between px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm hover:bg-primary hover:text-white transition"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="font-medium">{cat.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
