"use server";

import { db } from "~/server/db";
import { passwordResetTokens, users } from "~/server/db/schema";
import type { PasswordResetTokenRequest } from "~/lib/validations/password-reset";
import { passwordResetTokenRequest } from "~/lib/validations/password-reset";
import { generatePasswordResetToken } from "~/lib/password-reset-token";
import { eq } from "drizzle-orm";
import { sendPasswordResetEmail } from "./email/password-reset";
import { checkPasswordResetRateLimit } from "~/lib/rate-limit-action";

interface ResetTokenResponse{
  success: boolean,
  error?: string
}

export async function requestPasswordResetToken(values: PasswordResetTokenRequest): Promise<ResetTokenResponse>{
  // Check rate limit before processing
  const rateLimitCheck = await checkPasswordResetRateLimit();
  if (!rateLimitCheck.success) {
    return { success: false, error: rateLimitCheck.error };
  }

  try {
    const validatedUserRegistration = passwordResetTokenRequest.safeParse(values);

    if (!validatedUserRegistration.success) {
      throw new Error(`error: ${validatedUserRegistration.error.toString()}`)
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email))
      .then((res) => res[0]);

    if (!existingUser) throw new Error("User not found")

    const tokenData = await generatePasswordResetToken(validatedUserRegistration.data.email);
    if (!tokenData) {
      throw new Error("Failed to generate reset token'")
    }

    try {
      await sendPasswordResetEmail({email:existingUser.email, token:tokenData.token})
    } catch (emailError) {
      await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token,tokenData.token))
      console.error("Failed to send reset email, password reset token deleted from DB ", emailError)
      throw new Error("Failed to send request email")
    }

    return {success:true}
  } catch (error) {
    return {success:false, error: error instanceof Error? error.message: "Something went wrong"}
  }
}
