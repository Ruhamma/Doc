"use client";
import React, { useState } from "react";
//import Demo from "./layoutComponent/tab";
//import SideBar from "./layoutComponent/sideBar";
import Image from "next/image";
import adminIcon from "../../../public/Vector.svg";
import { Tabs, rem } from "@mantine/core";

import Navbar from "./component/Navbar";
import { SideBar } from "./component/side_bar";
import MdxEditor from "./component/mdxeditor/mdxEditor";

// import Main from "./component/Main";

export default function admin() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Fixed Navbar */}
      <div className="navbar bg-gray-300 h-16 w-full fixed top-0 z-10">
        <Navbar />
      </div>
      {/* Main content with sidebar and editor */}
      <div className="flex flex-row w-full h-full pt-16 overflow-hidden">
        <div className="sidebar w-1/5 bg-gray-200 h-full overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col w-4/5 p-4 h-full overflow-y-auto">
          <MdxEditor />
        </div>
      </div>
    </div>
  );
}
