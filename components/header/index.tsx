"use client"

import Link from "next/link"
import { Menu, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SiteMenu from "./siteMenu"
import MenuItem from "./menu"
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const hasMounted = useHasMounted()
  const cart = useAppSelector((state) => state.cart || []) // ✅ safer access
  const user: UserType | null = useAppSelector((state) => state.user.user) // ✅ safer access
  console.log("user data",user);

  const userNmae = user?.name?.slice(0, 2).toUpperCase() || "Guest"
  

  // Sync localStorage cart to Redux on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartFromStorage = JSON.parse(localStorage.getItem("cart") || "[]")
      dispatch(setCart(cartFromStorage))
    }
  }, [dispatch])


  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout())
      router.push("/login")
    }
  }




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
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                {/* site menu add */}
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
              {!user ? 

                (<Link href="/login" className="p-2 rounded-md hover:bg-white/10 transition cursor-pointer">
                  <User className="w-6 h-6" />
                </Link>)

                :(<DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <User className="w-6 h-6" />
                      <span className="text-md">{userNmae || "Guest"}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Link className="w-full cursor-pointer" href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button onClick={handleLogout} className="w-full text-left">Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>)
              }
              <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10 transition">
                <ShoppingCart className="w-6 h-6" />
                {hasMounted && cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 text-xs bg-primary text-black rounded-full px-1 font-semibold select-none">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? 

                (<Link href="/login" className="p-2 rounded-md hover:bg-white/10 transition cursor-pointer">
                  <User className="w-6 h-6" />
                </Link>)

                :(<DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <User className="w-6 h-6" />
                      <span className="text-md">{userNmae || "Guest"}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Link className="w-full cursor-pointer" href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button onClick={handleLogout} className="w-full text-left">Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>)
              }
            <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10 transition">
              <ShoppingCart className="w-6 h-6" />
              {hasMounted && cart.length > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-primary text-black rounded-full px-1 font-semibold select-none">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <MenuItem />
    </header>
  )
}
