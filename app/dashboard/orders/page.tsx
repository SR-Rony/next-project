"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type OrderType = {
  _id: string;
  user: string;
  shippingAddress: {
    fullName: string;
    city: string;
    country: string;
    street: string;
    postalCode: string;
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
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.payload || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg sm:text-xl font-semibold">Orders</CardTitle>
          <Input
            placeholder="Search orders..."
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
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
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
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.shippingAddress.fullName}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
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
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
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
                            <div className="mt-2 space-y-4">
                              {order.orderItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                  {item.image && (
                                    <div className="w-16 h-16 relative flex-shrink-0">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain rounded-md border"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.quantity} × ${item.price} = ${item.quantity * item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
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
