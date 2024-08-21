"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useGetTopicsQuery } from "@/app/services/create_api";
import { ActionIcon, Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface SidebarProps {
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (sub: any) => void;
  isAdmin: boolean;
}

const Sidebar = ({ isAdmin }: SidebarProps) => {
  const {
    data,
    error: allDataError,
    isLoading: isAllDataLoading,
  } = useGetTopicsQuery();

  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  const [hoveredSubtopicId, setHoveredSubtopicId] = useState<string | null>(
    null
  );

  return (
    <div className="w-[300px] h-full border-b border-gray-200 dark:border-gray-700 pl-8 pr-8 overflow-y-auto">
      {isAllDataLoading ? (
        <p>Loading...</p>
      ) : allDataError ? (
        <p>Error loading data</p>
      ) : data && Array.isArray(data) ? (
        <ul>
          {data.map((dat: any) => (
            <li key={dat.id} className="mb-2">
              <div
                onMouseEnter={() => setHoveredTopicId(dat.id)}
                onMouseLeave={() => setHoveredTopicId(null)}
                className="relative flex items-center"
              >
                <Link
                  href={`/tests/${dat.id}`}
                  passHref
                  className="hover:text-[#20CB0C] capitalize font-bold text-[18px] p-2 block"
                >
                  {dat.name}
                </Link>
                {isAdmin && hoveredTopicId === dat.id && (
                  <ActionIcon
                    key={dat.id}
                    variant="subtle"
                    color="green"
                    className=""
                    onClick={() => onAddSubTopicClick(dat.id)}
                  >
                    <IconPlus size={16} stroke={1.5} />
                  </ActionIcon>
                )}
              </div>
              {dat.subcategories && dat.subcategories.length > 0 ? (
                <ul>
                  {dat.subcategories.map((sub: any) => (
                    <li key={sub.id} className="pr-8 w-full text-md">
                      <div
                        onMouseEnter={() => setHoveredSubtopicId(sub.id)}
                        onMouseLeave={() => setHoveredSubtopicId(null)}
                        className="relative flex items-center gap-4"
                      >
                        <Link
                          href={`/tests/${sub.id}`}
                          passHref
                          className="hover:text-[#20CB0C] normal-case pl-10 py-1 text-[16px] block"
                        >
                          {sub.name}
                        </Link>
                        {isAdmin && hoveredSubtopicId === sub.id && (
                          <ActionIcon
                            key={sub.id}
                            variant="subtle"
                            color="green"
                            className=""
                            onClick={() => onAddSubTopicClick(sub.id)}
                          >
                            <IconPlus size={16} stroke={1.5} />
                          </ActionIcon>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No subcategories available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      {isAdmin && (
        <Stack pl={"sm"}>
          <Button
            className="text-white  py-2 rounded shadow-md hover:bg-green-600"
            variant="filled"
            size="sm"
            color="gray"
            onClick={() => console.log("Add Topic clicked")}
          >
            Add Topic
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default Sidebar;
