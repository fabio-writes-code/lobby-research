import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";
import ContentArea from "./ContentArea";

interface Props {
  params: {
    id: string;
  };
}

const fetchDocument = cache(
  async (id: string) =>
    await db
      .select()
      .from(hansardDocument)
      .where(eq(hansardDocument.hansard_id, id)),
);

export default async function documentList({ params }: Props) {
  const hansardDocument = await fetchDocument(params.id);

  const content = hansardDocument[0]?.content?.split("\n\n");

  return (
    <div className="ml-64">
      <ContentArea content={content!} />
    </div>
  );
}
