import React, { useState } from "react";
import { Button, TextInput, Stack } from "@mantine/core";
import { nanoid } from "nanoid";
import { Topic } from "@/types/topic";
import { generateTopicTree } from "./generateTopic";
import TreeNode from "./TreeNode";
import { useCreateTopicMutation } from "@/app/services/create_api";

interface TopicsSideBarProps {
  topics: Topic[];
  onNodeClick: (node: Topic) => void;
}

const TopicsSideBar = ({ topics, onNodeClick }: TopicsSideBarProps) => {
  const [nodes, setNodes] = useState<Topic[]>(topics);
  const [createTopic] = useCreateTopicMutation();

  const handleAddSubTopic = async (parentId: string, subTopicName: string) => {
    const newSubTopic: Topic = {
      id: nanoid(),
      name: subTopicName,
      content: "",
      parentId,
    };

    const response = await createTopic(newSubTopic).unwrap();
    const updatedSubTopic = {
      ...newSubTopic,
    };

    const addSubTopicToNode = (nodes: Topic[], parentId: string): Topic[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            subTopics: [...(node.subTopics || []), updatedSubTopic],
          };
        }
        if (node.subTopics) {
          return {
            ...node,
            subTopics: addSubTopicToNode(node.subTopics, parentId),
          };
        }
        return node;
      });
    };

    setNodes(addSubTopicToNode(nodes, parentId));
  };

  const treeContent = generateTopicTree(
    nodes.filter((d) => !d.parentId),
    nodes
  );

  return (
    <div className="sidebar p-6 h-full overflow-y-auto border-r border-gray-200">
      {treeContent.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onNodeClick={onNodeClick}
          onAddSubTopic={handleAddSubTopic}
        />
      ))}
      <Stack pl={"sm"}>
        <Button
          className=" text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
          variant="filled"
          size="sm"
          color="gray"
          onClick={() => true}
        >
          Add Topic
        </Button>
      </Stack>
    </div>
  );
};

export default TopicsSideBar;
