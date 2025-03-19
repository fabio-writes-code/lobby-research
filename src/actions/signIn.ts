"use server";

import { LoginFormSchema } from "~/lib/validations/auth-schemas";
import { signIn } from "~/auth";
import { AuthError } from "next-auth";
import type * as z from "zod";
import { DEFAULT_REDIRECT } from "routes";
import { checkSignInRateLimit } from "~/lib/rate-limit-action";

export const signInAction = async (values: z.infer<typeof LoginFormSchema>) => {
  // Check rate limit before processing
  const rateLimitCheck = await checkSignInRateLimit();
  if (!rateLimitCheck.success) {
    return { error: rateLimitCheck.error };
  }

  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }

    throw error;
  }
};
