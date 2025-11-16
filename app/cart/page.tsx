"use client";

import { useEffect } from "react";
import { setCart, removeFromCart } from "@/app/redux/features/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ✅ Correct way: our cartSlice contains items array
  const cart = useAppSelector((state) => state.cart.items || []);

  const phoneNumber = "01743493707";

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(storedCart));
    }
  }, [dispatch]);

  // Remove item
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Update quantity
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));
  };

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    localStorage.setItem("checkoutData", JSON.stringify(cart));
    router.push("/checkout");
  };

  // WhatsApp
  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  // Prices
  const shippingCost = 120;
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.qty || 1),
    0
  );
  const total = subtotal + (cart.length > 0 ? shippingCost : 0);

  return (
    <div className="container mx-auto px-4 mt-16 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500 ">
          <p className="mb-4">Your cart is empty. Start adding some products!</p>
          <Link
            href={"/shop"}
            className="text-primary hover:underline font-bold"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="hidden sm:flex items-center bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-700 gap-4">
              <div className="w-20">Image</div>
              <div className="w-48">Product Name</div>
              <div className="w-28 text-center">Price</div>
              <div className="w-32 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
              <div className="w-24"></div>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-b-lg shadow"
              >
                {/* Image */}
                <div className="relative w-full sm:w-20 h-40 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Name */}
                <h2 className="w-full sm:w-48 text-lg font-semibold truncate max-w-xs mt-2 sm:mt-0">
                  {item.name}
                </h2>

                {/* Price */}
                <p className="w-full sm:w-28 text-center text-gray-700 font-semibold">
                  ৳{Number(item.price || 0).toFixed(2)}
                </p>

                {/* Quantity */}
                <div className="w-full sm:w-32 flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    disabled={item.qty === 1}
                    className={`w-8 h-8 border rounded ${
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
                    className="w-8 h-8 border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Total price */}
                <p className="w-full sm:w-24 text-right text-lg font-bold">
                  ৳{(item.price * item.qty).toFixed(2)}
                </p>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full sm:w-24 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="w-full lg:w-96 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-500">
              <span>Shipping</span>
              <span>৳{shippingCost}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="mt-8 w-full bg-primary hover:bg-hover_color text-white py-5 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </Button>

            <Button
              onClick={handleWhatsApp}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={22} className="animate-bounce" />
              {phoneNumber}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
