"use client";

import Img1 from "@/public/category/shose.png"
import Img2 from "@/public/category/category.jpg"
import Img3 from "@/public/product/headphon.jpg"

import ProductItem from "./ProductItem"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    price: 99.99,
    originalPrice: 150,
    image: Img1,
  },
  {
    id: 2,
    name: "Smart Watch",
    slug: "smart-watch",
    price: 149.99,
    originalPrice: 300,
    image: Img2,
  },
  {
    id: 3,
    name: "Smart Watch",
    slug: "smart-watch",
    price: 149.99,
    originalPrice: 300,
    image: Img3,
  },
]

export default function Product() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
