"use client";

import { User } from "@prisma/client";
import UserBox from "@/components/users/UserBox";

type UserListProps = {
  items: User[];
};

export default function UserList({ items }: UserListProps) {
  return (
    <aside
      className="
        fixed
        inset-y-0
        pb-20
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0
  "
    >
      <div className="px-2">
        <div className="flex-col">
          <h1 className="text-2xl font-bold text-gray-600 py-4 select-none">
            People
          </h1>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}
