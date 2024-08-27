"use client";

import {
  Alert,
  BackgroundImage,
  Button,
  Card,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginMutation } from "../services/create_api";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data).unwrap();
      if (response.access_token) {
        localStorage.setItem("authToken", response.access_token);
        router.push("/admin");
      } else {
        console.error("Invalid response structure:", response);
      }
    } catch (err) {
      let errorMessage = "Login failed";
      if (err && typeof err === "object" && "data" in err) {
        const errorData = (err as { data?: unknown }).data;
        if (
          typeof errorData === "object" &&
          errorData &&
          "message" in errorData
        ) {
          errorMessage = (errorData as { message: string }).message;
        }
      }
      console.error("Login failed:", errorMessage);
    }
  };

  return (
    <BackgroundImage src={`/background.jpeg`} className="full-h">
      <Flex
        gap={4}
        justify="center"
        align="center"
        className="px-24 h-[90vh] rounded-lg"
      >
        <Card
          bg={"white"}
          className="border border-gray-300"
          style={{ borderRadius: "12px" }}
        >
          <div className="flex justify-start items-center">
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
          </div>
          <Flex direction="row" gap={"md"}>
            <Group className="w-1/2 mx-auto">
              <Image
                src="/Login.svg"
                width={453}
                height={395}
                alt={"Hero image"}
                className="mx-auto"
              />
            </Group>
            <Group>
              <Card
                shadow="sm"
                pb="xl"
                className="border-x-green-600"
                style={{ backgroundColor: "#8db687" }}
              >
                <Flex
                  gap={5}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <h2 className="text-xl font-semibold mb-6 text-center">
                    Login
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="lg" w="100%">
                      <TextInput
                        classNames={{
                          input:
                            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                          label: "block text-sm font-medium text-gray-700",
                        }}
                        {...register("username")}
                        label="Username"
                        placeholder="Enter your Username"
                        error={errors.username?.message}
                      />

                      <PasswordInput
                        classNames={{
                          input:
                            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                          label: "block text-sm font-medium text-gray-700",
                        }}
                        {...register("password")}
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                      />

                      <Button
                        variant="filled"
                        className="shadow-xl px-4"
                        size="md"
                        color="#595959"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>

                      {error && (
                        <Alert color="red" mt="md">
                          {typeof error === "object" && "data" in error
                            ? (error.data as { message?: string }).message ||
                              "An error occurred. Please try again."
                            : "An unexpected error occurred."}
                        </Alert>
                      )}
                    </Flex>
                  </form>
                </Flex>
              </Card>
            </Group>
          </Flex>
        </Card>
      </Flex>
    </BackgroundImage>
  );
};

export default LoginPage;
