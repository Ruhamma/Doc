"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useGetDocsQuery } from "@/store/api";
import { getDocumentAndSection, slugify } from "@/utils";
import { Group, Stack, Text } from "@mantine/core";
import { IconList } from "@tabler/icons-react";
const Subsections: React.FC = () => {
  const pathname = usePathname();
  const { document, section, isLoading, error } =
    getDocumentAndSection(pathname);
  const [selectedSubSection, setSelectedSubSection] = useState<string | null>(
    null
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (!document) return <div>Document not found</div>;
  if (!section) return <div>Section not found</div>;
  const handleSubSectionClick = (title: string) => {
    setSelectedSubSection(title);
  };
  return (
    <div className="subsections">
      <Group gap="1" className="mt-4">
        <IconList />
        <Text>Table of content</Text>
      </Group>
      <Stack className="mt-5" gap="1">
        {section.subSections.map((sub, index) => (
          <div
            key={index}
            className={`hover:bg-tertiary border-l border-gray-500 p-2 text-[15px] ${
              selectedSubSection === sub.title ? "bg-tertiary" : ""
            }`}
            onClick={() => handleSubSectionClick(sub.title)}
          >
            <a href={`#${slugify(sub.title)}`}>{sub.title}</a>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default Subsections;
