"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const reduce = useReducedMotion();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const customerLinks = [
    { href: "/cart", label: "Cart & checkout" },
    { href: "/services", label: "Shipping & info" },
    { href: "/contact", label: "Support" },
  ];

  const socialIcons = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  ] as const;

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("You're on the list. Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(253,199,0,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                Azpero<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A modern storefront built for clarity and speed — quality products, fair prices,
              and support that actually replies.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>123 Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href="tel:+8801234567890" className="transition hover:text-white">
                  +880 1234 567 890
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href="mailto:support@azpero.com" className="transition hover:text-white">
                  support@azpero.com
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h4>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Help</h4>
              <ul className="mt-5 space-y-3">
                {customerLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Newsletter</h4>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Drops, discounts, and restocks — no spam.
            </p>
            <form onSubmit={handleNewsletter} className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-primary/40"
              />
              <Button
                type="submit"
                className="h-11 shrink-0 rounded-xl bg-primary font-semibold text-slate-900 hover:bg-hover_color"
              >
                Subscribe
              </Button>
            </form>
            <div className="mt-8 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-400">Azpero</span>. All rights reserved.
          </p>
          <p className="text-slate-600">
            Built for production — accessible markup, fast UX, Bangladesh-first storefront.
          </p>
        </div>
      </div>
    </footer>
  );
}
