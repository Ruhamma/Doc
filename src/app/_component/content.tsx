"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useGetDocsQuery } from "@/store/api";
import { getDocumentAndSection, slugify } from "@/utils";

const Content: React.FC = () => {
  const pathname = usePathname();
  const { document, section, isLoading, error } =
    getDocumentAndSection(pathname);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (!document) return <div>Document not found</div>;
  if (!section) return <div>Section not found</div>;

  return (
    <div className="content p-10 px-20">
      <p className="text-3xl font-bold text-dark py-4 open-sans">
        {section.title}
      </p>
      <p className="h-[50vh] text-dark">{section.content}</p>
      {section.subSections.map((sub, index) => (
        <div key={index} id={slugify(sub.title)}>
          <p className="text-xl font-semibold py-2 open-sans text-dark">
            {sub.title}
          </p>
          <p>{sub.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
