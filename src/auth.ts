import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { auth_db } from "./server/auth-db";
import { LoginFormSchema } from "./app/validationSchemas";
import { users } from "./server/auth-db/schema";

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
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize: async (credentials) => {
      //   console.log('Credentials', credentials);

      //   try {
      //     const user = await db
      //       .select()
      //       .from(users)
      //       .where(eq(users.email.getSQL(), credentials.email))
      //       .execute();

      //     return user[0] as User;
      //   } catch (error) {
      //     console.error('there as an error');
      //     throw new Error('Invalid email or password from server');
      //     return null;
      //   }
      // },
      authorize: async (credentials) => {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await auth_db
            .select()
            .from(users)
            .where(eq(users.email.getSQL(), email))
            .execute()
            .then((user) => user[0]);

          if (!user?.password) {
            throw new Error("User nof found");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
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
