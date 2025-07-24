"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import cate from "@/public/category/category.jpg"
import shose from "@/public/category/shose.png"
import watch from "@/public/category/watch.jpeg"
import dress from "@/public/category/dress.jpg"

type Category = {
  name: string
  slug: string
  image: string | StaticImageData
}

const categories: Category[] = [
  {
    name: "Shoes",
    slug: "shoes",
    image: shose,
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: cate,
  },
  {
    name: "Watches",
    slug: "watches",
    image: watch,
  },
  {
    name: "Furniture",
    slug: "furniture",
    image: dress,
  },
  {
    name: "Beauty & Health",
    slug: "beauty-health",
    image: shose,
  },
]

export default function CategoryGrid(){
  return (
    <section className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Explore Categories
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={300}
              className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold group-hover:scale-110 transition-all duration-200">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
