"use server";

import { between } from "drizzle-orm";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";

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
        date: hansardDocument.hansard_date,
        content: hansardDocument.content,
      })
      .from(hansardDocument)
      .where(between(hansardDocument.hansard_date, startDate, endDate));
    const contentArray = document;
    return contentArray;
  } catch (e) {
    console.log(e);
    return [];
  }
};
