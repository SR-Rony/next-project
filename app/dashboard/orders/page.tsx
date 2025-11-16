"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
  image?: string;
};

type OrderType = {
  _id: string;
  user: string;
  shippingAddress: {
    fullName: string;
    city: string;
    upazila: string;
    street: string;
    phone: string;
  };
  email?: string;
  paymentMethod: string;
  orderItems: OrderItem[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isDelivered: boolean;
  isPaid: boolean;
  createdAt: string;
};

export default function OrdersPage() {

  // ✅ FIX 1: Correct Type Added
  const [orders, setOrders] = useState<OrderType[]>([]);
  

  // ✅ FIX 2: Search State Added
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders"); // interceptor handles refresh token
      const { payload } = res.data;
      console.log("payload",payload);
      

      setOrders(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔎 Search + Sort (Newest First)
  const filteredOrders = orders
    .filter((order) =>
      order.shippingAddress.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            All Orders
          </CardTitle>

          {/* 🔎 Search Input */}
          <Input
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs"
          />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const fullAddress = `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.upazila}, ${order.shippingAddress.phone}`;

                    return (
                      <TableRow key={order._id}>
                        <TableCell>{order.shippingAddress.fullName}</TableCell>
                        <TableCell>{fullAddress}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>৳{order.totalPrice.toFixed(2)}</TableCell>

                        <TableCell>
                          <Badge variant={order.isPaid ? "default" : "destructive"}>
                            {order.isPaid ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge variant={order.isDelivered ? "default" : "secondary"}>
                            {order.isDelivered ? "Delivered" : "Pending"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>

                        {/* View Items Dialog */}
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="text-sm text-primary underline hover:text-primary/80">
                                View Items
                              </button>
                            </DialogTrigger>

                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Order Items</DialogTitle>
                              </DialogHeader>

                              <div className="mt-3 space-y-4">
                                {order.orderItems.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4">
                                    {item.image && (
                                      <div className="w-16 h-16 relative">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          className="object-contain border rounded-md"
                                        />
                                      </div>
                                    )}

                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-gray-500">
                                        Qty: {item.qty} × ৳{item.price} = ৳{item.qty * item.price}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
