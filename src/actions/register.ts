"use server";
import { RegisterSchema } from "@/schema";
import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import * as z from "zod";
import { getUserbyEmail } from "@/data/user";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateSchema = RegisterSchema.safeParse(values);
  if (!validateSchema.success) {
    return { error: "invalid fields" };
  }
  const { email, name, password } = validateSchema.data;
  const existingEmail = await getUserbyEmail(email);

  if (existingEmail) {
    return { error: "Email already taken" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (e) {
    return { error: e };
  }

  return { success: "user is created" };
};
