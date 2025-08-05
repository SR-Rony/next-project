"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type CustomerType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: number;
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const router = useRouter();

  // Fetch customers from backend with search
  const fetchCustomers = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/user?search=${search}`);
      const data = await res.json();
      setCustomers(data.payload.allUser || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  // Delete customer
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/user/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete customer");
        return;
      }

      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Navigate to edit form
  const handleEdit = (id: string) => {
    router.push(`/dashboard/customers/edit/${id}`);
  };

  // Navigate to view details
  const handleView = (id: string) => {
    router.push(`/dashboard/customers/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
          <CardTitle className="text-xl font-bold text-gray-800">Customers</CardTitle>
          <Input
            placeholder="🔍 Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Orders</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <TableRow
                      key={customer._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary hover:text-white"
                          onClick={() => handleView(customer._id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-green-500 hover:text-white"
                          onClick={() => handleEdit(customer._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(customer._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="grid gap-4 md:hidden">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <Card
                  key={customer._id}
                  className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                    <span className="text-sm text-gray-500">{customer.orders} orders</span>
                  </div>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                  <p className="text-sm text-gray-600">{customer.address}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary hover:text-white"
                      onClick={() => handleView(customer._id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-green-500 hover:text-white"
                      onClick={() => handleEdit(customer._id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(customer._id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No customers found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
