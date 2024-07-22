import { useState } from "react";
import { Button, Modal, TextInput, Group, Stack, Flex } from "@mantine/core";
import { nanoid } from "nanoid";
import { SidebarProps, TreeNodeProps, Node } from "@/types/treeNode";

const TreeNode = ({ node, onNodeClick }: TreeNodeProps) => (
  <div className="ml-4 mt-2">
    <div>
      <Button variant="subtle" color="green" onClick={() => onNodeClick(node)}>
        {node.title}
      </Button>
    </div>
    <div>
      {node.subtitles.map((subtitle) => (
        <TreeNode key={subtitle.id} node={subtitle} onNodeClick={onNodeClick} />
      ))}
    </div>
  </div>
);

const SideBar = ({ onNodeClick }: SidebarProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [opened, setOpened] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitles, setNewSubtitles] = useState<string[]>([""]);

  const handleAddTitle = () => {
    setOpened(true);
  };

  const handleModalSubmit = () => {
    const newNode: Node = {
      id: nanoid(),
      title: newTitle,
      content: "",
      subtitles: newSubtitles.map((subtitle) => ({
        id: nanoid(),
        title: subtitle,
        content: "",
        subtitles: [],
      })),
    };

    setNodes([...nodes, newNode]);
    setNewTitle("");
    setNewSubtitles([""]);
    setOpened(false);
  };

  const handleAddSubtitleField = () => {
    setNewSubtitles([...newSubtitles, ""]);
  };

  const handleSubtitleChange = (index: number, value: string) => {
    const updatedSubtitles = [...newSubtitles];
    updatedSubtitles[index] = value;
    setNewSubtitles(updatedSubtitles);
  };

  return (
    <div className="sidebar p-6 ">
      <Button color="green" onClick={handleAddTitle}>
        Add Title
      </Button>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
      ))}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Title and Subtitles"
      >
        <Flex direction={"column"} gap={"md"}>
          <TextInput
            label="Title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.currentTarget.value)}
            variant="filled"
            styles={{
              input: { border: "1px solid green", borderRadius: "4px" },
            }}
          />
          {newSubtitles.map((subtitle, index) => (
            <TextInput
              key={index}
              label={`Subtitle ${index + 1}`}
              value={subtitle}
              onChange={(event) =>
                handleSubtitleChange(index, event.currentTarget.value)
              }
              variant="filled"
              styles={{
                input: { border: "1px solid green", borderRadius: "4px" },
              }}
            />
          ))}
          <Stack>
            <Button color="green" onClick={handleAddSubtitleField}>
              Add Subtitle
            </Button>

            <Button color="green" onClick={handleModalSubmit}>
              Submit
            </Button>
          </Stack>
        </Flex>
      </Modal>
    </div>
  );
};

export default SideBar;
