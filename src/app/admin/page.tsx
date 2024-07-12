"use client";
import React, { useState } from "react";
//import Demo from "./layoutComponent/tab";
import SideBar from "./layoutComponent/sideBar";
import Image from "next/image";
import adminIcon from "../../../public/Vector.svg";
import { Tabs, rem } from "@mantine/core";
import UpdateFormTitle from "./component/updateForm";
import NotePicker from "./component/NotePicker";

export default function admin() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-8  w-[25%] h-screen bg-green-700 px-10 py-20">
        <div className="flex gap-5">
          <div>
            <Image src={adminIcon} height={40} width={40} alt="admin Icon" />
          </div>
          <div>
            <p className="text-[35px] font-bold">Admin</p>
          </div>
        </div>
        <SideBar onTitleSelect={handleTitleSelect} />
      </div>
      <div className="flex w-[75%] bg-white text-black p-20">
        <div className="flex w-[1000px] h-auto">
          <Tabs defaultValue="update w-[1000px]">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex w-full h-auto">
                <Tabs.List className="flex gap-10 px-10 py-4 border border-green-500 rounded-20px w-full">
                  <Tabs.Tab value="update">Update</Tabs.Tab>
                  <Tabs.Tab value="add">Add</Tabs.Tab>
                  <Tabs.Tab value="delete">Delete</Tabs.Tab>
                </Tabs.List>
              </div>

              <div className="w-full h-screen border border-green-500 rounded-xl p-10">
                <Tabs.Panel value="update">
                  {selectedTitle ? `Update ${selectedTitle}` : "Update Form"}
                  <UpdateFormTitle title={selectedTitle} />
                </Tabs.Panel>

                <Tabs.Panel value="add">
                  <NotePicker />
                </Tabs.Panel>

                <Tabs.Panel value="delete">Delete</Tabs.Panel>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
