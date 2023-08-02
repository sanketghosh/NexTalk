import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    /* for user email password login */
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      /* authorize function will help to match what user has written in the login/password form with the existing login and password in the database */
      async authorize(credentials) {
        /* check if the email and password has been passed from the form */
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        /* if the email and password exists, lets search for our user */
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        /* check if the user actually exists and why hashed password checking ? what if the user has logged in with any other providers (which I might add later, e.g. google, github)*/
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        /* check if the password is correct */
        /* lets compare the entered password with existing password in DB using bcrypt */
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        /* throw an error if the password is not correct */
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
