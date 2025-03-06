
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["STAFF", "CLIENT", "ADMIN"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be STAFF, CLIENT, or ADMIN",
  }),
});

export type InviteSchemaFormValues= z.infer<typeof inviteSchema>


export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(255, { message: "Name is too long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
