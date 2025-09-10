"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { addToCart } from "@/app/redux/features/cartSlice";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  rating?: number;
  isPopular?: boolean;
  quantity?: number; // default 1 for cart
}

interface ProductProps {
  product: Product;
}

export default function ProductItem({ product }: ProductProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const dispatch = useAppDispatch();

  const handleAddToCart = (): void => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image,
      })
    );
    toast.success(`🛒 ${product.name} added to cart`);
  };

  return (
    <div className="group relative bg-white rounded-sm shadow-md hover:shadow-xl transition-all overflow-hidden border">
      {/* Popular Badge */}
      {product.isPopular && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded z-10">
          Popular
        </div>
      )}

      {/* Image with Link */}
      <Link href={`/product/${product.slug}`} passHref>
        <div className="relative w-full h-80 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold truncate cursor-pointer hover:underline">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            ৳
            {Number(product.price).toLocaleString("en-BD", {
              minimumFractionDigits: 2,
            })}
          </span>
          {product.originalPrice && (
            <>
              <span className="line-through text-gray-500 text-sm">
                ৳{product.originalPrice.toFixed(2)}
              </span>
              {discount && (
                <span className="text-green-600 text-sm font-medium">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        {product.quantity && product.quantity > 0 ? (
          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        ) : (
          <Button
            disabled
            className="mt-4 w-full flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <ShoppingCart className="w-4 h-4" />
            Out of stock
          </Button>
        )}
      </div>
    </div>
  );
}
