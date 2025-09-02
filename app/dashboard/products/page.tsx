"use client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit, Trash, Plus } from "lucide-react";
import Image from "next/image";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug :string
};

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetch(`${baseUrl}/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data.payload.products))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`${baseUrl}/product/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (product: ProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    const res = await fetch(`${baseUrl}/product/${selectedProduct.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedProduct),
    });
      
    if (res.ok) {
      
      setProducts((prev) =>
        prev.map((p) => (p.slug === selectedProduct.slug ? selectedProduct : p))
      );
      setOpen(false);
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-22">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg sm:text-xl font-semibold">Products</CardTitle>
          <Button onClick={() => router.push("/dashboard/products/add")}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-xs"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>৳{Number(product.price).toLocaleString("en-BD")}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: Number(e.target.value),
                  })
                }
              />
              <Input
                placeholder="Quantity"
                type="number"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
