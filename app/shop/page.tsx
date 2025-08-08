"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import Link from "next/link"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type CategoryType = {
  _id: string
  name: string
}

type Product = {
  _id: string
  name: string
  price: number
  image: string
  categoryId: CategoryType
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await fetch(`${baseUrl}/product`)
      const data = await res.json()
      const allProducts: Product[] = data.payload.products

      // Price range
      const prices = allProducts.map(p => p.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)

      setProducts(allProducts)
      setMinPrice(min)
      setMaxPrice(max)
      setPriceRange([min, max])

      // Unique categories
      const categoryMap = new Map<string, CategoryType>()
      allProducts.forEach(p => {
        if (!categoryMap.has(p.categoryId._id)) {
          categoryMap.set(p.categoryId._id, p.categoryId)
        }
      })
      setCategories(Array.from(categoryMap.values()))
    } catch (err) {
      console.error("Failed to load data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.categoryId._id)
      return matchesPrice && matchesSearch && matchesCategory
    })
    setFilteredProducts(filtered)
  }, [products, priceRange, searchQuery, selectedCategories])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="bg-gray-100 py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop Our Collection</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-white rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* 🔍 Search */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Search</label>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 💰 Price Range */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Price Range</label>
              <Slider
                min={minPrice}
                max={maxPrice}
                step={1}
                defaultValue={[minPrice, maxPrice]}
                value={priceRange}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
              />
              <div className="mt-2 text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>

            {/* 📦 Category */}
            <div>
              <label className="block font-medium mb-2">Category</label>
              <div className="flex flex-col gap-2 text-sm">
                {categories.map((category) => (
                  <label key={category._id}>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => toggleCategory(category._id)}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="w-full lg:w-3/4">
            {loading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">${product.price}</p>
                      <Button className="mt-2 w-full">Add to Cart</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
