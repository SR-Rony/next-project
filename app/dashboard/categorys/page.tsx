"use client";

import { useState, useEffect } from "react";
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
import { Trash, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

type CategoryType = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔵 Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  // 🟢 Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data?.payload || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🟢 Add Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return toast.error("Please enter category name");

    setLoading(true);
    try {
      await axiosInstance.post("/category", { name: newCategory });
      toast.success("Category added successfully!");
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Delete Category
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axiosInstance.delete(`/category/${slug}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  // 🟡 Open Edit Modal
  const openEditModal = (category: CategoryType) => {
    setEditSlug(category.slug);
    setEditName(category.name);
    setEditModalOpen(true);
  };

  // 🟢 Update Category API
  const handleUpdate = async () => {
    if (!editName.trim()) return toast.error("Category name required");

    try {
      await axiosInstance.post(`/category/${editSlug}`, { name: editName });
      toast.success("Category updated!");
      setEditModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      {/* ================= Header & Add ================= */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
          <CardTitle className="text-xl font-bold text-gray-800">
            Categories
          </CardTitle>

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
          {/* ================= Desktop Table ================= */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Slug</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.length ? (
                  categories.map((category) => (
                    <TableRow
                      key={category._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>

                      <TableCell className="text-right flex gap-2 justify-end">
                        {/* 🟡 Edit Button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => openEditModal(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        {/* 🟥 Delete Button */}
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
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500 py-6"
                    >
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* ================= Mobile Cards ================= */}
          <div className="grid gap-4 md:hidden">
            {categories.length ? (
              categories.map((category) => (
                <Card
                  key={category._id}
                  className="p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.slug}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEditModal(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(category.slug)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No categories found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ===================== Edit Modal ===================== */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>

            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleUpdate}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
