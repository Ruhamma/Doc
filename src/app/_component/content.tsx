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
    <div className="content">
      <h1>{section.title}</h1>
      <p className="h-[100vh]">{section.content}</p>
      {section.subSections.map((sub, index) => (
        <div key={index} id={slugify(sub.title)}>
          <h2>{sub.title}</h2>
          <p>{sub.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
