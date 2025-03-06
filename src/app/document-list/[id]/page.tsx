import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/server/db";
import { hansardDocuments } from "~/server/db/schema";
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
      .from(hansardDocuments)
      .where(eq(hansardDocuments.hansardId, id)),
);

export default async function documentList({ params }: Props) {
  const hansardDocuments = await fetchDocument(params.id);

  const content = hansardDocuments[0]?.content?.split("\n\n");

  return (
    <div className="lg:ml-64 ml-0 relative">
      <ContentArea content={content!} />
    </div>
  );
}
