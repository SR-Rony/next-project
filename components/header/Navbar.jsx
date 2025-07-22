"use client"

import Link from "next/link"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#131921] via-[#1f2a38] to-[#131921] text-white shadow-md border-b border-gray-800">
      <div className="container mx-auto py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/10 transition rounded-md cursor-pointer"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6 " />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-white text-black p-6">
                  <p className="text-lg font-semibold mb-4">All Categories</p>
                  {[
                    "Electronics",
                    "Fashion",
                    "Home",
                    "Books",
                    "Toys",
                    "Beauty",
                    "Grocery",
                  ].map((item) => (
                    <Link
                      href={`/category/${item.toLowerCase()}`}
                      key={item}
                      className="block px-4 py-2 rounded hover:bg-primary hover:text-white transition"
                    >
                      {item}
                    </Link>
                  ))}
                </SheetContent>
              </Sheet>

              <Link
                href="/"
                className="text-2xl font-extrabold text-primary hover:text-primary/80 transition whitespace-nowrap"
              >
                Azpero
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 md:hidden">
              <Link
                href="/login"
                className="p-2 rounded-md hover:bg-white/10 transition"
                aria-label="User account"
              >
                <User className="w-6 h-6" />
              </Link>
              <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10 transition" aria-label="Shopping cart">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 text-xs bg-yellow-400 text-black rounded-full px-1 font-semibold select-none">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-center md:justify-center">
            <div className="flex w-full max-w-2xl shadow-lg rounded-md overflow-hidden border border-gray-700">
              <Input
                placeholder="Search on Azpero..."
                className="rounded-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-[#131921] bg-[#1f2a38] border-none text-white placeholder:text-gray-400"
              />
              <Button
                className="bg-primary hover:bg-primary/90 text-black rounded-none px-4"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="p-2 rounded-md hover:bg-white/10 transition"
              aria-label="User account"
            >
              <User className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10 transition" aria-label="Shopping cart">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 text-xs bg-yellow-400 text-black rounded-full px-1 font-semibold select-none">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Menu Links */}
      <div className="hidden md:flex justify-center container mx-auto items-center bg-[#232f3e] px-4 py-2 text-sm gap-6 border-t border-gray-700">
        <Link
            href='/'
            className="hover:text-hover_color transition font-medium"
          >
            Home
          </Link>
          <Link
            href='/about'
            className="hover:text-hover_color transition font-medium"
          >
            About
          </Link>
          <Link
            href='/contact'
            className="hover:text-hover_color transition font-medium"
          >
            Contact
          </Link>
          <Link
            href='/services'
            className="hover:text-hover_color transition font-medium"
          >
            Services
          </Link>
      </div>
    </header>
  )
}
