"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/sidebar";
import Orders from "@/components/dashboard/order";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import { useAppSelector } from "../redux/hook/hook";

export default function UserDashboard() {

  const user: UserType | null = useAppSelector((state) => state.user.user)

  const [users] = useState({
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 flex-shrink-0 mt-7">
        <Sidebar />
      </div>

      {/* Sidebar Drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-[50%] mt-16">
            <Sidebar />
          </div>
        </div>
      )}

      {/* <div className="relative w-64 bg-white shadow-lg z-50">
            <Sidebar />
          </div> */}

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 mr-1" /> Menu
          </Button>
        </div>

        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary/90 to-purple-500 text-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Welcome back, {user ?.name} 👋
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Here’s what’s happening with your account today.
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold text-primary">
              {`user orders`}
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold text-pink-500">
              {`user.wishlist`}
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold text-amber-500">
              {`user.addresses`}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <div className="overflow-x-auto">
          <Orders />
        </div>
      </main>
    </div>
  );
}
