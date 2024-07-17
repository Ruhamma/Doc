import React from "react";
import { useGetDocsQuery } from "@/store/api";
import { DocsData, Section } from "@/types";

interface SideBarProps {
  onCreateClick: () => void;
  onSelectSection: (section: Section) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  onCreateClick,
  onSelectSection,
}) => {
  const { data, error, isLoading } = useGetDocsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="sidebar p-6 px-10 text-dark border-r border-gray-300 min-h-[100vh]">
      <ul className="tree list-none pl-0">
        {data?.map((doc: DocsData) => (
          <li key={doc.id} className="mb-2">
            {doc.documents.map((document: any) => (
              <React.Fragment key={document.id}>
                <p className="text-lg font-bold">{document.title}</p>
                {document.subSections && document.subSections.length > 0 && (
                  <ul className="list-none pl-2 ml-5 mt-1 border-l border-gray-300">
                    {document.subSections.map((section: Section) => (
                      <li key={section.id} className="mb-2 w-full text-md">
                        <a
                          onClick={() => onSelectSection(section)}
                          className="hover:bg-[#C1F1CC] hover:border-l-4 border-[#2EC150] w-full p-2 cursor-pointer"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
      <button
        onClick={onCreateClick}
        className="border border-primary rounded-md py-1 px-6 mt-4"
      >
        Create
      </button>
    </div>
  );
};

export default SideBar;
