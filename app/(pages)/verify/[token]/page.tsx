import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface VerifyPageProps {
  params: {
    token: string
  }
}

async function verifyToken(token: string) {
  try {
    const res = await fetch("http://localhost:4000/api/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // to avoid caching
      body: JSON.stringify({ token }), // sending token in body
    });

    if (res.ok) {
      return { status: "success" };
    } else {
      return { status: "error" };
    }
  } catch (err) {
    return { status: "error" };
  }
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { token } = params
  console.log("Verifying token:", token)
  const result = await verifyToken(token)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center space-y-4">
        {result.status === "success" ? (
          <>
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-gray-600">Your email has been successfully verified.</p>
            <Link href="/login">
              <Button className="mt-4 w-full">Go to Login</Button>
            </Link>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            <p className="text-gray-600">This token is invalid or expired.</p>
            <Link href="/resend-verification">
              <Button variant="outline" className="mt-4 w-full">
                Resend Verification
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
