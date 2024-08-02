import React, { useState, useEffect } from "react";
import { Autocomplete, Group } from "@mantine/core";
import { IconMoon, IconSun, IconSearch } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

const Header = () => {
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
    <header className="p-4 px-10 border-b border-gray-200 dark:border-gray-800 sticky bg-white dark:bg-[#172c21] dark:text-white">
      <div className="flex justify-between items-center">
        <Group>
          <Link href="/">
            <Image
              src={`/logo.svg`}
              alt="perago logo"
              width="110"
              height="30"
            />
          </Link>
        </Group>

        <Group>
          <div className="px-2 flex items-center w-[250px] rounded-md border border-gray-300 dark:border-[#112018] focus-within:ring-2 focus-within:ring-blue-300">
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

          <div
            className=""
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <IconMoon className="text-dark cursor-pointer" />
            ) : (
              <IconSun className="text-gray-200 cursor-pointer" />
            )}
          </div>
        </Group>
      </div>
    </header>
  );
};

export default Header;
