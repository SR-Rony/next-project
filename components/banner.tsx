"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner from "@/public/banner/banner.jpg";
import banner4 from "@/public/banner/banner4.jpg";
import banner2 from "@/public/banner/banner3.jpg";

const slides = [
  {
    id: 1,
    title: "Fresh & Organic Vegetables",
    subtitle: "Direct from village farms to your home.",
    image: banner,
  },
  {
    id: 2,
    title: "Farm Fresh Eggs & Chicken",
    subtitle: "Healthy, organic, and chemical-free.",
    image: banner2,
  },
  {
    id: 3,
    title: "Fresh Fish & Dairy Products",
    subtitle: "Delivered with love from Greenvillage.",
    image: banner4,
  },
];

export default function BannerSlider() {
  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-3 text-sm md:text-lg text-gray-200 drop-shadow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Swiper custom styles */}
      <style jsx global>{`
        /* Arrows */
        .swiper-button-next,
        .swiper-button-prev {
            color: #FDC700; /* Green-600 */
            transition: color 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            color: #FDC700; /* Darker Green */
        }

        /* Hide arrows on small screens */
        @media (max-width: 767px) {
            .swiper-button-next,
            .swiper-button-prev {
            display: none;
            }
        }

        /* Pagination dots */
        .swiper-pagination-bullet {
            background: #d1d5db; /* Gray-300 default */
            opacity: 1;
        }
        .swiper-pagination-bullet-active {
            background: #FDC700; /* Green-600 */
        }
        `}</style>
    </section>
  );
}