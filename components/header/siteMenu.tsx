"use client";

import Link from "next/link";
import { SheetContent } from "../ui/sheet";
import { useEffect, useState } from "react";
import { Loader2, List } from "lucide-react";

type CategoryType = {
  _id: string;
  name: string;
  slug: string;
};

export default function SiteMenu() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/category");
        const data = await res.json();
        setCategories(data.payload);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <SheetContent side="left" className="w-72 bg-white text-black p-6">
      <p className="text-xl font-bold flex items-center gap-2 mb-4">
        <List className="h-5 w-5" /> All Categories
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid gap-3 grid-rows">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="block px-4 py-2 rounded-md border hover:bg-primary hover:text-white transition text-sm font-medium"
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No categories found.</p>
      )}
    </SheetContent>
  );
}
