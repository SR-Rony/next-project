// app/product/[slug]/page.tsx

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

// ✅ Tell Next.js this is dynamic
export const dynamic = "force-dynamic";

// ✅ This function gets a product from your API
async function getProduct(slug: string) {
  const res = await fetch(`http://localhost:4000/api/product/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  return data.payload;
}

// ✅ Your dynamic route page component
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Await here
  const product = await getProduct(slug);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-3 text-gray-600 text-base md:text-lg">
              {product.description || "No description available."}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-xl">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="mt-10">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <Link
              href="/"
              className="mt-4 block text-center text-primary hover:underline text-sm"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
