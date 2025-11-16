"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/app/redux/features/authSlice";
import { useAppDispatch } from "../../redux/hook/hook";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import type { UserType } from "@/types/user";


// ========================
// 🔹 Type Definitions
// ========================
interface LoginResponse {
  statusCode: number;
  message: string;
  payload?: {
    user: UserType;
  };
}

// ========================
// 🔹 Component
// ========================
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        { phone, password },
        { withCredentials: true }
      );
      const data = res.data;

      console.log("User data:", data);

      if (data.statusCode === 200 && data.payload?.user) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.payload.user));
        dispatch(setUser(data.payload.user));
        router.push("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] px-4">
      <Card className="w-full max-w-sm shadow-xl border-none bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>Enter your phone number and password</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                placeholder="e.g. 017XXXXXXXX"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="forgot-password" className="text-sm text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full mt-2 cursor-pointer" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="register" className="text-primary underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
