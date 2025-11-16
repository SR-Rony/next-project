"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./searchBar";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { useHasMounted } from "@/app/redux/hook/mounted";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/redux/features/authSlice";
import { UserType } from "@/types/user";
import MobileBottomMenu from "./menu";
import SiteMenu from "./siteMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hasMounted = useHasMounted();

  // FIXED — correct cart state read
  const cartItems = useAppSelector((state) => state.cart.items);

  // FIXED — user state
  const user: UserType | null = useAppSelector((state) => state.user.user);
  
  const userName = user?.name?.slice(0, 2).toUpperCase() || "GU";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      router.push("/user/login");
    }
  };

  const renderUserMenu = () =>
    !user ? (
      <Link href="/user/login" className="p-2 rounded-md hover:bg-white/10">
        <User className="w-6 h-6" />
      </Link>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer">
            <User className="w-6 h-6" />
            <span>{userName}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>

          {user?.role && (
            <DropdownMenuItem>
              <Link href="/dashboard" className="w-full">
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
    );

  const renderCartIcon = () => (
    <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/10">
      <ShoppingCart className="w-6 h-6" />

      {/* FIXED — correct cart count */}
      {hasMounted && cartItems.length > 0 && (
        <span className="absolute top-0 right-0 text-xs bg-primary text-black rounded-full px-1 font-semibold">
          {cartItems.length}
        </span>
      )}
    </Link>
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#131921] via-[#1f2a38] to-[#131921] text-white shadow-md">
      <div className="container mx-auto py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2 md:px-0">
          {/* Left Section */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex gap-2">
              {/* Mobile Menu */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-4 bg-[#1f2a38] text-white">
                  <nav className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    <SiteMenu />
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-extrabold text-primary hover:text-primary/80"
              >
                Azpero
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 md:hidden">
              {renderUserMenu()}
              {renderCartIcon()}
            </div>
          </div>

          {/* Search */}
          <SearchBar />

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            {renderUserMenu()}
            {renderCartIcon()}
          </div>
        </div>
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:flex justify-center bg-[#232f3e] px-4 py-2 gap-6 border-t border-gray-700">
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

      {/* Mobile Bottom Menu */}
      <MobileBottomMenu />
    </header>
  );
}
