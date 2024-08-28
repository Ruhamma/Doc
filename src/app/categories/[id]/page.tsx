"use client";
import React, { useState } from "react";
import Sidebar from "../../admin/component/tree/Sidebar";

import Header from "../Components/Header";
import TopicsSideBar from "@/app/admin/component/tree/TopicsSideBar";
import { Topic } from "@/types/topic";
import { useGetTopicsQuery } from "@/app/services/create_api";
import ContentDisplay from "../Components/ContentDisplay";

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
      <div className="flex p-4 md:p-0 md:pt-8 ">
        <div className=" hidden md:flex ">
          {/* <Sidebar isAdmin={false} /> */}
        </div>
        <TopicsSideBar
          topics={topics ?? []}
          onNodeClick={handleNodeClick}
          isAdmin={false}
        />

        <ContentDisplay />
      </div>
    </div>
  );
};

export default Page;
