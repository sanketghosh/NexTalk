"use client";

import { User } from "@prisma/client";
import Image from "next/image";

type AvatarPropsType = {
  user?: User;
};

export default function Avatar({ user }: AvatarPropsType) {
  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        h-9
        w-9
        md:h-11
        md:w-11
      "
      >
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="avatar"
          fill
          className="border-2 border-orange-500 object-cover rounded-full"
        />
      </div>
      <span
        className="
        absolute
        block
        rounded-full
        ring-2
        ring-white
        top-0
        right-0
        h-2
        bg-emerald-400
        w-2
        md:h-3
        md:w-3
      "
      />
    </div>
  );
}
