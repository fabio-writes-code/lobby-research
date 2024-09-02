import { between } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";

interface Params {
  params: { startDate: Date; endDate: Date };
}

export async function GET({ params }: Params) {
  const { startDate, endDate } = params;
  try {
    const document = await db
      .select()
      .from(hansardDocument)
      .where(between(hansardDocument.hansard_date, startDate, endDate));
    const contentArray = document[0]?.content?.split("\n");
    console.log(contentArray);
    return NextResponse.json({ content: contentArray }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
  return;
}
