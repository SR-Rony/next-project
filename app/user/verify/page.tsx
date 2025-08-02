import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
        <MailCheck className="mx-auto text-green-500" size={48} />
        <h1 className="text-2xl font-semibold">Verify Your Email</h1>
        <p className="text-gray-600">
          We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account.
        </p>
        <Link href="user/login">
          <p className="text-primary hover:underline">Back to Login</p>
        </Link>
      </div>
    </div>
  );
}