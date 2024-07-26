"use client";

import { Topic } from "@/types/topic";
import { Box } from "@mantine/core";
import Navbar from "../component/Navbar";
import TopicsSideBar from "./components/TopicsSideBar";
const AdminHomPage = () => {
  const data: Topic[] = [
    { id: "1", name: "Getting Started", content: "", parentId: null },
    { id: "2", name: "DataSource", content: "", parentId: null },
    { id: "3", name: "Working with Data Source", content: "", parentId: "2" },
    { id: "4", name: "Data Source Options", content: "", parentId: "2" },
    { id: "5", name: "Multiple Data Sources", content: "", parentId: "2" },
    { id: "6", name: "DataSource API", content: "", parentId: "2" },
    { id: "7", name: "Entity", content: "", parentId: null },
    { id: "8", name: "What is Entity?", content: "", parentId: "7" },
    { id: "9", name: "Embedded Entities", content: "", parentId: "7" },
    { id: "10", name: "Entity Inheritance", content: "", parentId: "7" },
    { id: "11", name: "Tree Entities", content: "", parentId: "7" },
    { id: "12", name: "View Entities", content: "", parentId: "7" },
    {
      id: "13",
      name: "Separating Entity Definition",
      content: "",
      parentId: "7",
    },
    { id: "14", name: "Relations", content: "", parentId: null },
    { id: "15", name: "What are Relations?", content: "", parentId: "14" },
    { id: "16", name: "One-to-One", content: "", parentId: "14" },
    {
      id: "17",
      name: "Many-to-One and One-to-Many",
      content: "",
      parentId: "14",
    },
    { id: "18", name: "Many-to-Many", content: "", parentId: "14" },
    { id: "19", name: "Eager and Lazy Relations", content: "", parentId: "14" },
    { id: "20", name: "Relations FAQ", content: "", parentId: "14" },
  ];
  const handleNodeClick = (node: Topic) => {
    console.log("Node clicked:", node);
  };
  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <TopicsSideBar topics={data} onNodeClick={handleNodeClick} />;
        <Box className="editor flex-grow overflow-hidden relative">
          <Box className="editor-content h-full overflow-y-auto"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomPage;
