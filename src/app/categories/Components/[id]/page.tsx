"use client";
import React, { useState } from "react";
import Sidebar from "../../../admin/component/tree/Sidebar";
import SkeletonLayout from "@/app/admin/component/skeleton";
import Header from "../Header";
import TopicsSideBar from "@/app/admin/component/tree/TopicsSideBar";
import { Topic } from "@/types/topic";
import { useGetTopicsQuery } from "@/app/services/create_api";
import ContentDisplay from "../ContentDisplay";
import { Skeleton, Box } from "@mantine/core";

const Page = () => {
  const { data: topics, error, isLoading } = useGetTopicsQuery();
  const handleNodeClick = () => {};

  // if (isLoading) {
  //   // return (
  //   //   <Box className="p-4 bg-gray-100">
  //   //   <Skeleton height={32} radius="xl" />
  //   //   <Skeleton height={32} mt={6} radius="xl" />
  //   //   <Skeleton height={32} mt={6} width="70%" radius="xl" />
  //   //   <Skeleton height={32} mt={6} radius="xl" />
  //   //   <Skeleton height={32} mt={6} width="50%" radius="xl" />
  //   // </Box>
  //   // );
  //   console.log("loading")
  // }

  // const handleNodeClick = (node: Topic) => {
  //   console.log(node);
  // };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading topics</div>;

  return (
    <div className="flex-col w-full h-auto">
      <div>
        <Header />
      </div>
      <div className="flex p-4 md:p-0 md:pt-8 ">
        <div className=" hidden md:flex ">
          {/* <Sidebar isAdmin={false} /> */}
          <TopicsSideBar
            topics={topics ?? []}
            onNodeClick={handleNodeClick}
            isAdmin={true}
          />
        </div>

        <ContentDisplay />
      </div>
    </div>
  );
};

export default Page;
