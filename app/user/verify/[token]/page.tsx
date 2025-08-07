const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

// Helper function to call backend
async function verifyToken(token: string) {
  try {
    const res = await fetch(`${baseUrl}/user/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ token }),
    });
    return await res.json();
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// ✅ Await the `params` using a function that accepts a `params` Promise
export default async function VerifyTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params; // ✅ Await here
  const result = await verifyToken(token);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {result.success ? (
          <>
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Email Verified!</h2>
            <p className="mt-2">{result.message}</p>
            <Link href="/user/login" className="text-primary underline mt-4 block">
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Verification Failed</h2>
            <p className="mt-2">{result.message}</p>
            <Link href="/user/register" className="text-primary underline mt-4 block">
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
