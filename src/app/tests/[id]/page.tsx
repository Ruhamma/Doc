"use client";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import ContentDisplay from "../Components/ContentDisplay";
import Header from "../Components/Header";
import TopicsSideBar from "@/app/admin/component/tree/TopicsSideBar";
import { Topic } from "@/types/topic";
import { useGetTopicsQuery } from "@/app/services/create_api";

const Page = () => {
  const { data: topics, error, isLoading } = useGetTopicsQuery();

  const handleNodeClick = (node: Topic) => {
    console.log(node);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading topics</div>;

  return (
    <div className="flex-col w-full h-auto">
      <div>
        <Header />
      </div>
      <div className="flex pt-8">
        {/* <Sidebar /> */}
        <TopicsSideBar topics={topics ?? []} onNodeClick={handleNodeClick} />
        <ContentDisplay />
      </div>
    </div>
  );
};

export default Page;
