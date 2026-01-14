"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import watch from "@/public/category/watch.jpg"
import axiosInstance from "@/lib/axiosInstance"

type Category = {
  name: string
  slug: string
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get<{ payload: Category[] }>("/category")
        console.log('category respons',res);
        
        setCategories(res.data.payload)
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

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop`}
            className="group lg:w-40 lg:h-40 lg:p-4 rounded-full mx-auto shadow-sm border-3 border-primary overflow-hidden"
          >
            <Image
              src={watch}
              alt={category.name}
              className="object-cover w-full h-full p-2 group-hover:scale-107 duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
