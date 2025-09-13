"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  expiryDate: string;
  isActive: boolean;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("fixed");
  const [discountValue, setDiscountValue] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Get token from localStorage
  const getToken = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return null;
    }
    return token;
  };

  // Fetch coupons
  const fetchCoupons = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${baseUrl}/coupons`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setCoupons(data.coupons);
      else toast.error(data.message || "Failed to fetch coupons");
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Create or update coupon
  const saveCoupon = async () => {
    if (!code || !discountValue || !expiryDate) return toast.error("Please fill all fields");

    const token = getToken();
    if (!token) return;

    try {
      const url = editingId ? `${baseUrl}/coupons/${editingId}` : `${baseUrl}/coupons`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, discountType, discountValue, minPurchase, expiryDate }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Coupon updated" : "Coupon created");
        // reset form
        setCode("");
        setDiscountType("fixed");
        setDiscountValue(0);
        setMinPurchase(0);
        setExpiryDate("");
        setEditingId(null);
        fetchCoupons();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while saving coupon");
    }
  };

  // Edit coupon
  const editCoupon = (coupon: Coupon) => {
    setEditingId(coupon._id);
    setCode(coupon.code);
    setDiscountType(coupon.discountType);
    setDiscountValue(coupon.discountValue);
    setMinPurchase(coupon.minPurchase);
    setExpiryDate(coupon.expiryDate.split("T")[0]); // format YYYY-MM-DD
  };

  // Delete coupon
  const deleteCoupon = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${baseUrl}/coupons/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Coupon deleted");
        fetchCoupons();
      } else {
        toast.error(data.message || "Failed to delete coupon");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting coupon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Admin Coupons</h1>

        {/* Coupon Form */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-6 flex-wrap gap-2">
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[120px]"
          />
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as any)}
            className="border p-2 rounded"
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
          <input
            type="number"
            placeholder="Discount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            className="border p-2 rounded min-w-[120px]"
          />
          <input
            type="number"
            placeholder="Min Purchase"
            value={minPurchase}
            onChange={(e) => setMinPurchase(Number(e.target.value))}
            className="border p-2 rounded min-w-[120px]"
          />
          <input
            type="date"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border p-2 rounded min-w-[150px]"
          />
          <button
            onClick={saveCoupon}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition mt-2 md:mt-0"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </div>

        {/* Coupons Table */}
        <div className="overflow-x-auto">
          <table className="w-full border table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Code</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Value</th>
                <th className="border p-2">Min Purchase</th>
                <th className="border p-2">Expiry</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{c.code}</td>
                  <td className="border p-2 text-center">{c.discountType}</td>
                  <td className="border p-2 text-center">{c.discountValue}</td>
                  <td className="border p-2 text-center">{c.minPurchase}</td>
                  <td className="border p-2 text-center">
                    {new Date(c.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => editCoupon(c)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCoupon(c._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
