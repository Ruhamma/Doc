"use client";

import React from "react";
import Link from "next/link";
import { useGetDocsQuery } from "@/store/api";
import { slugify } from "../../utils/slugify";
import { DocsData, Section } from "@/types";

const Sidebar: React.FC = () => {
  const { data, error, isLoading } = useGetDocsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="sidebar p-6 px-10 text-dark border-r border-gray-300 min-h-[100vh]">
      <ul className="tree list-none pl-0">
        {data?.map((doc: DocsData) => (
          <li className="mb-2">
            {doc.documents?.map(
              (document: {
                title:
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | Promise<React.AwaitedReactNode>
                  | React.Key
                  | null
                  | undefined;
                subSections: Section[];
              }) => (
                <React.Fragment>
                  <p className="text-lg font-bold">{document.title}</p>
                  {document.subSections && document.subSections.length > 0 && (
                    <ul className="list-none pl-2 ml-5 mt-1 border-l border-gray-300">
                      {document.subSections.map((section: Section) => (
                        <li key={section.title} className="mb-2 w-full text-md">
                          <Link
                            href={`/test/${slugify(document.title)}/${slugify(
                              section.title
                            )}`}
                            passHref
                            className="hover:bg-[#C1F1CC] hover:border-l-4 border-[#2EC150] w-full p-2"
                          >
                            {section.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
