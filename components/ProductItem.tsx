"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    rating?: number;
    isPopular?: boolean;
  };
}

export default function ProductItem({ product }: ProductProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    // You would replace this with Redux, Context or API call
    toast.success(`🛒 ${product.name} added to cart`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border">
      {/* 🔥 Popular Badge */}
      {product.isPopular && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded z-10">
          Popular
        </div>
      )}

      {/* 🖼️ Image with Link */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-60 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* 📦 Product Info */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold truncate cursor-pointer hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* 🧾 Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* 💵 Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="line-through text-gray-500 text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
              {discount && (
                <span className="text-green-600 text-sm font-medium">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>

        {/* 🛒 Add to Cart */}
        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
