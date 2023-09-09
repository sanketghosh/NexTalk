"use client";

import { useState } from "react";

/* components */
import ConversationBox from "@/components/conversations/ConversationBox";

/* action  */
import useConversation from "@/hooks/useConversation";

/* ts types */
import { FullConversationType } from "@/types";

import clsx from "clsx";
import { useRouter } from "next/navigation";

/* icons */
import { RiUserAddFill } from "@/icons";

type ConversationListProps = {
  initialItems: FullConversationType[];
};

export default function ConversationList({
  initialItems,
}: ConversationListProps) {
  /*  */
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:block
        lg:w-80
        overflow-y-auto
        border-r
        border-gray-200
      `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span
            className="
            text-2xl font-bold text-gray-600 select-none
          "
          >
            Messages
          </span>
          <div
            className="
          rounded-full
          p-3 bg-white
          cursor-pointer text-gray-600
          hover:bg-orange-500 hover:text-white border transition
          "
          >
            <RiUserAddFill className="text-xl" />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}
