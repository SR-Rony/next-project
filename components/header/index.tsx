"use client"

import Link from "next/link"
import { Menu, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import SiteMenu from "./siteMenu"
import MenuItem from "./menu"
import SearchBar from "./searchBar"

export default function Header() {
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
                {/* site menu */}
                <SiteMenu />
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
                <span className="absolute -top-1 -right-2 text-xs bg-primary text-black rounded-full px-1 font-semibold select-none">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

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
              <span className="absolute -top-1 -right-2 text-xs bg-primary text-black rounded-full px-1 font-semibold select-none">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Menu Links */}
      <MenuItem />
    </header>
  )
}
