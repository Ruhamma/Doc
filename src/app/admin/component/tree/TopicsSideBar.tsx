import React, { useState } from "react";
import { Button, TextInput, Stack, Flex, Loader } from "@mantine/core";
import { nanoid } from "nanoid";
import { Topic } from "@/types/topic";
import { generateTopicTree } from "./generateTopic";
import TreeNode from "./TreeNode";

interface TopicsSideBarProps {
  topics: Topic[];
  onNodeClick: (node: Topic) => void;
}

const TopicsSideBar = ({ topics, onNodeClick }: TopicsSideBarProps) => {
  const [nodes, setNodes] = useState<Topic[]>(topics);

  const handleAddSubTopic = (parentId: string, subTopicName: string) => {
    const newSubTopic: Topic = {
      id: nanoid(),
      name: subTopicName,
      content: "",
      parentId,
    };

    const addSubTopicToNode = (nodes: Topic[], parentId: string): Topic[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            subTopics: [...(node.subTopics || []), newSubTopic],
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
    <div className="sidebar p-6">
      {treeContent.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onNodeClick={onNodeClick}
          onAddSubTopic={handleAddSubTopic}
        />
      ))}
    </div>
  );
};

export default TopicsSideBar;
