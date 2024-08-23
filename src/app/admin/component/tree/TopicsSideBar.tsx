"use client";
import React, { useState } from "react";
import { Button, Modal, TextInput, Stack } from "@mantine/core";
import { NewSubTopicBody, NewTopicBody, Topic } from "@/types/topic";
import TreeNode from "./TreeNode";
import {
  useCreateSubTopicMutation,
  useCreateTopicMutation,
} from "@/app/services/create_api";

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
  const [nodes, setNodes] = useState<Topic[]>(topics);
  const [createTopic, { isLoading: isCreatingTopic }] =
    useCreateTopicMutation();
  const [createSubTopic, { isLoading: isCreatingSubtopic }] =
    useCreateSubTopicMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState<string>(""); // Ensure it's always a string
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [isAddingSubTopic, setIsAddingSubTopic] = useState<boolean>(false);

  const handleAddSubTopic = async () => {
    if (currentParentId && newTopicName !== "") {
      const newSubTopic: NewSubTopicBody = {
        name: newTopicName,
        content: "",
        parentCategoryId: currentParentId,
      };

      try {
        const response = await createSubTopic(newSubTopic).unwrap();
        const updatedSubTopic = {
          ...response,
          parentId: currentParentId,
        };

        const addSubTopicToNode = (
          nodes: Topic[],
          parentId: string
        ): Topic[] => {
          return nodes.map((node) => {
            if (node.id === parentId) {
              return {
                ...node,
                subcategories: [...(node.subcategories || []), updatedSubTopic],
              };
            }
            if (node.subcategories) {
              return {
                ...node,
                subcategories: addSubTopicToNode(node.subcategories, parentId),
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
    } else {
      console.error("Subtopic creation failed: invalid data.");
    }
  };

  const handleAddTopLevelTopic = async () => {
    if (newTopicName !== "") {
      const newTopic: NewTopicBody = {
        name: newTopicName,
        content: "",
      };

      try {
        const response = await createTopic(newTopic).unwrap();
        const addedTopic = { ...response };

        setNodes([...nodes, addedTopic]);
        setIsModalOpen(false);
        setNewTopicName("");
      } catch (error) {
        console.error("Failed to create topic:", error);
      }
    } else {
      console.error("Top level topic creation failed: invalid data.");
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

  return (
    <div className="sidebar w-64 overflow-y-auto border-r border-gray-300 p-4">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onNodeClick={onNodeClick}
          onAddSubTopicClick={handleAddSubTopicClick}
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
            onClick={() => {
              setCurrentParentId(null);
              setIsAddingSubTopic(false);
              setIsModalOpen(true);
            }}
          >
            Add Topic
          </Button>
        </Stack>
      )}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAddingSubTopic ? "Add SubTopic" : "Add Topic"}
      >
        <TextInput
          placeholder={isAddingSubTopic ? "SubTopic Name" : "Topic Name"}
          value={newTopicName}
          onChange={(event) => setNewTopicName(event.currentTarget.value || "")} // Safeguard against null/undefined
        />
        <Button
          onClick={handleModalConfirm}
          color="green"
          mt="md"
          loading={isCreatingSubtopic || isCreatingTopic}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
};

export default TopicsSideBar;
