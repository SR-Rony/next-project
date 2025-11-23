"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function VerifyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const p = searchParams.get("phone");
    if (!p) {
      toast.error("Phone number missing!");
      router.push("/user/forgot-password");
    } else {
      setPhone(p);
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP");
    setLoading(true);

    try {
      await axiosInstance.post("/user/verify-forgot-otp", { phone, otp });
      toast.success("OTP verified!");
      router.push(`/user/forgot-password/reset?phone=${phone}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid OTP");
        console.log("error",err);
        
      } else {
        toast.error("Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!phone) return null; // wait until phone is set

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
        </Button>
      </form>
    </div>
  );
}
