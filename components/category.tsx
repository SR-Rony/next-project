"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Category = {
  name: string
  slug: string
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/category")
        const data = await res.json()
        setCategories(data.payload)
      } catch (error) {
        console.error("Failed to load categories", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Explore Categories
        </h2>
        <p className="text-gray-500">Browse products by category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md hover:border-primary transition-all duration-200"
          >
            <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
