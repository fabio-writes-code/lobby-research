"use client";

import SearchForm from "./SearchForm";
import SidePanel from "./SidePanel";
import TextArea from "./TextArea";

interface Props {
  content: { date: Date; content: string | null }[];
}

const ContentArea = ({ content }: Props) => {
  console.log(content);
  // const [searchTerm, setSearchTerm] = React.useState<string>("");
  // const [filteredContent, setFilteredContent] =
  //   React.useState<string[]>(content);

  // const handleInputBoxChange = (e: HTMLInputElement) => {
  //   setFilteredContent(() => {
  //     return content.filter((line) =>
  //       line.toLowerCase().includes(e.value.toLowerCase()),
  //     );
  //   });
  //   setSearchTerm(e.value);
  // };

  return (
    <div className="relative mt-4">
      <div className="grid grid-cols-7 gap-4">
        {!!content.length && (
          <div className="col-span-1">
            <SidePanel contentArray={content.map((content) => content.date)} />
          </div>
        )}
        <div className="col-span-6">
          <SearchForm isContent={!!content.length} />
          {!!content.length &&
            content.map((content) => (
              <TextArea
                id={content.date.toDateString()}
                key={content.date.toDateString()}
                content={content.content!.split("\n")}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
