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
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] px-4">
      <Card className="w-full max-w-sm shadow-xl border-none bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create a new account</CardTitle>
          <CardDescription>
            Enter your details to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-2 cursor-pointer">
              Sign Up
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline underline-offset-4">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
