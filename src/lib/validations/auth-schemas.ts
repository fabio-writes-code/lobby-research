
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
