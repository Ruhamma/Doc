import React from "react";
import { Autocomplete, Burger, Group } from "@mantine/core";
import { IconMoon, IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

const Header = () => {
  //   const [opened, { toggle }] = useDisclosure(false);

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
    <header className="p-4 px-10 shadow-md sticky">
      <div className="flex justify-between items-center">
        <Group>
          <Image src={`/logo.svg`} alt="perago logo" width="110" height="30" />
        </Group>

        <Group>
          <Autocomplete
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: "1rem", height: "1rem" }}
                stroke={1.5}
              />
            }
            data={["React", "Angular", "Vue", "Svelte"]}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            className=""
          />
          <div className="">
            <IconMoon className="text-dark" />
          </div>
        </Group>
      </div>
    </header>
  );
};

export default Header;
