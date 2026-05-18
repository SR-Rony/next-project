"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-white shadow-2xl shadow-slate-900/20 sm:px-10 sm:py-14 lg:px-14"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-200">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              New season
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              Curated picks for everyday life
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Shop fresh arrivals, customer favourites, and limited offers — all in one place,
              with the same quality you expect from Azpero.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-primary text-slate-900 shadow-lg shadow-primary/25 hover:bg-hover_color"
            >
              <Link href="/shop" className="gap-2">
                Browse shop
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
