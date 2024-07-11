'use client'
import { Button, Flex, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Header from "./_component/header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <Header />
      <Flex
        gap={4}
        justify="center"
        align="center"
        direction="row"
        className="px-24 h-[90vh]"
      >
        <Group className="w-1/2">
          <Stack align="stretch" justify="center" gap="xl">
            <p className="text-5xl font-extrabold text-[#404040] open-sans">
              Lets Get Started With PISDOC
            </p>
            <p className="text-xl text-[#404040]">
              Welcome to the official documentation site for [Your Company]'s
              products and services. This site is your go-to resource for
              understanding and utilizing our offerings effectively.
            </p>
          </Stack>
          <Group justify="center" className="mt-10">
            <Button
              variant="filled"
              className="text-white shadow-xl px-10 bg-[#182654]"
              color="#2EC150"
              size="lg"
              onClick={() => {
                router.push("/test/user/introduction");
              }}
            >
              Get started
            </Button>
            <Button
              variant="filled"
              className="shadow-xl px-10"
              size="lg"
              color="#595959"
            >
              Secondary
            </Button>
          </Group>
        </Group>
        <Group className="w-1/2   mx-auto">
          <Image
            src="/hero.svg"
            width={453}
            height={395}
            alt={"Hero image"}
            className="mx-auto"
          />
        </Group>
      </Flex>
    </main>
  );
}
