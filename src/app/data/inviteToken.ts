"use server"

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { inviteTokens } from "~/server/db/schema";

export const getInviteTokenByEmail = async (email: string) => {
  try {
    const inviteToken = await db
      .select()
      .from(inviteTokens)
      .where(eq(inviteTokens.email, email))
      .limit(1);

    return inviteToken[0] ?? null;
  } catch (error) {
    console.error("Error fetching reset token by email:", error);
    return null;
  }
};

export const getInviteTokenByToken = async (token: string) => {
  try {
    const inviteToken = await db
      .select()
      .from(inviteTokens)
      .where(eq(inviteTokens.token, token))
      .limit(1);

    return inviteToken[0] ?? null;
  } catch (error) {
    console.error("Error fetching reset token by token:", error);
    return null;
  }
};
