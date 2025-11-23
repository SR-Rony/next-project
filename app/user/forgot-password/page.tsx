"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
}

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{10,15}$/.test(phone)) {
      toast.error("Invalid phone number");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/user/forgot-password", { phone });
      toast.success("OTP sent to your phone number!");
      router.push(`/user/forgot-password/verify?phone=${phone}`);
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading} className="w-full flex justify-center items-center">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
        </Button>

      </form>
    </div>
  );
}
