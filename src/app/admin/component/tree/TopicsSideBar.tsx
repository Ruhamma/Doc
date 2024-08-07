"use client";
import React, { useState } from "react";
import { Button, Modal, TextInput, Stack } from "@mantine/core";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [isAddingSubTopic, setIsAddingSubTopic] = useState<boolean>(false);

  const handleAddSubTopic = async () => {
    if (currentParentId && newTopicName.trim() !== "") {
      const newSubTopic: Omit<Topic, "id"> = {
        name: newTopicName,
        content: "",
        parentId: currentParentId,
      };

      try {
        const response = await createTopic(newSubTopic).unwrap();
        const updatedSubTopic = { ...newSubTopic, id: response.id };

        const addSubTopicToNode = (
          nodes: Topic[],
          parentId: string
        ): Topic[] => {
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

        setNodes(addSubTopicToNode(nodes, currentParentId));
        setIsModalOpen(false);
        setNewTopicName("");
      } catch (error) {
        console.error("Failed to create subtopic:", error);
      }
    }
  };

  const handleAddTopLevelTopic = async () => {
    if (newTopicName.trim() !== "") {
      const newTopic: Omit<Topic, "id"> = {
        name: newTopicName,
        content: "",
        parentId: undefined,
      };

      try {
        const response = await createTopic(newTopic).unwrap();
        const addedTopic = { ...newTopic, id: response.id };

        setNodes([...nodes, addedTopic]);
        setIsModalOpen(false);
        setNewTopicName("");
      } catch (error) {
        console.error("Failed to create topic:", error);
      }
    }
  };

  const handleModalConfirm = () => {
    if (isAddingSubTopic) {
      handleAddSubTopic();
    } else {
      handleAddTopLevelTopic();
    }
  };

  const handleAddSubTopicClick = (parentId: string) => {
    setCurrentParentId(parentId);
    setIsAddingSubTopic(true);
    setIsModalOpen(true);
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
          onAddSubTopicClick={handleAddSubTopicClick} // Pass handler
        />
      ))}
      <Stack pl={"sm"}>
        <Button
          className="text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
          variant="filled"
          size="sm"
          color="gray"
          onClick={() => {
            setCurrentParentId(null);
            setIsAddingSubTopic(false);
            setIsModalOpen(true);
          }}
        >
          Add Topic
        </Button>
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAddingSubTopic ? "Add SubTopic" : "Add Topic"}
      >
        <TextInput
          placeholder={isAddingSubTopic ? "SubTopic Name" : "Topic Name"}
          value={newTopicName}
          onChange={(event) => setNewTopicName(event.currentTarget.value)}
        />
        <Button onClick={handleModalConfirm} color="green" mt="md">
          Add
        </Button>
      </Modal>
    </div>
  );
};

export default TopicsSideBar;
