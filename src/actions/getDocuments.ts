"use server";

import { between } from "drizzle-orm";
import * as Sentry from "@sentry/nextjs";
import { db } from "~/server/db";
import { hansardDocuments } from "~/server/db/schema";

interface GetDocumentsParams {
  startDate: Date;
  endDate: Date;
}

export const getDocuments = async ({
  startDate,
  endDate,
}: GetDocumentsParams) => {
  try {
    const document = await db
      .select({
        date: hansardDocuments.hansardDate,
        content: hansardDocuments.content,
      })
      .from(hansardDocuments)
      .where(between(hansardDocuments.hansardDate, startDate, endDate));
    const contentArray = document;
    return contentArray;
  } catch (e) {
    Sentry.captureException(e, {
      tags: {
        action: "getDocuments",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      },
      level: "error"
    });
    console.error("Error fetching documents:", e);
    return [];
  }
};
