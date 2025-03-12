import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "./server/db";
import { users } from "./server/db/schema";
import { LoginFormSchema } from "./lib/validations/auth-schemas";
import bcrypt from "bcryptjs";

type ExtendedUser = DefaultSession["user"] & {
  role: string;
};

declare module "next-auth" {
  interface User {
    id?: string;
    role: string;
    name?: string | null;
    email?: string | null;
  }
  interface Session {
    user: ExtendedUser & {
      id: string;
      email: string;
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            // Add a small delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
            const [user] = await db
              .select()
              .from(users)
              .where(eq(users.email, email));

            if (!user?.password) {
              console.warn(`Login attempt for non-existent user: ${email}`);
              return null;
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              // Return only the necessary user data
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          } catch (error) {
            console.error("Database error:", error);
            return null
          }
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
    maxAge: 24 * 60 * 60 //24 hours
  },
  cookies:{
    sessionToken:{
      name: `authjs.session-token`,
      options:{
        httpOnly:true,
        sameSite: 'lax',
        path:'/',
        secure: process.env.NODE_ENV === "production",
      }
    }
  }
});
