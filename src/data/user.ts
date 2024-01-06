import { db } from "@/lib/db";
import { use } from "react";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserbyId = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};
