"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Palette } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Components",
      href: "/components",
      icon: Palette,
    },
    // {
    //   name: "Workspace",
    //   href: "/workspace",
    //   icon: Workflow,
    // },
    // {
    //   name: "Editor",
    //   href: "/editor",
    //   icon: Code,
    // },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
} 