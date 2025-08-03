"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setUser } from "@/app/redux/features/authSlice"
import { useAppDispatch } from "../../redux/hook/hook"
import { Loader2 } from "lucide-react" // spinner icon
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) // ✅ Loader state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true) // ✅ Show loader

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }else{
        toast.success("Login successful!") // ✅ Show success toast
      }

      dispatch(setUser(data.payload.user)) // ✅ Save user in Redux
      setTimeout(() => {
        router.push("/"); // redirect to /verify/email-sent
      }, 500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false) // ✅ Hide loader
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] px-4">
      <Card className="w-full max-w-sm shadow-xl border-none bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>Enter your email below to log in</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
  )
}
