"use server"

import { getPasswordResetTokenByEmail } from "~/app/data/passwordResetToken";
import { db } from "~/server/db";
import { passwordResetTokens } from "~/server/db/schema";
import { eq} from "drizzle-orm";

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID(); 
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.email, existingToken.email))
  }

  const resetToken = await db
    .insert(passwordResetTokens)
    .values({
      email: email,
      token: token,
      expiresAt: expires,
    })
    .returning({ token: passwordResetTokens.token, email: passwordResetTokens.email });

  return resetToken[0];
};
