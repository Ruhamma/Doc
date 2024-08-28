import React, { useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import { Topic } from "@/types/topic";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

interface TreeNodeProps {
  node: Topic;
  onNodeClick: (node: Topic) => void;
  onAddSubTopicClick: (parentId: string) => void;
  isAdmin: boolean;
  level?: number;
}

export const TreeNode = ({
  node,
  onNodeClick,
  onAddSubTopicClick,
  isAdmin,
  level = 0,
}: TreeNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isParentNode = level === 0;

  return (
    <div
      className="ml-4 mt-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/categories/${node.id}`}>
        <div
          className={`truncate max-w-[calc(100%-32px)] text-left cursor-pointer ${
            isParentNode
              ? "hover:text-[#20CB0C] capitalize font-bold text-[18px] block"
              : "hover:text-[#20CB0C] normal-case pl-2 py-1 text-[16px] block"
          }`}
          onClick={() => onNodeClick(node)}
        >
          {node.name}
        </div>
      </Link>
      {isAdmin && isHovered && (
        <ActionIcon
          key={node.id}
          variant="subtle"
          color="green"
          className="absolute right-0 top-0"
          onClick={() => onAddSubTopicClick(node.id)}
        >
          <IconPlus size={16} stroke={1.5} />
        </ActionIcon>
      )}
      <div className="ml-4">
        {node.subcategories &&
          node.subcategories.length > 0 &&
          node.subcategories.map((subTopic) => (
            <TreeNode
              key={subTopic.id}
              node={subTopic}
              onNodeClick={onNodeClick}
              onAddSubTopicClick={onAddSubTopicClick}
              isAdmin={isAdmin}
              level={level + 1}
            />
          ))}
      </div>
    </div>
  );
};

export default TreeNode;
