"use server"

import { db } from "~/server/db";
import { inviteSchema} from "~/lib/validations/auth-schemas";
import type { InviteSchemaFormValues } from "~/lib/validations/auth-schemas";
import { inviteTokens } from "~/server/db/schema";
import { sendInviteToken } from "../email/token-invite";
import { eq } from "drizzle-orm/sql";

interface InviteTokenResponse{
  success: boolean,
  error?: string
}

export async function createInviteToken(formData: InviteSchemaFormValues): Promise<InviteTokenResponse> {
  try {
    const validatedFields = inviteSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        error: `Validation error: ${validatedFields.error.toString()}`
      };
    }

    const { email, role } = validatedFields.data;

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already in use"
      };
    }

    // Generate a random token
    const token = crypto.randomUUID();
    
    // Set expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await db.insert(inviteTokens).values({
      email,
      token,
      role: role.toLowerCase() as "admin" | "user" | "client",
      expiresAt,
    });

    try {
      await sendInviteToken({email:email, token:token})
    } catch (emailError) {
      await db.delete(inviteTokens).where(eq(inviteTokens.token, token))
      console.error("Failed to send invite email, token removed from DB ", emailError)
      throw new Error("Failed to send invite email")
    }

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create invite token"
    };
  }
}
