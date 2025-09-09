"use client"

import { useEffect } from "react"
import { setCart, removeFromCart } from "@/app/redux/features/cartSlice"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "../redux/hook/hook"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa";

export default function CartPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cart = useAppSelector((state) => state.cart || [])

  const phoneNumber = "01743493707"; // Your number

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      dispatch(setCart(storedCart))
    }
  }, [dispatch])

  // Remove item from cart
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  // Update item quantity
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    )
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    dispatch(setCart(updatedCart))
  }

  // Proceed to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }
    localStorage.setItem("checkoutData", JSON.stringify(cart))
    router.push("/checkout")
  }

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank"); // Open WhatsApp in new tab
  };

  // --- PRICES ---
  const shippingCost = 120 // Flat shipping charge in Taka
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * (item.qty || 1), 0)
  const total = subtotal + (cart.length > 0 ? shippingCost : 0)

  return (
    <div className="container mx-auto px-4 mt-16 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Your cart is empty. Start adding some products!
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {/* Header Row */}
            <div className="hidden sm:flex items-center bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-700 gap-4">
              <div className="w-20">Image</div>
              <div className="w-48">Product Name</div>
              <div className="w-28 text-center">Price</div>
              <div className="w-32 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
              <div className="w-24"></div>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-b-lg shadow"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-20 h-40 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, 80px"
                  />
                </div>

                {/* Product Name */}
                <h2 className="w-full sm:w-48 text-lg font-semibold truncate max-w-xs mt-2 sm:mt-0">
                  {item.name}
                </h2>

                {/* Product Price */}
                <p className="w-full sm:w-28 text-center text-gray-700 font-semibold mt-2 sm:mt-0">
                  ৳{Number(item.price || 0).toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="w-full sm:w-32 flex items-center justify-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    disabled={item.qty === 1}
                    className={`w-8 h-8 flex items-center justify-center border rounded ${
                      item.qty === 1
                        ? "bg-gray-100 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <p className="w-full sm:w-24 text-right text-lg font-bold mt-2 sm:mt-0">
                  ৳{(Number(item.price || 0) * (item.qty || 1)).toFixed(2)}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full sm:w-24 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition mt-2 sm:mt-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-96 bg-white p-6 rounded-lg shadow mt-10 lg:mt-0">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-4">
              <span className="text-gray-700 font-medium">Subtotal</span>
              <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-500">
              <span>Shipping</span>
              <span>৳{shippingCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="mt-8 w-full bg-primary hover:bg-hover_color text-white py-5 rounded-lg font-semibold transition cursor-pointer"
            >
              Proceed to Checkout
            </Button>
             <Button
              onClick={handleWhatsApp}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {/* Animated WhatsApp Icon */}
              <FaWhatsapp
                size={22}
                className="animate-bounce text-white"
              />
              {phoneNumber}
            </Button>
          </aside>
        </div>
      )}
    </div>
  )
}
