/* hooks */
import { useMemo } from "react";
import { usePathname } from "next/navigation";

/* icons */
import { HiChat, HiArrowLeftOnRectangle, HiUsers } from "@/icons";

/* next auth sign-out function */
import { signOut } from "next-auth/react";

import useConversation from "@/hooks/useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
