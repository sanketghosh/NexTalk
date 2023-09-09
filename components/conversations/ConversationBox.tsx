"use client";

import { useState, useCallback } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Conversation, Message, User } from "@prisma/client";
import clsx from "clsx";
import { FullConversationType } from "@/types";

type ConversationBoxProps = {
  data: FullConversationType;
  selected?: boolean;
};

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  return <div>ConversationBox</div>;
}
