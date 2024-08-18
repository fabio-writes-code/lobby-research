import ContentArea from "./ContentArea";
import initContent from "./content";

export default async function documentList() {
  const tempText = initContent;

  const content = tempText.split("\n\n");

  // const parsedContent = await remark().use(html).process(tempText);
  return (
    <>
      <ContentArea content={content} />
      {/* <div
        className=""
        dangerouslySetInnerHTML={{ __html: parsedContent.toString() }}
      ></div> */}
      {/* <ReactMarkdown>{tempText}</ReactMarkdown> */}
    </>
  );
}
