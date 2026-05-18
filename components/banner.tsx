"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import banner from "@/public/banner/banner.jpg";
import banner4 from "@/public/banner/banner4.jpg";
import banner2 from "@/public/banner/banner3.jpg";

const slides = [
  {
    id: 1,
    title: "Fresh & organic",
    subtitle: "Village farms to your doorstep — curated for quality.",
    image: banner,
  },
  {
    id: 2,
    title: "Premium grocery",
    subtitle: "Eggs, poultry, and pantry staples without compromise.",
    image: banner2,
  },
  {
    id: 3,
    title: "Fish & dairy",
    subtitle: "Cold-chain friendly picks, delivered with care.",
    image: banner4,
  },
];

export default function BannerSlider() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-slate-950" aria-label="Featured collection">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        loop
        className="home-swiper relative h-[min(72vh,640px)] w-full md:h-[min(78vh,720px)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="!h-full">
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="scale-105 object-cover object-center"
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/25 md:via-slate-900/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-28 lg:px-8">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl"
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
                      Azpero marketplace
                    </p>
                    {index === 0 ? (
                      <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h2>
                    )}
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="group h-12 rounded-xl bg-primary px-6 text-base font-semibold text-slate-900 shadow-lg shadow-primary/25 transition hover:bg-hover_color"
                      >
                        <Link href="/shop">
                          Shop now
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-12 rounded-xl border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                      >
                        <Link href="/about">Learn more</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .home-swiper .swiper-button-next,
        .home-swiper .swiper-button-prev {
          color: #fdc700;
          filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.4));
        }
        .home-swiper .swiper-button-next:hover,
        .home-swiper .swiper-button-prev:hover {
          color: #f0b100;
        }
        @media (max-width: 767px) {
          .home-swiper .swiper-button-next,
          .home-swiper .swiper-button-prev {
            display: none;
          }
        }
        .home-swiper .swiper-pagination-bullet {
          background: rgb(226 232 240);
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .home-swiper .swiper-pagination-bullet-active {
          background: #fdc700;
          width: 22px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
