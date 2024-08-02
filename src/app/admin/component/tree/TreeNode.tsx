import React, { useState } from "react";
import { ActionIcon, Button, Modal, TextInput } from "@mantine/core";
import { Topic } from "@/types/topic";
import { IconPlus } from "@tabler/icons-react";

interface TreeNodeProps {
  node: Topic;
  onNodeClick: (node: Topic) => void;
  onAddSubTopic: (parentId: string, subTopicName: string) => void;
}

export const TreeNode = ({
  node,
  onNodeClick,
  onAddSubTopic,
}: TreeNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTopicName, setSubTopicName] = useState("");

  const handleAddSubTopic = () => {
    if (subTopicName.trim() !== "") {
      onAddSubTopic(node.id, subTopicName);
      setSubTopicName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="ml-4 mt-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div items-center>
        <Button
          className="truncate max-w-[calc(100%-32px)] text-left"
          variant="subtle"
          color="gray"
          onClick={() => onNodeClick(node)}
        >
          {node.name}
        </Button>
        {isHovered && (
          <ActionIcon
            key={node.id}
            variant="subtle"
            color="green"
            className="absolute right-0 top-0"
            onClick={() => setIsModalOpen(true)}
          >
            <IconPlus size={16} stroke={1.5} />
          </ActionIcon>
        )}
      </div>

      <div className="ml-4">
        {node.subTopics?.map((subTopic) => (
          <TreeNode
            key={subTopic.id}
            node={subTopic}
            onNodeClick={onNodeClick}
            onAddSubTopic={onAddSubTopic}
          />
        ))}
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add SubTopic"
      >
        <TextInput
          placeholder="Topic Name"
          value={subTopicName}
          onChange={(event) => setSubTopicName(event.currentTarget.value)}
        />
        <Button onClick={handleAddSubTopic} color="green" mt="md">
          Add
        </Button>
      </Modal>
    </div>
  );
};

export default TreeNode;
