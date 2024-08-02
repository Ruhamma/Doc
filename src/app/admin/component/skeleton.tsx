import { Box, Skeleton } from "@mantine/core";
import Navbar from "./Navbar";

function SkeletonLayout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <Box className="w-1/4 p-4 bg-gray-100">
          <Skeleton height={32} radius="xl" />
          <Skeleton height={32} mt={6} radius="xl" />
          <Skeleton height={32} mt={6} width="70%" radius="xl" />
          <Skeleton height={32} mt={6} radius="xl" />
          <Skeleton height={32} mt={6} width="50%" radius="xl" />
        </Box>

        <Box className="flex-grow p-4">
          <Skeleton height={40} radius="xl" />
          <Skeleton height={40} mt={6} radius="xl" />
          <Skeleton height={40} mt={6} width="80%" radius="xl" />
          <Skeleton height={40} mt={6} radius="xl" />
          <Skeleton height={200} mt={6} radius="xl" />
        </Box>
      </Box>
    </div>
  );
}

export default SkeletonLayout;
