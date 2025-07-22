"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer(): JSX.Element {
  const quickLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  const customerLinks: { href: string; label: string }[] = [
    { href: "/faq", label: "FAQ" },
    { href: "/returns", label: "Returns" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/terms", label: "Terms & Conditions" },
  ]

  const socialIcons: React.ElementType[] = [Facebook, Twitter, Instagram]

  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Azpero</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your one-stop shop for everything awesome. Quality and trust, all in one place.
            </p>
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="mt-1" /> 123 Dhaka, Bangladesh
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Phone size={16} /> +880 1234 567 890
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Mail size={16} /> support@azpero.com
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-sm leading-relaxed mb-4">
              Get the latest deals and updates straight to your inbox.
            </p>
            <form className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white dark:bg-gray-800"
              />
              <Button variant="default">Subscribe</Button>
            </form>
            <div className="flex gap-4 mt-6 text-gray-500 dark:text-gray-400">
              {socialIcons.map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} <span className="text-primary font-semibold">Azpero</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
