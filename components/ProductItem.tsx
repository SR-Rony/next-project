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
  quantity?: number;
}

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const dispatch = useAppDispatch();

  const inStock = (product.quantity ?? 0) > 0;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image,
      })
    );

    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-xl">
      
      {/* 🔖 Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {product.isPopular && (
          <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold">
            Popular
          </span>
        )}

        {discount && (
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* 🖼️ Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={false}
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      </Link>

      {/* 📦 Content */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-1 text-base font-semibold text-brand-charcoal hover:underline">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>
        )}

        {/* 💰 Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-brand-teal">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.originalPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* 🛒 Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-4 w-full gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
