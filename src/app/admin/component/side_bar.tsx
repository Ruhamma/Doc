import { useState } from "react";
import { Button, Flex, Group, Modal, TextInput } from "@mantine/core";
import { nanoid } from "nanoid";
import { SidebarProps, TreeNodeProps, Node } from "@/types/treeNode";

interface AddTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, subtitles: string[]) => void;
}

const AddTitleModal = ({ isOpen, onClose, onSubmit }: AddTitleModalProps) => {
  const [title, setTitle] = useState("");
  const [subtitles, setSubtitles] = useState<string[]>([""]);

  const handleSubtitleChange = (index: number, value: string) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index] = value;
    setSubtitles(newSubtitles);
  };

  const handleAddSubtitle = () => {
    setSubtitles([...subtitles, ""]);
  };

  const handleSubmit = () => {
    onSubmit(
      title,
      subtitles.filter((subtitle) => subtitle.trim() !== "")
    );
    setTitle("");
    setSubtitles([""]);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add Title and Subtitles">
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Title"
      />
      {subtitles.map((subtitle, index) => (
        <TextInput
          key={index}
          value={subtitle}
          onChange={(e) => handleSubtitleChange(index, e.currentTarget.value)}
          placeholder={`Subtitle ${index + 1}`}
          mt="sm"
        />
      ))}
      <Button onClick={handleAddSubtitle} mt="sm">
        Add Subtitle
      </Button>
      <Button onClick={handleSubmit} mt="sm">
        Submit
      </Button>
    </Modal>
  );
};

// Recursive component for rendering titles and subtitles
const TreeNode = ({ node, onNodeClick }: TreeNodeProps) => (
  <div className="ml-4 mt-2">
    <div>
      <Button variant="subtle" onClick={() => onNodeClick(node)}>
        {node.title}
      </Button>
      {node.subtitles.map((subtitle) => (
        <TreeNode key={subtitle.id} node={subtitle} onNodeClick={onNodeClick} />
      ))}
    </div>
  </div>
);

const SideBar = ({ onNodeClick }: SidebarProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTitle = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (title: string, subtitles: string[]) => {
    const newNode: Node = {
      id: nanoid(),
      title,
      subtitles: subtitles.map((subtitle) => ({
        id: nanoid(),
        title: subtitle,
        subtitles: [],
      })),
      content: "",
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="sidebar p-6 px-10 text-dark border-r border-gray-300 min-h-[100vh]">
      <Flex direction={"column"}>
        <Button onClick={handleAddTitle}>Add Title</Button>
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
        ))}
        <AddTitleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </Flex>
    </div>
  );
};

export default SideBar;
