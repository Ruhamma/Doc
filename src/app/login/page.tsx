"use client";

import {
  Alert,
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
  userName: z
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
    <Flex
      justify="center"
      align="center"
      style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}
    >
      <Card shadow="sm" padding="lg" pb={"xl"} className="border-x-green-600">
        <div className="flex justify-center items-center p-8">
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

        <Flex gap={5} direction="column" justify="center" align="center">
          <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="lg" w={"100%"}>
              <TextInput
                classNames={{
                  input:
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  label: "block text-sm font-medium text-gray-700",
                }}
                {...register("userName")}
                label="Username"
                placeholder="Enter your Username"
                error={errors.userName?.message}
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
    </Flex>
  );
};

export default LoginPage;
