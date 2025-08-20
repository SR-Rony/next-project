"use client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type ProductType = {
  name: string;
  quantity: number;
  price: number;
};

type OrderType = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  products: ProductType[];
  total: number;
  status: string;
  date: string;
  shippingAddress:{
    fullName : string
  }
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);

  // Fetch orders from backend
  useEffect(() => {
    fetch(`${baseUrl}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.payload || []); // ✅ save to state
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredOrders = orders.filter(
    (o) =>
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase())
      
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Orders
          </CardTitle>
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
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    // <TableRow key={order._id}>
                    //   <TableCell>{order._id}</TableCell>
                    //   <TableCell>{order.customerName}</TableCell>
                    //   <TableCell>{order.email}</TableCell>
                    //   <TableCell>{order.phone}</TableCell>
                    //   <TableCell>{order.address}</TableCell>
                    //   <TableCell>{order.paymentMethod}</TableCell>
                    //   <TableCell>
                    //     <ul className="list-disc ml-4">
                    //       {order.products.map((p, i) => (
                    //         <li key={i}>
                    //           {p.name} × {p.quantity} (${p.price})
                    //         </li>
                    //       ))}
                    //     </ul>
                    //   </TableCell>
                    //   <TableCell>${order.total}</TableCell>
                    //   <TableCell>
                    //     <Badge
                    //       variant={
                    //         order.status === "Delivered"
                    //           ? "default"
                    //           : order.status === "Pending"
                    //           ? "secondary"
                    //           : "destructive"
                    //       }
                    //     >
                    //       {order.status}
                    //     </Badge>
                    //   </TableCell>
                    //   <TableCell>
                    //     {new Date(order.date).toLocaleDateString()}
                    //   </TableCell>
                    // </TableRow>
                    <>
                    {console.log(order)
                    }
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
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
