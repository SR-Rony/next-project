"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import headphon from "@/public/product/headphon.jpg"
import watch from "@/public/category/watch.jpeg"

type Product = {
  id: number
  name: string
  price: number
  image: string | object
}

const product = {
  id: 101,
  name: "Premium Wireless Headphones",
  price: 149.99,
  description:
    "Experience high-fidelity sound with noise cancellation. Sleek design, long battery life, and built for comfort.",
  images: [
    headphon,watch,headphon
  ],
  rating: 4.5,
  reviews: 127,
}

const relatedProducts: Product[] = [
  {
    id: 201,
    name: "Noise Cancelling Earbuds",
    price: 89.99,
    image: watch,
  },
  {
    id: 202,
    name: "Bluetooth Speaker",
    price: 69.99,
    image: headphon,
  },
  {
    id: 203,
    name: "Smartwatch Series X",
    price: 129.99,
    image: watch,
  },
  {
    id: 204,
    name: "Wireless Charging Pad",
    price: 29.99,
    image: headphon,
  },
]

export default function ProductPage(){
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div>
            <div className="mb-4">
              <Image
                src={selectedImage}
                alt={product.name}
                width={700}
                height={700}
                className="rounded-xl object-cover w-full max-h-[500px] hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className={`rounded-md cursor-pointer border ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-2xl text-primary font-semibold mb-2">${product.price}</p>
            <p className="text-sm text-yellow-600 mb-2">
              ⭐ {product.rating} ({product.reviews} reviews)
            </p>

            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium">Quantity:</label>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                className="w-20"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <Button className="w-full bg-primary hover:bg-hover_color cursor-pointer text-white">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                Buy Now
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Bluetooth 5.3 technology</li>
                <li>Up to 40 hours of battery life</li>
                <li>Soft memory foam ear cushions</li>
                <li>Built-in microphone for calls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <Link href={`/product/${item.id}`}>
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={watch}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="rounded-md hover:scale-105 transition-transform duration-300 w-full h-[200px] object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">${item.price}</p>
                  <Button className="w-full">View Product</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
