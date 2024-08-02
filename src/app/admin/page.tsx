"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Modal, Text, Group } from "@mantine/core";
import Navbar from "./component/Navbar";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./component/mdxeditor/ForwardRefEditor";
import { useRouter, useSearchParams } from "next/navigation";
import TopicsSideBar from "./component/tree/TopicsSideBar";
import { Topic } from "@/types/topic";
import {
  useGetTopicsQuery,
  useUpdateDocMutation,
  useDeleteTopicMutation,
} from "../services/create_api";
import SkeletonLayout from "./component/skeleton";
import { IconDownload, IconTrash } from "@tabler/icons-react";

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeContent, setActiveContent] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const ref = useRef<MDXEditorMethods>(null);

  const { data: topics, error, isLoading } = useGetTopicsQuery();
  const [updateDoc, { isLoading: isUpdating, error: updateError }] =
    useUpdateDocMutation();
  const [deleteTopic, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTopicMutation();

  useEffect(() => {
    const nodeId = searchParams.get("id");
    if (nodeId && topics) {
      const topicNode = findNodeById(topics, nodeId);
      if (topicNode && ref.current) {
        ref.current.setMarkdown(topicNode.content || "");
        setActiveContent(topicNode.content || "");
        setActiveTopic(topicNode);
      }
    }
  }, [searchParams, topics]);

  if (isLoading) {
    return <SkeletonLayout />;
  }

  if (error) {
    return <Flex>{error.toString()}</Flex>;
  }

  const handleNodeClick = (topicNode: Topic) => {
    const path = `/admin?id=${topicNode.id}`;
    router.push(path);
  };

  const handleEditorChange = (newContent: string) => {
    setActiveContent(newContent);
  };

  const findNodeById = (nodes: Topic[], id: string): Topic | null => {
    for (let topicNode of nodes) {
      if (topicNode.id === id) {
        return topicNode;
      }
      if (topicNode.subTopics) {
        const foundNode = findNodeById(topicNode.subTopics, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  const handleSaveClick = () => {
    if (activeTopic) {
      const markdownContent = ref.current?.getMarkdown() || "";

      // Update content of the current topic
      updateDoc({
        id: activeTopic.id,
        content: markdownContent,
        name: "",
      })
        .then((response) => {
          console.log("Update response:", response);
        })
        .catch((err) => {
          console.error("Update error:", err);
        });
    } else {
      console.log("No topic selected to update.");
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpened(true); // Open the confirmation modal
  };

  const confirmDelete = () => {
    if (activeTopic) {
      deleteTopic(activeTopic.id)
        .then((response) => {
          console.log("Delete response:", response);
          router.push("/admin"); // Redirect after deletion
        })
        .catch((err) => {
          console.error("Delete error:", err);
        })
        .finally(() => {
          setDeleteModalOpened(false); // Close the modal after action
        });
    }
  };

  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <TopicsSideBar topics={topics ?? []} onNodeClick={handleNodeClick} />
        <Box className="editor flex-grow overflow-hidden relative">
          <Box className="editor-content h-full overflow-y-auto">
            <ForwardRefEditor
              ref={ref}
              markdown={activeContent}
              onChange={handleEditorChange}
            />
          </Box>
        </Box>
      </Box>
      <Box className="fixed right-4 bottom-4 flex space-x-4 p-10">
        <Button
          className="text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
          variant="filled"
          color="gray"
          onClick={handleSaveClick}
          disabled={isUpdating} // Disable button while updating
        >
          <IconDownload size={20} />
          Save
        </Button>
        <Button
          className="text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
          variant="outline"
          color="red"
          onClick={handleDeleteClick}
          disabled={isDeleting} // Disable button while deleting
        >
          <IconTrash size={20} />
          Delete
        </Button>
      </Box>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Deletion"
      >
        <Text>
          Are you sure you want to delete this topic and its subtopics?
        </Text>
        <Group mt="md">
          <Button
            className="text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
            variant="filled"
            color="gray"
            onClick={() => setDeleteModalOpened(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={confirmDelete} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Modal>

      {updateError && (
        <Flex className="fixed right-4 bottom-20 text-red-500">
          {updateError.toString()}
        </Flex>
      )}

      {deleteError && (
        <Flex className="fixed right-4 bottom-28 text-red-500">
          {deleteError.toString()}
        </Flex>
      )}
    </Box>
  );
}
