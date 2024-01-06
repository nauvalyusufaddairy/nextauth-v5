import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserbyEmail, getUserbyId } from "./data/user";
import * as bcrypt from "bcryptjs";

export default {
  providers: [
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
    async jwt({ token, account }) {
      if (!token.sub) return token;
      const role = await getUserbyId(token.sub);

      if (!role) return token;

      token.role = role.role;

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
