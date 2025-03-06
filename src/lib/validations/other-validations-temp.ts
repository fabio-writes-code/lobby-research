
import { z } from "zod";




export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email(),
  password: z.string().min(8, "Password is too short").max(255, "Password is too long"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});


export const NewPasswordSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password needs to be longer than 8 characters" })
    .max(20, { message: "Password needs to be shorter than 20 characters" }),
});
