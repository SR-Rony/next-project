"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Product = {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string | StaticImageData
}

type Props = {
  product: Product
}

export default function ProductItem({ product }: Props) {
  return (
    <div className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-52">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
          />
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-hover_color transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold text-base">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button className="w-full mt-2 bg-primary hover:bg-hover_color cursor-pointer text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
