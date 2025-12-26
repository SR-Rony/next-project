"use client";

import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance"; // ✅ import

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface ProductResponse {
  payload: {
    products: ProductType[];
  };
}

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<ProductResponse>("/product");
        setProducts(res.data.payload.products);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        🌟 Featured Products
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
