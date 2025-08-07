"use client"

import Link from "next/link"
import { Menu, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SiteMenu from "./siteMenu"
import SearchBar from "./searchBar"
import { useAppSelector } from "@/app/redux/hook/hook"
import { setCart } from "@/app/redux/features/cartSlice"
import { useDispatch } from "react-redux"
import { useHasMounted } from "@/app/redux/hook/mounted"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/app/redux/features/authSlice"
import { UserType } from "@/types/user"
import MobileBottomMenu from "./menu"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const hasMounted = useHasMounted()
  const cart = useAppSelector((state) => state.cart || [])
  const user: UserType | null = useAppSelector((state) => state.user.user)

  const userName = user?.name?.slice(0, 2).toUpperCase() || "GU"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartFromStorage = JSON.parse(localStorage.getItem("cart") || "[]")
      dispatch(setCart(cartFromStorage))
    }
  }, [dispatch])

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout())
      router.push("/user/login")
    }
  }

  const renderUserMenu = () =>
    !user ? (
      <Link
        href="/user/login"
        className="p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
      >
        <User className="w-6 h-6" />
      </Link>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer">
            <User className="w-6 h-6" />
            <span className="text-md">{userName}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Link className="w-full cursor-pointer" href="/user/profile">
              Profile
            </Link>
          </DropdownMenuItem>
          {user?.isAdmin && (
            <DropdownMenuItem>
              <Link className="w-full cursor-pointer" href="/dashboard">
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <button onClick={handleLogout} className="w-full text-left">
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

  const renderCartIcon = () => (
    <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10 transition">
      <ShoppingCart className="w-6 h-6" />
      {hasMounted && cart.length > 0 && (
        <span className="absolute -top-1 -right-2 text-xs bg-primary text-black rounded-full px-1 font-semibold select-none">
          {cart.length}
        </span>
      )}
    </Link>
  )

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#131921] via-[#1f2a38] to-[#131921] text-white shadow-md border-b border-gray-800">
      <div className="container mx-auto py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              {/* Hamburger for mobile */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/10 transition rounded-md cursor-pointer"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SiteMenu />
              </Sheet>

              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-extrabold text-primary hover:text-primary/80 transition whitespace-nowrap"
              >
                Azpero
              </Link>
            </div>

            {/* Icons on small screens */}
            <div className="flex items-center gap-4 md:hidden">
              {renderUserMenu()}
              {renderCartIcon()}
            </div>
          </div>

          {/* Search Bar (centered) */}
          <SearchBar />

          {/* Icons on desktop */}
          <div className="hidden md:flex items-center gap-4">
            {renderUserMenu()}
            {renderCartIcon()}
          </div>
        </div>
      </div>

      {/* Menu Items (Visible on all screen sizes) */}
      <div className="hidden md:flex justify-center container mx-auto items-center bg-[#232f3e] px-4 py-2 text-sm gap-6 border-t border-gray-700">
          {menuItems.map((item) => (
              <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-hover_color transition font-medium"
              >
                  {item.name}
              </Link>
          ))}
      </div>
      <MobileBottomMenu/>
    </header>
  )
}
