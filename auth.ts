import { eq } from "drizzle-orm";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "~/app/validationSchemas";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import bcrypt from "bcryptjs";

type ExtendedUser = DefaultSession["user"] & { role: string };

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email.getSQL(), email))
            .execute()
            .then((user) => user[0]);

          if (!user?.password) throw new Error("Invalid credentials");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
