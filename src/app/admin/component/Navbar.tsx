import React from "react";
import Image from "next/image";
import logo from "../../../../public/Pisdoc.svg";
import { IconSearch, IconMoon } from "@tabler/icons-react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className="w-full justify-between flex fixed h-16 bg-white shadow-lg px-8 ">
      <div className="flex items-center">
        <Image src={logo} alt="company logo" className=" h-[35px] w-[150px]" />
      </div>{" "}
      <div className="flex gap-3 items-center">
        <div className="px-2 flex items-center w-[250px] rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-300">
          <IconSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 focus:outline-none"
          />
          <div className="h-auto w-[80px] text-gray-700 bg-[#D9D9D9] py-[5px] px-[3px] rounded-md text-xs">
            Ctrl + K
          </div>
        </div>
        <div className="flex border border-gray-300 rounded-md p-2">
          <IconMoon className="text-gray-400" />
        </div>
        <Burger
          opened={opened}
          onClick={toggle}
          // hiddenFrom="md"
          size="45px"
          color="#bea632"
          className=" 3xl:h-[60px] 3xl:w-[60px] fixed top-4 right-[10px]  xl:right-[115px] 3xl:right-[155px]"
          //style={}
        />
      </div>
    </div>
  );
}

export default Navbar;
