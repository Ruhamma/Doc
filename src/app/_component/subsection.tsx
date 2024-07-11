'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { useGetDocsQuery } from "@/store/api";
import { slugify } from "@/utils";

const Subsections: React.FC = () => {
  const { data, error, isLoading } = useGetDocsQuery();


   const pathname = usePathname();
   const slug = pathname.split("/").pop();
   const docTitle = pathname.split("/")[2];
   const sectionTitle = slug;
   const document = data?.find((doc) => slugify(doc.title) === docTitle);
   if (!document) return <div>Document not found</div>;

   const section = document.sections.find(
     (sec) => slugify(sec.title) === sectionTitle
   );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
