import NextAuth from "next-auth";
import { authOption } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
