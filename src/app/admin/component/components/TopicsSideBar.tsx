import React, { useState } from "react";
import { Button, TextInput, Stack, Flex } from "@mantine/core";
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
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitles, setNewSubtitles] = useState<string[]>([""]);
  const [isTitleSet, setIsTitleSet] = useState(false);
  const [areSubtitlesSet, setAreSubtitlesSet] = useState<boolean[]>([]);

  const handleAddSubtitleField = () => {
    if (!isTitleSet && newTitle.trim() !== "") {
      setIsTitleSet(true);
    }
    if (newSubtitles.every((subtitle) => subtitle.trim() !== "")) {
      setAreSubtitlesSet([...areSubtitlesSet, true]);
      setNewSubtitles([...newSubtitles, ""]);
    }
  };

  const handleSubtitleChange = (index: number, value: string) => {
    const updatedSubtitles = [...newSubtitles];
    updatedSubtitles[index] = value;
    setNewSubtitles(updatedSubtitles);
  };

  const handleAddNode = () => {
    if (
      newTitle.trim() === "" ||
      newSubtitles.some((subtitle) => subtitle.trim() === "")
    ) {
      return;
    }

    const newNode: Topic = {
      id: nanoid(),
      name: newTitle,
      content: "",
      parentId: null,
    };

    const newNodes = [
      ...nodes,
      newNode,
      ...newSubtitles.map((subtitle) => ({
        id: nanoid(),
        name: subtitle,
        content: "",
        parentId: newNode.id,
      })),
    ];

    setNodes(newNodes);
    setNewTitle("");
    setNewSubtitles([""]);
    setIsTitleSet(false);
    setAreSubtitlesSet([]);
  };

  const treeContent = generateTopicTree(
    nodes.filter((d) => !d.parentId),
    nodes
  );

  return (
    <div className="sidebar p-6">
      <Flex direction={"column"} gap={"md"}>
        {!isTitleSet ? (
          <TextInput
            placeholder="Title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.currentTarget.value)}
            variant="filled"
            styles={{
              input: { border: "1px solid green", borderRadius: "4px" },
            }}
          />
        ) : (
          <Button variant="subtle" color="green">
            {newTitle}
          </Button>
        )}
        {newSubtitles.map((subtitle, index) =>
          areSubtitlesSet[index] ? (
            <Button
              key={index}
              variant="subtle"
              color="green"
              style={{ marginLeft: "20px" }}
            >
              {subtitle}
            </Button>
          ) : (
            <TextInput
              key={index}
              placeholder={`Subtitle ${index + 1}`}
              value={subtitle}
              onChange={(event) =>
                handleSubtitleChange(index, event.currentTarget.value)
              }
              variant="filled"
              styles={{
                input: {
                  border: "1px solid green",
                  borderRadius: "4px",
                  marginLeft: "20px",
                },
              }}
            />
          )
        )}
        <Stack>
          <Button color="green" onClick={handleAddSubtitleField}>
            Add Subtitle
          </Button>
          <Button color="green" onClick={handleAddNode}>
            Add Topic
          </Button>
        </Stack>
      </Flex>
      {treeContent.map((node) => (
        <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
      ))}
    </div>
  );
};

export default TopicsSideBar;
