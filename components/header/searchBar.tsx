import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar() {

    return (
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
    )
}