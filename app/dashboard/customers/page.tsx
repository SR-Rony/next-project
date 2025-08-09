"use client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch customers from backend
  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${baseUrl}/user?search=${search}`);
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
      const res = await fetch(`${baseUrl}/user/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete customer");
        return;
      }
      toast.success("Customer deleted successfully");
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // View Modal
  const handleView = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditMode(false);
    setModalOpen(true);
  };

  // Edit Modal
  const handleEdit = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setModalOpen(true);
  };

  // Save Changes for isAdmin / isBanned
  const handleSaveChanges = async () => {
    if (!selectedCustomer) return;
    try {
      const res = await fetch(`${baseUrl}/user/${selectedCustomer._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAdmin: selectedCustomer.isAdmin,
          isBanned: selectedCustomer.isBanned,
        }),
      });

      if (!res.ok) throw new Error("Failed to update customer");

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
          <CardTitle className="text-xl font-bold text-gray-800">Customers</CardTitle>
          <Input
            placeholder="🔍 Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </CardHeader>
        <CardContent>
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
                        <Button variant="outline" size="icon" onClick={() => handleView(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="hover:bg-green-500 hover:text-white" onClick={() => handleEdit(customer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(customer._id)}>
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
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit User Permissions" : "View Customer"}</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-3">
              {isEditMode ? (
                <>
                  <div>
                    <Label>Is Admin</Label>
                    <Select
                      value={String(selectedCustomer.isAdmin)}
                      onValueChange={(value) =>
                        setSelectedCustomer({ ...selectedCustomer, isAdmin: value === "true" })
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
                  <div>
                    <Label>Is Banned</Label>
                    <Select
                      value={String(selectedCustomer.isBanned)}
                      onValueChange={(value) =>
                        setSelectedCustomer({ ...selectedCustomer, isBanned: value === "true" })
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
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                  <p><strong>Orders:</strong> {selectedCustomer.orders}</p>
                  <p><strong>Is Admin:</strong> {String(selectedCustomer.isAdmin)}</p>
                  <p><strong>Is Banned:</strong> {String(selectedCustomer.isBanned)}</p>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Close</Button>
            {isEditMode && (
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
