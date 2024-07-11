"use client";
import React, { useState, useEffect } from "react";
import { useGetDocsQuery } from "@/store/api";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

const SideBar: React.FC = () => {
  const { data, error, isLoading } = useGetDocsQuery();

  const [collapsedDocs, setCollapsedDocs] = useState<boolean[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<boolean[][]>([]);

  useEffect(() => {
    if (data) {
      setCollapsedDocs(Array(data.length).fill(true));
      setCollapsedSections(
        data.map((doc) => Array(doc.sections.length).fill(true))
      );
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleDocToggle = (docIndex: number) => {
    setCollapsedDocs((prev) => {
      const newCollapsedDocs = [...prev];
      newCollapsedDocs[docIndex] = !newCollapsedDocs[docIndex];
      return newCollapsedDocs;
    });
  };

  const handleSectionToggle = (docIndex: number, sectionIndex: number) => {
    setCollapsedSections((prev) => {
      const newCollapsedSections = prev.map((sections, idx) =>
        idx === docIndex
          ? sections.map((collapsed, secIdx) =>
              secIdx === sectionIndex ? !collapsed : collapsed
            )
          : sections
      );
      return newCollapsedSections;
    });
  };

  return (
    <div>
      {data?.map((doc, docIndex) => (
        <div key={docIndex} className="ml-2">
          <div className="flex items-center">
            {doc.sections.length > 0 && (
              <button onClick={() => handleDocToggle(docIndex)}>
                {collapsedDocs[docIndex] ? (
                  <IconChevronRight />
                ) : (
                  <IconChevronDown />
                )}
              </button>
            )}
            <div className="font-bold">{doc.title}</div>
          </div>

          {!collapsedDocs[docIndex] && doc.sections.length > 0 && (
            <div className="ml-4">
              {doc.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="ml-2">
                  <div className="flex items-center">
                    {section.subSections && section.subSections.length > 0 && (
                      <button
                        onClick={() =>
                          handleSectionToggle(docIndex, sectionIndex)
                        }
                      >
                        {collapsedSections[docIndex]?.[sectionIndex] ? (
                          <IconChevronRight />
                        ) : (
                          <IconChevronDown />
                        )}
                      </button>
                    )}
                    <div className="font-semibold">{section.title}</div>
                  </div>

                  {!collapsedSections[docIndex]?.[sectionIndex] &&
                    section.subSections &&
                    section.subSections.length > 0 && (
                      <div className="ml-4">
                        {section.subSections.map((subSec, subSecIndex) => (
                          <div key={subSecIndex} className="ml-2">
                            <div className="font-normal">{subSec.title}</div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
