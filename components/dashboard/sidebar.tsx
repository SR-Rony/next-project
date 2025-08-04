"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Package, Heart, MapPin, LogOut, Menu, X } from "lucide-react";
import { logout } from "@/app/redux/features/authSlice";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook/hook";
import { toast } from "sonner";
import clsx from "clsx";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user: UserType | null = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.push("/user/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:4000/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(logout());
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/user/login");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { label: "Orders", icon: Package, href: "/dashboard/orders" },
    { label: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { label: "Addresses", icon: MapPin, href: "/dashboard/addresses" },
  ];


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 bg-white shadow-sm flex items-center justify-between">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg p-5 flex-col">
        <SidebarContent
          user={user}
          navItems={navItems}
          onLogout={handleLogout}
          router={router}
        />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <SidebarContent
          user={user}
          navItems={navItems}
          onLogout={handleLogout}
          router={router}
        />
      </div>
    </>
  );
}


  // Sidebar Content Props Type
interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarContentProps {
  user: UserType | null;
  navItems: NavItem[];
  onLogout: () => void;
  router: ReturnType<typeof useRouter>;
}

// Sidebar Content as a Reusable Component
function SidebarContent({ user, navItems, onLogout, router }: SidebarContentProps) {
  return (
    <>
      <div className="flex flex-col items-center mb-8 mt-4">
        <Avatar className="w-20 h-20 border-4 border-primary shadow-sm">
          <AvatarImage src={"/default-avatar.png"} />
          <AvatarFallback>{user?.name?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <h2 className="mt-3 font-semibold text-lg">{user?.name || "Guest"}</h2>
        <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item, i) => (
          <Button
            key={i}
            variant="ghost"
            className="w-full justify-start hover:bg-primary/10 transition-colors cursor-pointer"
            onClick={() => router.push(item.href)}
          >
            <item.icon className="mr-3 h-4 w-4" /> {item.label}
          </Button>
        ))}
        <Button
          variant="destructive"
          className="w-full justify-start mt-6 hover:opacity-90 transition cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" /> Logout
        </Button>
      </nav>
    </>
  );
}
