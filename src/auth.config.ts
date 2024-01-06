import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserbyEmail } from "./data/user";
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
} satisfies NextAuthConfig;
