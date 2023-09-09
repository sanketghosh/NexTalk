import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSession() {
  /* the way we get the details about current session */
  return await getServerSession(authOptions);
}
