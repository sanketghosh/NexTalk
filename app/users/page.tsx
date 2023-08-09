"use client";

import { signOut } from "next-auth/react";

export default function Users() {
  return (
    <div className="p-10">
      <button
        onClick={() => signOut()}
        className="uppercase px-6 py-2.5 bg-black text-gray-50 rounded-md shadow-lg shadow-zinc-500"
      >
        logout
      </button>
    </div>
  );
}
