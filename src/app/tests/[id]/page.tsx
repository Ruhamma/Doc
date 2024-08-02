"use client";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import ContentDisplay from "../Components/ContentDisplay";
import Header from "../Components/Header";

const Page = () => {
  return (
    <div className="flex-col w-full h-auto">
      <div>
        <Header />
      </div>
      <div className="flex pt-8">
        <Sidebar />
        <ContentDisplay />
      </div>
    </div>
  );
};

export default Page;
