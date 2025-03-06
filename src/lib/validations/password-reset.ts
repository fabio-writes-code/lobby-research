import * as z from 'zod';

export const passwordResetSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password needs to be longer than 8 characters" })
      .max(20, { message: "Password needs to be shorter than 20 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passord missmatch",
    path: ["Confirm Password"],
  });

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>

export const passwordResetTokenRequest = z.
  object({
  email:z.string().email()
})

export type PasswordResetTokenRequest = z.infer<typeof passwordResetTokenRequest>
