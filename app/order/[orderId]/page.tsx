"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Home, Printer } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

// ---------- Types ----------
type OrderItem = {
  _id: string;
  productId: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
};

type ShippingAddress = {
  fullName: string;
  street: string;
  city: string;
  upzila: string;
  phone: string;
};

type OrderType = {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingPrice: number;
};

// ---------- Component ----------
export default function OrderSuccessPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(data); // assuming your API returns order data directly
        console.log(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-200">
        {/* Header */}
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-green-600">
            🎉 Order Placed Successfully!
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Thank you for your purchase. Your order details are below:
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Customer & Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-semibold">Customer:</span>
              <span className="text-gray-600">{order.shippingAddress.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone:</span>
              <span className="text-gray-600">{order.shippingAddress?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Payment:</span>
              <span className="text-gray-600">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <Badge
                className={`${
                  order.isDelivered
                    ? "bg-green-500"
                    : order.isPaid
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                } text-white`}
              >
                {order.status ||
                  (order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending")}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span className="text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Products</h3>
            <div className="divide-y border rounded-lg overflow-hidden">
              {order.orderItems.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {product.image && (
                      <Image
                        className="object-cover"
                        src={product.image}
                        width={30}
                        height={30}
                        alt={product.name}
                      />
                    )}
                    <span>
                      {product.name} × {product.qty}
                    </span>
                  </div>
                  <span className="font-medium">৳{product.price * product.qty}</span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-3 px-3">
                <p>Shipping Price</p>
                <span className="font-medium">৳{order.shippingPrice}</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-bold pt-4 border-t">
            <span>Total:</span>
            <span>৳{order.totalPrice.toFixed(2)}</span>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button onClick={() => window.print()} className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
