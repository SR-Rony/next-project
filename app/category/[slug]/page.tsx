"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance"; // ✅ use axiosInstance

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/category/${slug}`);
        const data = res.data?.payload;
        setProducts(data?.products || []);
        setCategoryName(data?.categoryName || String(slug));
      } catch (error) {
        console.error("❌ Failed to fetch category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {loading ? "Loading..." : `${categoryName} Products`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={product._id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                    <h3 className="mt-3 text-lg font-medium text-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">৳{product.price}</p>
                    <Link href={`/product/${product.slug}`} className="w-full">
                      <Button className="w-full mt-3">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
