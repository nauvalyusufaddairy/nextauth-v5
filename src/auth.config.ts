import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserbyEmail, getUserbyId } from "./data/user";
import * as bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export default {
  providers: [
    Google,
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateSchema = LoginSchema.safeParse(credentials);

        if (validateSchema.success) {
          const { email, password } = validateSchema.data;

          const user = await getUserbyEmail(email);
          if (!user || !user.password) return null;
          const passwordMatched = await bcrypt.compare(password, user.password);

          if (passwordMatched) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserbyId(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },
    async jwt({ token, account }) {
      if (!token.sub) return token;
      const role = await getUserbyId(token.sub);

      if (!role) return token;

      token.role = role.role;

      return token;
    },
    async session({ session, token }) {
      console.log("Session and token", session, "--------", token);
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
