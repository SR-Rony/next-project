"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
};

// Debounce helper
function debounceString(func: (arg: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (arg: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(arg), delay);
  };
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  // Create debounced function with useRef (BEST PRACTICE)
  const fetchSearchRef = useRef(
    debounceString(async (searchText: string) => {
      try {
        if (!searchText.trim()) {
          setResults([]);
          return;
        }
        setLoading(true);

        const res = await axiosInstance.get(`/product/search`, {
          params: { query: searchText },
        });

        setResults(res.data.products || []);
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    fetchSearchRef.current(value);
  };

  // Click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto flex flex-col gap-2 px-2 sm:px-0">

      {/* Search Input */}
      <div className="flex w-full shadow-md rounded-lg overflow-hidden border border-gray-700">
        <Input
          placeholder="Product search ..."
          className="flex-1 rounded-none bg-gray-900 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-primary transition"
          value={query}
          onChange={handleChange}
        />
        <Button className="bg-primary text-black rounded-none px-4 hover:bg-primary/90 transition">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Dropdown */}
      <div
        className={clsx(
          "absolute top-full mt-2 w-full rounded-md shadow-lg border border-gray-700 bg-gray-900 z-50 overflow-y-auto transition-all duration-300 ease-out",
          results.length || loading ? "max-h-80 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
        )}
      >
        {loading ? (
          <p className="px-4 py-2 text-gray-400">Products search...</p>
        ) : results.length > 0 ? (
          results.map((product, index) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className={clsx(
                "flex items-center px-4 py-2 border-b border-gray-700 transition transform duration-150",
                index === activeIndex ? "bg-gray-800 scale-105" : "hover:bg-gray-800"
              )}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded mr-4"
              />

              <div className="flex-1">
                <p className="truncate">{product.name}</p>
                <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        ) : query.trim() ? (
          <p className="px-4 py-2 text-gray-400">Product not found</p>
        ) : null}
      </div>
    </div>
  );
}
