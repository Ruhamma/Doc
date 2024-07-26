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
  const [isTitleInputVisible, setIsTitleInputVisible] = useState(false);

  const handleAddSubtitleField = () => {
    if (!isTitleInputVisible && newTitle.trim() !== "") {
      setIsTitleInputVisible(true);
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

  const handleDeleteNode = (nodeId: string) => {
    const removeNodeAndSubtopics = (nodes: Topic[], idToRemove: string) => {
      return nodes.reduce((acc: Topic[], node) => {
        if (node.id === idToRemove) return acc;
        const subTopics = removeNodeAndSubtopics(node.subTopics, idToRemove);
        if (node.subTopics.length || subTopics.length) {
          acc.push({ ...node, subTopics });
        }
        return acc;
      }, []);
    };

    setNodes(removeNodeAndSubtopics(nodes, nodeId));
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
          onDeleteNode={handleDeleteNode}
        />
      ))}
      <Flex direction={"column"} gap={"md"}>
        {!isTitleInputVisible ? (
          <Button color="green" onClick={() => setIsTitleInputVisible(true)}>
            Add Title
          </Button>
        ) : (
          <>
            <TextInput
              placeholder="Title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.currentTarget.value)}
              variant="filled"
              styles={{
                input: { border: "1px solid green", borderRadius: "4px" },
              }}
            />
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
          </>
        )}
      </Flex>
    </div>
  );
};

export default TopicsSideBar;
