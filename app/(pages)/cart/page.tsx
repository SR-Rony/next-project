"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { useState } from "react"
import cartImg from "@/public/category/category.jpg"

type CartItem = {
  id: number
  name: string
  price: number
  image: object | string // ✅ Fix for Next.js images
  quantity: number
}

export default function CartPage(){
  const [cartItems, _] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120,
      image: cartImg,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 80,
      image: cartImg,
      quantity: 2,
    },
  ])
 

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={cartImg}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={1}
                    className="w-16 text-center"
                    min={1}
                    readOnly
                  />
                  <Button variant="ghost" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-6 bg-primary hover:bg-hover_color text-white cursor-pointer">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
