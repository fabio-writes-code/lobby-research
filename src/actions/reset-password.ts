"use server";

import { getPasswordResetTokenByToken } from "~/app/data/passwordResetToken";
import { db } from "~/server/db";
import { passwordResetTokens, users } from "~/server/db/schema";
import { passwordResetSchema } from "~/lib/validations/password-reset";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface ResetPasswordRequest{
  token: string,
  data:{
    email:string,
    password:string,
    confirmPassword:string
  }
}

interface ResetPasswordResult{
  success:boolean,
  error? :string
}

export async function resetPassword({token, data}:ResetPasswordRequest):Promise<ResetPasswordResult> {


  try {
    if (!token) throw new Error("Token not present")

    const validatedData = passwordResetSchema.safeParse(data);
    if (!validatedData.success) throw new Error("Invalid data")

    const validToken = await getPasswordResetTokenByToken(token);
    if (!validToken) throw new Error("Invalid Token")
    
    if (validToken.expiresAt < new Date()) {
      throw new Error("Expired Token")
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validToken.email))
      .limit(1);

    if (!existingUser) throw new Error("User not found")

    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, validToken.email));

    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, validToken.token));

    return {success: true}
  } catch (error) {
    console.log(error);
    return {success:false, error: error instanceof Error? error.message: "Something went wrong"}
  }
}
