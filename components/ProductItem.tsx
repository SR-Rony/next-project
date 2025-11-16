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

export default function ProductItem({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAdd = () => {
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

  const inStock = product.quantity ?? 0;

  return (
    <div className="group relative bg-white rounded-sm shadow-md hover:shadow-xl transition-all overflow-hidden border">
      
      {product.isPopular && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded z-10">
          Popular
        </div>
      )}

      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-80">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold truncate hover:underline">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {product.originalPrice && (
            <>
              <span className="line-through text-gray-500 text-sm">
                ৳{product.originalPrice.toFixed(2)}
              </span>
              {discount && <span className="text-green-600 text-sm">{discount}% OFF</span>}
            </>
          )}
        </div>

        {inStock > 0 ? (
          <Button onClick={handleAdd} className="mt-4 w-full flex gap-2">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </Button>
        ) : (
          <Button disabled className="mt-4 w-full flex gap-2">
            <ShoppingCart className="w-4 h-4" /> Out of stock
          </Button>
        )}
      </div>
    </div>
  );
}
