"use server";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateSchema = LoginSchema.safeParse(values);

  if (!validateSchema.success) {
    return { error: "invalid fields" };
  }
  const { email, password } = validateSchema.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "AuthorizedCallbackError":
          return { error: "Your email is unverified, please verify it first" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw e;
  }
};
