import { eq } from "drizzle-orm";
import { db} from "~/server/db";
import { users } from "~/server/db/schema";
import * as Sentry from "@sentry/nextjs";

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  } catch (e) {
    Sentry.captureException(e, {
      level: "error",
      tags: {
        action: "get_user_by_email",
        status: "failed",
        email: email
      },
      contexts: {
        userLookup: {
          errorType: e instanceof Error ? e.name : "Unknown error",
          errorMessage: e instanceof Error ? e.message : "Unknown error message"
        }
      }
    });
    
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching user by email:", e);
    }
    
    return null;
  }
};
