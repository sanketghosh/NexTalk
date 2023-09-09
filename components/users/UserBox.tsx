"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/components/Avatar";

type UserBoxProps = {
  data: User;
};

export default function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className="
    w-full
    relative
    flex
    items-center
    space-x-3
    p-3.5
    bg-white
    rounded-lg
    transition
    cursor-pointer
    border
    border-transparent
    hover:border-gray-200
    shadow-md
  "
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm md:text-base font-medium capitalize">
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
