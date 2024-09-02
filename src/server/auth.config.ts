import bcrypt from "bcryptjs";
import { User, type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "~/actions/getUserByEmail";
import { LoginFormSchema } from "~/app/validationSchemas";

type ExtendedUser = DefaultSession["user"] & { role: string };

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: ExtendedUser;
  }
}

export default {
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

          const user = await getUserByEmail(email);

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
} satisfies NextAuthConfig;
