import * as z from 'zod';
import { passwordStrengthSchema } from './password-strength';

export const passwordResetSchema = z
  .object({
    email: z.string().email(),
    password: passwordStrengthSchema,
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
