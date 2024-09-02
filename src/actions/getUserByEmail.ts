import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
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
