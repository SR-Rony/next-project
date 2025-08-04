"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Orders() {

    const [user] = useState({
        name: "SR Rony",
        email: "rony@example.com",
        avatar: "/avatar.png",
        orders: 12,
        wishlist: 5,
        addresses: 3,
        recentOrders: [
          { id: "ORD-001", date: "2025-08-01", total: "$120", status: "Delivered" },
          { id: "ORD-002", date: "2025-07-20", total: "$89", status: "Shipped" },
          { id: "ORD-003", date: "2025-07-10", total: "$45", status: "Pending" },
        ],
      });

    const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: "bg-green-100 text-green-700",
      Shipped: "bg-blue-100 text-blue-700",
      Pending: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-700"}`}
      >
        {status}
      </span>
    );
  };


    return (
        <Card className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="text-left p-3">Order ID</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{order.id}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">{order.total}</td>
                    <td className="p-3">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
    )
}