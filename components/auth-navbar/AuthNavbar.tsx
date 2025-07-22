"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Azpero
        </Link>

        {/* Auth Buttons */}
        <div className="space-x-3">
          <Link href="/login">
            <Button variant="outline" className="cursor-pointer" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" className="cursor-pointer" size="sm">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
