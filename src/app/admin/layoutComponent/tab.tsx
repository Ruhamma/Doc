"use client";
import { Tabs, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";

export default function Demo() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs defaultValue="gallery w-[1000px] h-auto bg-blue-200">
      <div className="flex flex-col gap-5 w-[100%]">
        <div className="flex w-[1000px] h-auto">
          <Tabs.List className="flex gap-10 px-10 py-4 border border-green-500 rounded-[200px] w-full">
            <Tabs.Tab value="gallery">Update</Tabs.Tab>
            <Tabs.Tab value="messages">Add</Tabs.Tab>
            <Tabs.Tab value="settings">Delete</Tabs.Tab>
          </Tabs.List>
        </div>

        <div className="w-full h-screen border border-green-500 rounded-xl p-10">
          <Tabs.Panel value="gallery">Update Form</Tabs.Panel>

          <Tabs.Panel value="messages">Add form</Tabs.Panel>

          <Tabs.Panel value="settings">Delete</Tabs.Panel>
        </div>
      </div>
    </Tabs>
  );
}
