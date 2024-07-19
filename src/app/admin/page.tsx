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
      {/* <Navbar /> */}

      {/* <SideBar /> */}
      <MdxEditor />
    </div>
  );
}
