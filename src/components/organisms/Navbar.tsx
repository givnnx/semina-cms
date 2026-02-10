"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../atoms/Button";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Simplified role check - in real app might come from context or cookie
  // For now just checking if we can logout
  const handleLogout = () => {
    // In a real app we would call a server action to clear cookies
    // For now, simple redirect since we can't easily clear httpOnly cookies from client
    // without an API route or Server Action.
    // We will redirect to /signin.
    // (Ideally we should have a logout route or action)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/signin");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Talents", href: "/talents" },
    { name: "Events", href: "/events" },
    { name: "Payments", href: "/payments" },
    { name: "Order", href: "/orders" },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/">Logo</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
