import React, { useState, useEffect } from "react";
import { Autocomplete, Collapse, Flex, Group } from "@mantine/core";
import { IconMoon, IconSun, IconSearch } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "@/app/admin/component/tree/Sidebar";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <div>
      <header className="p-4  md-px-10 border-b border-gray-200 dark:border-gray-800 sticky bg-white dark:bg-[#172c21] dark:text-white">
        <div className="flex justify-between items-center">
          <Group>
            <Link href="/">
              <Image
                src={`/logo.svg`}
                alt="perago logo"
                width="80"
                height="50"
                className="flex md:w-[120px]"
              />
            </Link>
          </Group>

          <Group>
            <div className="hidden px-2 md:flex items-center w-[200px] md:w-[250px] rounded-md border border-gray-300 dark:border-[#112018] focus-within:ring-2 focus-within:ring-blue-300">
              <IconSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 dark:bg-[#172c21]  focus:outline-none"
              />
              <div className="h-auto w-[80px] text-gray-700 dark:text-gray-400 bg-[#D9D9D9] dark:bg-[#112018] py-[5px] px-[3px] rounded-md text-xs">
                Ctrl + K
              </div>
            </div>
            <div className="md:hidden">
              <IconSearch className="text-gray-600 ml-2" />
            </div>

            <div
              className=""
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <IconMoon className="text-gray-600 cursor-pointer" />
              ) : (
                <IconSun className="text-[#9ca3af] cursor-pointer" />
              )}
            </div>
            {theme === "light" ? (
              <Burger
                opened={opened}
                onClick={toggle}
                // hiddenFrom="md"
                size="25px"
                color="#374151"
                className=" md:hidden 3xl:h-[60px] z-50 "
                //style={}
              />
            ) : (
              <Burger
                opened={opened}
                onClick={toggle}
                // hiddenFrom="md"
                size="25px"
                color="#9ca3af"
                className=" md:hidden 3xl:h-[60px] z-50 "
                //style={}
              />
            )}
          </Group>
        </div>
      </header>
      <Collapse in={opened} className="relative">
        <div className="flex w-full  h-1 justify-end">
          {" "}
          <Flex
            onClick={toggle}
            className="flex flex-col items-left justify-center gap-4 3xl:gap-6 pt-4 border h-screen w-full bg-white dark:bg-[#172c21] opacity-100 "
          >
            <Sidebar
              onCategoryClick={function (categoryId: string): void {
                throw new Error("Function not implemented.");
              }}
              onSubCategoryClick={function (sub: any): void {
                throw new Error("Function not implemented.");
              }}
              isAdmin={false}
            />
          </Flex>
        </div>
      </Collapse>
    </div>
  );
};

export default Header;
