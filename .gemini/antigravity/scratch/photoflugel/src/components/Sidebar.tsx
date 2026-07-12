"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Image as ImageIcon, History, FolderOpen, CreditCard, Settings, User } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const links = [
    { name: "Generate", href: "/dashboard", icon: ImageIcon },
    { name: "History", href: "/history", icon: History },
    { name: "Collections", href: "/collections", icon: FolderOpen },
    { name: "Billing", href: "/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r bg-background/50 backdrop-blur-xl flex flex-col h-full hidden md:flex">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">PhotoFlugel</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium truncate">{user?.fullName || "User"}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
