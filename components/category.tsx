"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Dumbbell,
  Gift,
  Heart,
  Home,
  Package,
  Palette,
  Sparkles,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  name: string;
  slug: string;
};

const GRADIENTS = [
  "from-amber-500/90 via-orange-500/85 to-rose-500/80",
  "from-emerald-500/90 via-teal-600/85 to-cyan-600/80",
  "from-violet-500/90 via-purple-600/85 to-fuchsia-600/80",
  "from-sky-500/90 via-blue-600/85 to-indigo-600/80",
  "from-rose-500/90 via-pink-600/85 to-orange-500/80",
  "from-lime-500/85 via-green-600/80 to-emerald-700/75",
] as const;

const ICONS = [Package, Sparkles, Heart, Gift, Home, Palette, Cpu, Dumbbell] as const;

function hashSlug(slug: string) {
  return slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get<{ payload: Category[] }>("/category");
        setCategories(Array.isArray(res.data.payload) ? res.data.payload : []);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="relative scroll-mt-20 bg-slate-50/80 py-16 sm:py-20 lg:py-24" id="categories">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(253,199,0,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Browse</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Shop by category
          </h2>
          <p className="mt-3 text-slate-600 sm:text-lg">
            Jump straight into the aisle you need — every tile opens a tailored collection.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-slate-500">No categories yet. Check back soon.</p>
        ) : (
          <motion.ul
            variants={reduce ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {categories.map((category) => {
              const h = hashSlug(category.slug);
              const gradient = GRADIENTS[h % GRADIENTS.length];
              const Icon = ICONS[h % ICONS.length];

              return (
                <motion.li key={category.slug} variants={reduce ? undefined : itemVar}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-4 shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition duration-500 group-hover:scale-105`}
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="flex justify-end">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30 transition group-hover:bg-white/30">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-snug text-white drop-shadow-md line-clamp-2">
                          {category.name}
                        </p>
                        <p className="mt-1 text-xs font-medium text-white/85">Explore →</p>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
