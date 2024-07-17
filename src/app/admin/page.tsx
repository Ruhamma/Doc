"use client";
import React, { useState } from "react";
//import Demo from "./layoutComponent/tab";
//import SideBar from "./layoutComponent/sideBar";
import Image from "next/image";
import adminIcon from "../../../public/Vector.svg";
import { Tabs, rem } from "@mantine/core";

import Navbar from "./component/Navbar";
import Main from "./component/Main";
import SideBar from "./component/sideBar";

export default function admin() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex w-full h-auto mt-0 py-16">
        {/* <SideBar onCreateClick={handleCreateClick} /> */}

        <div className="flex flex-col w-3/4 h-auto ">
          <Main />
          <div className="w-full h-[50px] bg-white"></div>
        </div>
      </div>
    </div>
  );
}
