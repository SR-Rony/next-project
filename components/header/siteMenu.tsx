import Link from "next/link";
import { SheetContent } from "../ui/sheet";

export default function SiteMenu() {
    return (
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
    )
}