import { eq } from "drizzle-orm";
import { db} from "~/server/db";
import { users } from "~/server/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
