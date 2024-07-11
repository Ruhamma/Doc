"use client";
import React from "react";
import Link from "next/link";
import { useGetDocsQuery } from "@/store/api";
import { slugify } from "@/utils";

const Sidebar: React.FC = () => {
  const { data, error, isLoading } = useGetDocsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="sidebar p-6 px-10 text-dark border-r border-gray-300 min-h-[100vh] ">
      <ul className="tree list-none pl-0">
        {data?.map((doc) => (
          <li key={doc.title} className="mb-2">
            <p className="text-lg font-bold">{doc.title}</p>
            {doc.sections.length > 0 && (
              <ul className="list-none pl-2 ml-5 mt-1 border-l border-gray-300 ">
                {doc.sections.map((section) => (
                  <li key={section.title} className="mb-2 w-full text-md ">
                    <Link
                      href={`/test/${slugify(doc.title)}/${slugify(
                        section.title
                      )}`}
                      passHref
                      className="hover:bg-slate-400 w-full p-2"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
