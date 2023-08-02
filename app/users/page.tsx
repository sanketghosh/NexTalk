"use client";

import { signOut } from "next-auth/react";

export default function Users() {
  return (
    <div className="p-10">
      <button
        onClick={() => signOut()}
        className="px-6 py-2.5 bg-black text-gray-50 rounded-md"
      >
        logout
      </button>
    </div>
  );
}
