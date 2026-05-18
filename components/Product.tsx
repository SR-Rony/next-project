"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ProductItem from "./ProductItem";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

const FEATURED_LIMIT = 8;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const cardVar = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<ProductResponse>("/product");
        setProducts(res.data.payload.products ?? []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err instanceof Error ? err.message : "Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featured = products.slice(0, FEATURED_LIMIT);

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24" id="featured">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Collection</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured products
            </h2>
            <p className="mt-3 text-slate-600 sm:text-lg">
              Hand-picked highlights from the catalogue — updated as new stock lands.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-11 shrink-0 rounded-xl border-slate-200 bg-slate-50/80 px-5 font-semibold text-slate-900 hover:bg-slate-100"
          >
            <Link href="/shop" className="gap-2">
              View all
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Skeleton className="aspect-[3/4] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">{error}</p>
        ) : featured.length === 0 ? (
          <p className="text-center text-slate-500">No products to show yet.</p>
        ) : (
          <motion.div
            variants={reduce ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-24px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {featured.map((product) => (
              <motion.div key={product._id} variants={reduce ? undefined : cardVar}>
                <ProductItem product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && !error && products.length > FEATURED_LIMIT && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Button asChild size="lg" className="h-12 rounded-xl px-8 font-semibold">
              <Link href="/shop" className="gap-2">
                See full catalogue
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
