"use client";
import React from "react";
import { Button, Stack } from "@mantine/core";
import TreeNode from "./TreeNode";
import { Topic } from "@/types/topic"; // Use the imported Topic type

interface TopicsSideBarProps {
  topics: Topic[];
  onNodeClick: (node: Topic) => void;
  isAdmin: boolean;
}

const TopicsSideBar = ({
  topics,
  onNodeClick,
  isAdmin,
}: TopicsSideBarProps) => {
  return (
    <div className="sidebar p-6 h-full overflow-y-auto border-r border-gray-200">
      {topics.map((topic) => (
        <TreeNode
          key={topic.id}
          node={topic}
          onNodeClick={onNodeClick}
          onAddSubTopicClick={(parentId) =>
            console.log("Add sub-topic to:", parentId)
          }
          isAdmin={isAdmin}
        />
      ))}
      {isAdmin && (
        <Stack pl={"sm"}>
          <Button
            className="text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
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

export default TopicsSideBar;
