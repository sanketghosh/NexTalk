"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileNavItem from "@/components/sidebar/MobileNavItem";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        z-40
        flex
        bottom-0
        items-center
        bg-white
        border-t
        lg:hidden
        space-x-1
  "
    >
      {routes.map((item) => (
        <MobileNavItem
          key={item.label}
          href={item.href}
          active={item.active}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
