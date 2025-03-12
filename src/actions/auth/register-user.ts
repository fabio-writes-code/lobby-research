"use server";

import { db } from "~/server/db";
import { inviteTokens, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { registerFormSchema } from "~/lib/validations/auth-schemas";
import { getInviteTokenByToken } from "~/app/data/inviteToken";
import { checkRegistrationRateLimit } from "~/lib/rate-limit-action";

interface RegisterUserRequest{
  token: string,
  data:{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
  }
}

interface RegisterUserResult{
  success:boolean,
  error? :string
}

export async function registerNewUser({token, data}:RegisterUserRequest):Promise<RegisterUserResult> {
  // Check rate limit before processing
  const rateLimitCheck = await checkRegistrationRateLimit();
  if (!rateLimitCheck.success) {
    return { success: false, error: rateLimitCheck.error };
  }

  try {
    if (!token) throw new Error("Token not present")

    const validatedData = registerFormSchema.safeParse(data);
    if (!validatedData.success) throw new Error("Invalid data")

    const validToken = await getInviteTokenByToken(token);
    if (!validToken) throw new Error("Invalid Token")
    
    if (validToken.expiresAt < new Date()) {
      throw new Error("Expired Token")
    }

    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

    // TODO: Login user when registerd
    await db.insert(users).values({
      email: validToken.email,
      name: validatedData.data.name,
      password: hashedPassword,
      role: validToken.role
    });

    await db.delete(inviteTokens).where(eq(inviteTokens.token, validToken.token));
    
    return {success: true}
  } catch (error) {
    console.log(error);
    return {success:false, error: error instanceof Error? error.message: "Something went wrong"}
  }
}
