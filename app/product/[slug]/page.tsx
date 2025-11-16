import ProductDetailsClient from "@/components/productDetails";
import axiosInstance from "@/lib/axiosInstance";

export const dynamic = "force-dynamic";

interface ProductType {
  _id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  sold: number;
}

// Use `params` as destructured directly
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const res = await axiosInstance.get(`/product/${slug}`, {
      withCredentials: true,
    });

    const product: ProductType = res.data.payload;

    return <ProductDetailsClient product={product} />;
  } catch (error) {
    console.error(error);
    throw new Error("Product not found or server error.");
  }
}
