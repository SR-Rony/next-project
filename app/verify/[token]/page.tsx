
import { CheckCircle, XCircle } from "lucide-react";

async function verifyToken(token: string) {
  try {
    const res = await fetch("http://localhost:4000/api/user/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Token verification failed",
      };
    }

    const data = await res.json();
    return {
      status: "success",
      message: "Email verified successfully!",
      ...data,
    };
  } catch {
    return {
      status: "error",
      message: "Unexpected error during verification",
    };
  }
}

export default async function VerifyTokenPage({
  params,
}: {
  params: { token: string };
}) {
  const result = await verifyToken(params.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center space-y-4">
        {result.status === "success" ? (
          <>
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-gray-600">{result.message}</p>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-gray-600">{result.message}</p>
          </>
        )}
      </div>
    </div>
  );
}
