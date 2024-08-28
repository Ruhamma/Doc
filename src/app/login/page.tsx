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

const inputStyles = {
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.25)", // Less transparent background
    color: "white", // White text color
    borderColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent black border color
    "::placeholder": {
      color: "#ffffff", // White placeholder color
    },
  },
  label: {
    color: "white", // White label color
  },
};
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
    <BackgroundImage
      src={`/natural.png`}
      className="h-screen w-screen bg-cover bg-center relative"
    >
      <Flex
        gap={4}
        justify="center"
        align="center"
        className="h-[90vh] rounded-lg px-4"
      >
        <Card
          className="border border-gray-300 glassmorphic-card"
          style={{
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "lg", md: "xl" }}
            className="w-full"
          >
            <Group className="w-full md:w-1/2 mx-auto">
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

              <Image
                src="/Login.svg"
                width={453}
                height={395}
                alt={"Hero image"}
                className="mx-auto"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Group>
            <Group className="w-full md:w-1/2">
              <Card
                shadow="sm"
                className="w-full h-full flex flex-col border-x-green-600 text-white"
                style={{
                  borderRadius: "12px",
                  background: "rgba(0, 0, 0, 0.4)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <Flex
                  gap={5}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <h2 className="text-xl p-4 font-semibold mb-6 text-center text-white">
                    Login
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <Flex direction="column" gap="lg" w="100%">
                      <TextInput
                        classNames={{
                          input:
                            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                          label: "block text-sm font-medium",
                        }}
                        styles={inputStyles}
                        {...register("username")}
                        label="Username"
                        placeholder="Enter your Username"
                        error={errors.username?.message}
                      />

                      <PasswordInput
                        classNames={{
                          input:
                            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                          label: "block text-sm font-medium",
                        }}
                        styles={inputStyles}
                        {...register("password")}
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                      />

                      <Button
                        variant="filled"
                        className="shadow-xl text-white mt-8"
                        size="md"
                        color="#2EC150"
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
