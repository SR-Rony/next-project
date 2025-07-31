// app/(pages)/verify/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function VerificationSentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center space-y-4">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold">Verification Email Sent!</h2>
        <p className="text-gray-600">
          Please check your email and click the verification link to activate your account.
        </p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
