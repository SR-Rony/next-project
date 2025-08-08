"use client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useAppSelector, useAppDispatch } from "@/app/redux/hook/hook";
import { UserType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Package, Heart, MapPin } from "lucide-react";
import { logout } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user: UserType | null = useAppSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(logout());
      toast.success("Logged out successfully!");
      router.push("/user/login");
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
    <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-20 h-20 border-4 border-primary shadow-sm">
          <AvatarImage src={'img'} />
          <AvatarFallback>{user?.name?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <h2 className="mt-3 font-semibold text-lg">{user?.name || "Guest"}</h2>
        <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item, i) => (
          <Button
            key={i}
            variant="ghost"
            className="w-full justify-start hover:bg-primary/20 transition-colors cursor-pointer"
            onClick={() => router.push(item.href)}
          >
            <item.icon className="mr-3 h-4 w-4" /> {item.label}
          </Button>
        ))}
        <Button
          variant="destructive"
          className="w-full justify-start mt-6 hover:opacity-90 transition"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" /> Logout
        </Button>
      </nav>
    </aside>
  );
}
