"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../atoms/Button";
import { logoutAction } from "@/app/(auth)/signin/actions";

export function Navbar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
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
    <nav className="bg-nav-bg text-nav-text border-b border-nav-border">
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
                        ? "bg-nav-active text-nav-text font-semibold"
                        : "text-nav-muted hover:bg-nav-active hover:text-nav-text"
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
              className="text-nav-muted hover:text-nav-text hover:bg-nav-active"
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
