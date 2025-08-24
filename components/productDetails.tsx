"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/app/redux/features/cartSlice";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  sold: number;
}

export default function ProductDetailsClient({
  product: initialProduct,
}: {
  product: Product;
}) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: Number(product.price),
        qty: 1,
        image: product.image,
      })
    );
    toast.success("Product added to cart!");
  };

  const handleBuy = async () => {
    try {
      setMessage("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/buy`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId: product._id, quantity: 1 }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to purchase");

      setMessage("✅ Purchase successful! Stock updated.");
      setProduct(data.payload);
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[400px] md:h-[500px] bg-white rounded-2xl shadow-md overflow-hidden flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                -{discount}%
              </span>
            )}
          </div>

          {/* Thumbnail previews (could be multiple images in real case) */}
          <div className="flex gap-3 justify-center md:justify-start">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden border cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="w-20 h-20 relative rounded-lg overflow-hidden border cursor-pointer opacity-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-1 mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500" />
              ))}
              <span className="ml-2 text-gray-600 text-sm">(120 reviews)</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ৳
                {Number(product.price).toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                })}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-xl">
                  ৳
                  {Number(product.originalPrice).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              {product.description || "No description available."}
            </p>

            <p className="mt-4 text-sm font-medium">
              {product.quantity > 0 ? (
                <span className="text-green-600">
                  ✔ In Stock ({product.quantity} left)
                </span>
              ) : (
                <span className="text-red-600">❌ Out of Stock</span>
              )}{" "}
              | Sold: {product.sold}
            </p>
          </div>

          {/* Extra Info Section */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <RefreshCw className="w-5 h-5 text-primary" />
              <span>7-Day Return</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>1-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>Secure Payment</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white text-lg font-semibold rounded-xl shadow hover:bg-primary/90 transition"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>

            <button
              onClick={handleBuy}
              disabled={product.quantity === 0}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white text-lg font-semibold rounded-xl shadow transition 
              ${
                product.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Buy Now
            </button>

            {message && (
              <p className="text-center mt-2 text-sm font-medium text-gray-700">
                {message}
              </p>
            )}

            <Link
              href="/shop"
              className="mt-4 block text-center text-primary hover:underline text-sm"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
            >
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={`Related Product ${i}`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-gray-800">
                Sample Product {i}
              </h3>
              <p className="text-primary font-bold">৳ 1,299</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
