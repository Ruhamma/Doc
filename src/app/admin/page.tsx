import React from "react";
import Demo from "./layoutComponent/tab";
import SideBar from "./layoutComponent/sideBar";
import Image from "next/image";
import adminIcon from "../../../public/Vector.svg";

export default function admin() {
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
        <SideBar />
      </div>
      <div className="flex w-[75%] bg-white text-black p-20">
        <Demo />
      </div>
    </div>
  );
}
