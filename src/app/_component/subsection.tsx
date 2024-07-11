"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useGetDocsQuery } from "@/store/api";
import { getDocumentAndSection, slugify } from "@/utils";

const Subsections: React.FC = () => {
  const pathname = usePathname();
  const { document, section, isLoading, error } =
    getDocumentAndSection(pathname);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (!document) return <div>Document not found</div>;
  if (!section) return <div>Section not found</div>;

  return (
    <div className="subsections">
      {section.subSections.map((sub, index) => (
        <div key={index}>
          <a href={`#${slugify(sub.title)}`}>{sub.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Subsections;
