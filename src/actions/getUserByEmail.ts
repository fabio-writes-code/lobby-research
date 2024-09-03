import { eq } from "drizzle-orm";
import { auth_db } from "~/server/auth-db";
import { users } from "~/server/auth-db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await auth_db
      .select()
      .from(users)
      .where(eq(users.email.getSQL(), email))
      .execute()
      .then((user) => user[0]);

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
