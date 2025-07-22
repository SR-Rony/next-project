"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import watch from "@/public/banner/watch.jpg"
import banner3 from "@/public/banner/banner3.jpg"
import headphon from "@/public/banner/headphon.jpg"
import banner from "@/public/banner/banner.jpg"
import Image from "next/image"

const banners = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% off on gadgets and tech gear!",
    image: banner// Adjust the path as needed
  },
  {
    id: 2,
    title: "Style Your Summer",
    subtitle: "New arrivals in fashion & accessories",
    image: headphon
  },
  {
    id: 3,
    title: "Furniture Festival",
    subtitle: "Upgrade your home with 2025 trends",
    image: watch
  },
  {
    id: 4,
    title: "Furniture Festival",
    subtitle: "Upgrade your home with 2025 trends",
    image: banner3
  },
]

export default function Banner() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-muted mt-3">
      <div className="container mx-auto relative w-full h-[300px] md:h-[500px] overflow-hidden">
        {banners.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 bg-black w-full h-full transition-opacity duration-1000 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-20 text-white">
              <h2 className="text-2xl md:text-5xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-lg mt-2">{slide.subtitle}</p>
              <Button className="mt-4 inli inline-block bg-primary text-black hover:bg-hover_color cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
        ))}

        {/* Arrows */}
        {/* <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
        >
          <ChevronLeft className="text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
        >
          <ChevronRight className="text-black" />
        </button> */}
      </div>
    </div>
  )
}
