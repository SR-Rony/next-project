"use client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";
import { toast } from "sonner";

type CategoryType = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category`);
      const data = await res.json();
      setCategories(data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert("Please enter category name");

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Failed to create category");
        setLoading(false);
        return;
      }

      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
 const handleDelete = async (slug: string) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    const res = await fetch(`${baseUrl}/category/${slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete category");
      return;
    }

    toast.success("Category deleted successfully");

    // Refresh from backend
    const updatedRes = await fetch(`${baseUrl}/category`);
    const data = await updatedRes.json();

    setCategories(data?.payload || []);
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
          <CardTitle className="text-xl font-bold text-gray-800">Categories</CardTitle>

          {/* Add Category Input */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              placeholder="Enter category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory} disabled={loading}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Slug</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category._id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(category.slug)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-6">
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="grid gap-4 md:hidden">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Card key={category._id} className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.slug}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(category.slug)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No categories found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
