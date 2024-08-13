"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Text,
  Group,
  Notification,
  TextInput,
} from "@mantine/core";
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
import Header from "../tests/Components/Header";

type NotificationType =
  | { type: "error"; message: string }
  | { type: "info"; message: string };

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeContent, setActiveContent] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [editedTopicName, setEditedTopicName] = useState<string>(""); // State for topic name
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
        setEditedTopicName(topicNode.name || ""); // Set the topic name
      }
    }
  }, [searchParams, topics]);

  useEffect(() => {
    if (updateError) {
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: `Update error: ${updateError.toString()}` },
      ]);
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteError) {
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: `Delete error: ${deleteError.toString()}` },
      ]);
    }
  }, [deleteError]);

  useEffect(() => {
    if (error) {
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: `Data fetch error: ${error.toString()}` },
      ]);
    }
  }, [error]);

  if (isLoading) {
    return <SkeletonLayout />;
  }

  const handleNodeClick = (topicNode: Topic) => {
    const path = `/admin?id=${topicNode.id}`;
    router.push(path);
  };

  const handleEditorChange = (newContent: string) => {
    setActiveContent(newContent);
  };

  const handleTopicNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedTopicName(event.currentTarget.value);
  };

  const findNodeById = (nodes: Topic[], id: string): Topic | null => {
    for (let topicNode of nodes) {
      if (topicNode.id === id) {
        return topicNode;
      }
      if (topicNode.subcategories) {
        const foundNode = findNodeById(topicNode.subcategories, id);
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

      updateDoc({
        id: activeTopic.id,
        name: editedTopicName,
        content: markdownContent,
        parentCategoryId: activeTopic.parentId || "", // Include parentCategoryId if applicable
      })
        .then((response) => {
          setNotifications((prev) => [
            ...prev,
            { type: "info", message: "Content updated successfully" },
          ]);
          console.log("Update response:", response);
        })
        .catch((err) => {
          console.error("Update error:", err);
          setNotifications((prev) => [
            ...prev,
            { type: "error", message: `Update error: ${err.toString()}` },
          ]);
        });
    } else {
      console.log("No topic selected to update.");
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpened(true);
  };

  const confirmDelete = () => {
    if (activeTopic) {
      deleteTopic(activeTopic.id)
        .then(() => {
          setNotifications((prev) => [
            ...prev,
            { type: "info", message: "Topic deleted successfully" },
          ]);
          router.push("/admin");
        })
        .catch((err) => {
          console.error("Delete error:", err);
          setNotifications((prev) => [
            ...prev,
            { type: "error", message: `Delete error: ${err.toString()}` },
          ]);
        })
        .finally(() => {
          setDeleteModalOpened(false);
        });
    }
  };

  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Header />
      </Box>
      <div className="p-10s">
        <Box className="flex flex-row h-full pt-16">
          <TopicsSideBar topics={topics ?? []} onNodeClick={handleNodeClick} />
          <Box className="editor flex-grow overflow-hidden relative">
            <Box className="editor-header p-4 bg-gray-100 border-b">
              <TextInput
                value={editedTopicName}
                onChange={handleTopicNameChange}
                placeholder="Edit topic name"
                size="md"
              />
            </Box>
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
            disabled={isUpdating}
          >
            <IconDownload size={20} />
            Save
          </Button>
          <Button
            className="text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
            variant="outline"
            color="red"
            onClick={handleDeleteClick}
            disabled={isDeleting}
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
      </div>

      {notifications.map((notification, index) => (
        <Notification
          key={index}
          color={notification.type === "error" ? "red" : "green"}
          title={notification.type === "error" ? "Error" : "Success"}
          onClose={() =>
            setNotifications((prev) => prev.filter((_, i) => i !== index))
          }
          className="fixed right-4 bottom-4"
        >
          {notification.message}
        </Notification>
      ))}
    </Box>
  );
}
