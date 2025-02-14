
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { passwordResetTokens } from "~/server/db/schema";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email))
      .limit(1);

    return resetToken[0] ?? null;
  } catch (error) {
    console.error("Error fetching reset token by email:", error);
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);

    return resetToken[0] ?? null;
  } catch (error) {
    console.error("Error fetching reset token by token:", error);
    return null;
  }
};
