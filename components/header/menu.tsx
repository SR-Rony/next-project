import { Home, ShoppingBag, Wrench, Info, Phone } from "lucide-react"
import Link from "next/link"

const mobileMenuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
]

export default function MobileBottomMenu() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#232f3e] text-white border-t border-gray-700">
      <div className="flex justify-between px-4 py-2">
        {mobileMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center text-xs hover:text-hover_color transition"
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
