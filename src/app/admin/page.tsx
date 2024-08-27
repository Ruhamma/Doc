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
  useGetContentByIdQuery,
  useUpdateDocMutation,
  useDeleteTopicMutation,
} from "../services/create_api";
import SkeletonLayout from "./component/skeleton";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import Header from "../tests/Components/Header";
import Sidebar from "./component/tree/Sidebar";

type NotificationType =
  | { type: "error"; message: string }
  | { type: "info"; message: string };

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [activeContent, setActiveContent] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [editedTopicName, setEditedTopicName] = useState<string>(""); // State for topic name
  const ref = useRef<MDXEditorMethods>(null);

  const {
    data: topics,
    error: topicsError,
    isLoading: topicsLoading,
  } = useGetTopicsQuery();
  const {
    data: topicData,
    error: contentError,
    isLoading: contentLoading,
  } = useGetContentByIdQuery(searchParams.get("id") || "", {
    skip: !id,
  });
  const [updateDoc, { isLoading: isUpdating, error: updateError }] =
    useUpdateDocMutation();
  const [deleteTopic, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTopicMutation();

  useEffect(() => {
    const timers = notifications.map((_, index) =>
      setTimeout(() => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
      }, 5000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications]);

  useEffect(() => {
    if (topicData) {
      if (topicData.content) {
        setActiveContent(topicData.content ?? "");
        ref.current?.setMarkdown(topicData.content ?? "");
      }

      setActiveTopic(topicData);
      setEditedTopicName(topicData.name);
    }
  }, [topicData]);

  useEffect(() => {
    if (updateError) {
      setNotifications((prev) => [
        ...prev,
        {
          type: "error",
          message: `Update error: ${updateError.toString()}`,
        },
      ]);
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteError) {
      setNotifications((prev) => [
        ...prev,
        {
          type: "error",
          message: `Delete error: ${deleteError.toString()}`,
        },
      ]);
    }
  }, [deleteError]);

  useEffect(() => {
    if (topicsError) {
      setNotifications((prev) => [
        ...prev,
        {
          type: "error",
          message: `Data fetch error: ${topicsError.toString()}`,
        },
      ]);
    }
  }, [topicsError]);

  if (topicsLoading || contentLoading) {
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

  const handleSaveClick = () => {
    if (activeTopic) {
      const markdownContent = ref.current?.getMarkdown() || "";

      updateDoc({
        id: activeTopic.id,
        name: editedTopicName,
        content: markdownContent,
        parentCategoryId: activeTopic.parentId || "",
      })
        .then((response) => {
          setNotifications((prev) => [
            ...prev,
            {
              type: "info",
              message: "Content updated successfully",
            },
          ]);
          console.log("Update response:", response);
        })
        .catch((err) => {
          console.error("Update error:", err);
          setNotifications((prev) => [
            ...prev,
            {
              type: "error",
              message: `Update error: ${err.toString()}`,
            },
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
            {
              type: "error",
              message: `Delete error: ${err.toString()}`,
            },
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
        <Box className="fixed top-16 right-4 z-50 space-y-4">
          {notifications.map((notification, index) => (
            <Notification
              key={index}
              color={notification.type === "error" ? "red" : "green"}
              title={notification.type === "error" ? "Error" : "Success"}
              onClose={() =>
                setNotifications((prev) => prev.filter((_, i) => i !== index))
              }
              withCloseButton
            >
              {notification.message}
            </Notification>
          ))}
        </Box>

        <Box className="flex flex-row h-[calc(100vh-4rem)] pt-16">
          <TopicsSideBar
            topics={topics ?? []}
            onNodeClick={handleNodeClick}
            isAdmin={true}
          />
          {/* <Sidebar isAdmin={true} /> */}

          <Box className="editor flex-grow overflow-hidden relative">
            <Box className="editor-header p-4 bg-transparent border-b border-gray-200">
              <TextInput
                value={editedTopicName}
                onChange={handleTopicNameChange}
                placeholder="Edit topic name"
                size="md"
                variant="unstyled"
                className="px-2 py-1 rounded hover:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                styles={{
                  input: {
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#333",
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
            <Box className="editor-content h-full overflow-y-auto p-4">
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
            <IconDeviceFloppy size={20} />
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
    </Box>
  );
}
