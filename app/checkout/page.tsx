"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface CartItem {
  _id: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  
  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");
  const [loading, setLoading] = useState<boolean>(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    }
  }, []);

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 2000 ? 0 : 100;
  const totalPrice = itemsPrice + shippingPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: cart.map(item => ({
            productId: item._id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
          })),
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        }),
        credentials: "include",
      });

      console.log("ami",res);
      
      
      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();
      console.log("Order data:", data);

      localStorage.removeItem("cart");
      toast.success("Order placed successfully!");
      router.push(`/order/${data._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping & Payment Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-5">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={shipping.fullName}
            onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={shipping.street}
            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="text"
              placeholder="Country"
              value={shipping.country}
              onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
          />

          <h2 className="text-xl font-semibold mt-6 mb-3">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
          >
            <option>Cash on Delivery</option>
            <option>Stripe</option>
            <option>Bkash</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-hover_color transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between"><span>Items Price</span><span>৳{itemsPrice}</span></p>
            <p className="flex justify-between"><span>Shipping</span><span>৳{shippingPrice}</span></p>
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg"><span>Total</span><span>৳{totalPrice}</span></p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2">
                  <span>{item.name} × {item.qty}</span>
                  <span>৳{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
