"use client";

import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopNavItem from "@/components/sidebar/DesktopNavItem";
import { signOut } from "next-auth/react";

export default function DesktopSidebar() {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
      hidden 
      lg:fixed 
      lg:inset-y-0 
      lg:left-0
      lg:z-40 
      lg:w-20 
      xl:px-6 
      lg:overflow-y-auto 
      lg:bg-white 
      lg:border-r 
      lg:border-gray-200 
      lg:pb-4 
      lg:flex 
      lg:flex-col 
      justify-between
  "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-3">
          {routes.map((item) => (
            <DesktopNavItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
