// app/category/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProductType = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`${baseUrl}/product/category/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.payload.products || []);
        setCategoryName(data.payload.categoryName || slug);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {categoryName} Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
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
                    <p className="text-gray-600">${product.price}</p>
                    <Link href={`/product/${product._id}`} className="w-full">
                      <Button className="w-full mt-3">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found in this category.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
