"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { clearCart } from "../redux/features/cartSlice";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  upazila: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart.items || []);

  // Shipping form state
  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    street: "",
    city: "",
    upazila: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  // Prices
  const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 120;
  const totalPrice = itemsPrice + shippingPrice;

  // Submit Order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first!");
      router.push("/user/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    setLoading(true);

    try {
      // Check stock
      const resStock = await axiosInstance.post("/product/stock", {
        productIds: cart.map((item) => item.id),
      });
      const stockData: Record<string, number> = resStock.data;

      for (const item of cart) {
        if (item.qty > (stockData[item.id] ?? 0)) {
          toast.error(`${item.name} is out of stock!`);
          setLoading(false);
          return;
        }
      }

      // Place order
      const { data } = await axiosInstance.post("/orders", {
        orderItems: cart.map((item) => ({
          productId: item.id,
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
      });

      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(`/order/${data.payload.order._id}`);
    } catch (err) {
      console.log(err);
      toast.error("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping & Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={shipping.fullName}
            onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
            required
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
              required
              className="w-full border rounded-lg p-3"
            />
            <input
              type="text"
              placeholder="Upazila"
              value={shipping.upazila}
              onChange={(e) => setShipping({ ...shipping, upazila: e.target.value })}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <input
            type="text"
            placeholder="Street Address"
            value={shipping.street}
            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
            required
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={shipping.phone}
            onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
            required
            className="w-full border rounded-lg p-3"
          />

          <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Cash on Delivery</option>
            <option>Nogod</option>
            <option>Bkash</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl mt-4"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Items</span>
              <span>৳{itemsPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span>৳{shippingPrice}</span>
            </p>
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Cart Items</h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <Image src={item.image} width={50} height={50} alt={item.name} className="object-cover"/>
                <span>{item.name} × {item.qty}</span>
                <span>৳{item.price * item.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
