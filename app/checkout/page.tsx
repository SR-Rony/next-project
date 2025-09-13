"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserType } from "@/types/user";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { clearCart } from "../redux/features/cartSlice";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  upazila: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const user: UserType | null = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart || []);
  const dispatch = useAppDispatch();

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    street: "",
    city: "",
    upazila: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState<number | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 120;
  const totalPrice = itemsPrice + shippingPrice;

  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error("Enter coupon code");

    try {
      const res = await fetch(`${baseUrl}/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, cartTotal: totalPrice }),
      });
      const data = await res.json();

      if (data.success) {
        setDiscount(data.discount);
        setFinalTotal(data.finalTotal + shippingPrice);
        setCouponApplied(true);
        toast.success("Coupon applied!");
      } else {
        toast.error(data.message || "Invalid coupon");
        setDiscount(0);
        setFinalTotal(null);
        setCouponApplied(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply coupon");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check stock
      const resStock = await fetch(`${baseUrl}/product/stock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: cart.map((item) => item.id) }),
      });
      const stockData: Record<string, number> = await resStock.json();

      for (const item of cart) {
        if (item.qty > (stockData[item.id] ?? 0)) {
          toast.error(`Not enough stock for ${item.name}`);
          setLoading(false);
          return;
        }
      }

      // Place order
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          discount,
          totalPrice: couponApplied ? finalTotal : totalPrice,
          couponCode: couponApplied ? couponCode : null,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(`/order/${data.payload.order._id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-5">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input type="text" placeholder="Full Name" value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" placeholder="Upazila" value={shipping.upazila} onChange={(e) => setShipping({ ...shipping, upazila: e.target.value })} required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <input type="text" placeholder="Street Address" value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
          <input type="text" placeholder="Phone Number" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />

          <h2 className="text-xl font-semibold mt-6 mb-3">Payment Method</h2>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary">
            <option>Cash on Delivery</option>
            <option>Nogod</option>
            <option>Bkash</option>
          </select>

          {/* Coupon Input */}
          <div className="flex gap-2 mt-4">
            <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary" />
            <button type="button" onClick={handleApplyCoupon} className="bg-primary text-white px-4 py-2 rounded cursor-pointer">Apply</button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-hover_color transition mt-4">
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
            {couponApplied && (
              <p className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-৳{discount}</span>
              </p>
            )}
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{couponApplied && finalTotal !== null ? finalTotal : totalPrice}</span>
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Cart Items</h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center border-b pb-2">
                <Image src={item.image} width={50} height={50} className="object-cover" alt={item.name} />
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
