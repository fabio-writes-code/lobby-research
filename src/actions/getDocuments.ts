"use server";

import { between } from "drizzle-orm";
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
    console.log(e);
    return [];
  }
};
