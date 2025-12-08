"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Eye, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomerType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: number;
  isAdmin: boolean;
  isBanned: boolean;
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 🟢 Fetch All Customers (axios + cookie)
  const fetchCustomers = useCallback(async () => {
  try {
    const res = await axiosInstance.get(`/user?search=${search}`);
    setCustomers(res.data?.payload?.allUser || []);
  } catch (err) {
    console.error("Error fetching users:", err);
    toast.error("Failed to fetch customers");
  }
}, [search]);

  useEffect(() => {
  fetchCustomers();
}, [fetchCustomers]);

  // 🟢 Delete Customer
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axiosInstance.delete(`/user/${id}`);

      toast.success("Customer deleted successfully");
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete customer");
    }
  };

  const handleView = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setModalOpen(true);
  };

  // 🟢 Save Edited User Permissions
  const handleSaveChanges = async () => {
    if (!selectedCustomer) return;

    try {
      await axiosInstance.put(`/user/${selectedCustomer._id}`, {
        isAdmin: selectedCustomer.isAdmin,
        isBanned: selectedCustomer.isBanned,
      });

      toast.success("Customer updated successfully");
      setModalOpen(false);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      toast.error("Error updating customer");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
          <CardTitle className="text-xl font-bold text-gray-800">
            Customers
          </CardTitle>

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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.orders}</TableCell>

                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleView(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-green-500 hover:text-white"
                          onClick={() => handleEdit(customer)}
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
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-6"
                    >
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden space-y-4">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <Card
                  key={customer._id}
                  className="p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{customer.name}</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleView(customer)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-green-500 hover:text-white"
                        onClick={() => handleEdit(customer)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(customer._id)}
                        title="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Email:</strong> {customer.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {customer.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {customer.address}
                    </p>
                    <p>
                      <strong>Orders:</strong> {customer.orders}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                No customers found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit User Permissions" : "View Customer"}
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-3">
              {isEditMode ? (
                <>
                  {/* Edit Admin */}
                  <div>
                    <Label>Is Admin</Label>
                    <Select
                      value={String(selectedCustomer.isAdmin)}
                      onValueChange={(value) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          isAdmin: value === "true",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Edit Banned */}
                  <div>
                    <Label>Is Banned</Label>
                    <Select
                      value={String(selectedCustomer.isBanned)}
                      onValueChange={(value) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          isBanned: value === "true",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {selectedCustomer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedCustomer.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedCustomer.address}
                  </p>
                  <p>
                    <strong>Orders:</strong> {selectedCustomer.orders}
                  </p>
                  <p>
                    <strong>Is Admin:</strong>{" "}
                    {String(selectedCustomer.isAdmin)}
                  </p>
                  <p>
                    <strong>Is Banned:</strong>{" "}
                    {String(selectedCustomer.isBanned)}
                  </p>
                </>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            {isEditMode && (
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
