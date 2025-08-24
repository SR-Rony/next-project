// import ProductDetailsClient from "./ProductDetailsClient";

import ProductDetailsClient from "@/components/productDetails";


// ✅ Tell Next.js this page is dynamic
export const dynamic = "force-dynamic";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/product/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  const product = data.payload;
  
  

  // Pass product to client component
  return <ProductDetailsClient product={product} />;
}
