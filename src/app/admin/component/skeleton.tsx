import { Box, Skeleton } from "@mantine/core";
import Navbar from "./Navbar";

function SkeletonLayout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <Box className="w-64 p-4 bg-gray-100">
          {" "}
          <Skeleton height={24} radius="xl" />
          <Skeleton height={24} mt={4} radius="xl" />
          <Skeleton height={24} mt={4} width="60%" radius="xl" />{" "}
          <Skeleton height={24} mt={4} radius="xl" />
          <Skeleton height={24} mt={4} width="40%" radius="xl" />{" "}
          <div className="mt-4 space-y-2">
            <Skeleton height={20} radius="xl" />
            <Skeleton height={20} mt={2} radius="xl" />
            <Skeleton height={20} mt={2} width="80%" radius="xl" />
          </div>
        </Box>

        <Box className="flex-grow p-4">
          <Skeleton height={40} radius="xl" /> {/* Topic header */}
          <Skeleton height={20} mt={6} radius="xl" /> {/* Topic paragraph */}
          <Skeleton height={20} mt={6} width="80%" radius="xl" />
          <Skeleton height={20} mt={6} radius="xl" />
          <Skeleton height={160} mt={6} radius="xl" /> {/* Content area */}
        </Box>
      </Box>
    </div>
  );
}

export default SkeletonLayout;
