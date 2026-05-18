"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Headphones, ShieldCheck, Truck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Fast delivery",
    desc: "Dhaka & nationwide shipping",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "Encrypted payments you can trust",
  },
  {
    icon: Headphones,
    title: "Real support",
    desc: "We reply within 24 hours",
  },
];

export default function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-y border-slate-200/80 bg-white/90 backdrop-blur-sm"
      aria-label="Store benefits"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(253,199,0,0.12),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left"
          >
            <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-amber-500/15 text-slate-900 ring-1 ring-primary/25 sm:mb-0 sm:mr-4">
              <item.icon className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
