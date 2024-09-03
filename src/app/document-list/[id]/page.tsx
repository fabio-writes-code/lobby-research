import ContentArea from "./ContentArea";
import initContent from "./content";
import { cache } from "react";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";
import { eq } from "drizzle-orm";

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
  // const tempText = initContent;

  const content = hansardDocument[0]?.content?.split("\n\n");

  // const parsedContent = await remark().use(html).process(tempText);
  return (
    <>
      <ContentArea content={content!} />
      {/* <div
        className=""
        dangerouslySetInnerHTML={{ __html: parsedContent.toString() }}
      ></div> */}
      {/* <ReactMarkdown>{tempText}</ReactMarkdown> */}
    </>
  );
}
