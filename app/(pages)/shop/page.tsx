"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import Link from "next/link"
import watch from "@/public/product/headphon.jpg"

// Define Product type
type Product = {
  id: number
  name: string
  price: number
  image: string |object
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Smart Watch",
    price: 99,
    image: watch,
  },
  {
    id: 2,
    name: "Fashion Shoes",
    price: 59,
    image: watch
  },
  {
    id: 3,
    name: "Men's Jacket",
    price: 79,
    image: watch
  },
  {
    id: 4,
    name: "Stylish Sunglasses",
    price: 39,
    image: watch
  },
]

export default function ShopPage(){
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop Our Collection</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-white rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <label className="block font-medium mb-2">Search</label>
              <Input placeholder="Search products..." />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Price Range</label>
              <Slider
                min={0}
                max={200}
                step={1}
                defaultValue={priceRange}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
              />
              <div className="mt-2 text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Category</label>
              <div className="flex flex-col gap-2 text-sm">
                <label><input type="checkbox" className="mr-2" /> Fashion</label>
                <label><input type="checkbox" className="mr-2" /> Electronics</label>
                <label><input type="checkbox" className="mr-2" /> Accessories</label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={watch}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded-md hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">${product.price}</p>
                    <Button className="mt-2 w-full">Add to Cart</Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
