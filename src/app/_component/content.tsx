"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getDocumentAndSection } from "@/utils";
import { slugify } from "@/utils/slugify";

const customStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  padding: "1em",
  margin: "1em 0",
  overflowX: "auto",
};

const Content: React.FC = () => {
  const pathname = usePathname();
  const { document, section, isLoading, error } =
    getDocumentAndSection(pathname);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!document) return <div>Document not found</div>;
  if (!section) return <div>Section not found</div>;

  console.log("section", section);

  return (
    <div className="content p-10 px-20">
      <p className="text-3xl font-bold text-dark py-4 open-sans">
        {section.title}
      </p>
      <p className="text-dark">{section.content}</p>
      <SyntaxHighlighter
            language="javascript"
            style={coy}
            customStyle={customStyle}
          >
            {section.example}
          </SyntaxHighlighter>


      {section.subSections?.map((sub) => (
        <div id={slugify(sub.title)}>
          <p className="text-xl font-semibold py-2 open-sans text-dark">
            {sub.title}
          </p>
          {/* <p>{sub.content}</p> */}
          <p>ahahaha</p>
          <div>hey</div>
          {/* Add this line for debugging */}
         
        </div>
      ))}

      
    </div>
  );
};

export default Content;
