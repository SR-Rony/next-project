"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: false,
    image: null as File | null,
    categoryId: "",
  });

  // =======================
  // Fetch Categories
  // =======================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.payload || []);
      } catch (err) {
        console.error("Failed to load categories", err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // =======================
  // Handle Image Preview
  // =======================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // =======================
  // Submit Product
  // =======================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.price ||
      Number(form.price) <= 0 ||
      !form.quantity ||
      Number(form.quantity) < 0 ||
      !form.categoryId ||
      !form.image
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("shipping", form.shipping ? "1" : "0");
    formData.append("categoryId", form.categoryId);
    formData.append("image", form.image);

    setLoading(true);

    try {
      await axiosInstance.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product created successfully");
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center mt-16">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Upload a new product to your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                className="w-full border rounded p-2"
                rows={4}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price in ৳"
                required
              />
              {form.price && (
                <p className="text-sm text-gray-600">
                  Preview: <span className="font-semibold">৳{Number(form.price).toLocaleString("en-BD")}</span>
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                placeholder="Enter quantity"
                required
              />
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-2">
              <input
                id="shipping"
                type="checkbox"
                checked={form.shipping}
                onChange={(e) => setForm((prev) => ({ ...prev, shipping: e.target.checked }))}
              />
              <Label htmlFor="shipping" className="mb-0 cursor-pointer">Shipping Available</Label>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={160}
                  height={160}
                  className="rounded border mt-2 object-cover w-40 h-40"
                />
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border px-3 py-2 rounded"
                value={form.categoryId}
                onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
