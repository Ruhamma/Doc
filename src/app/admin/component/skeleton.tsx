import { Skeleton } from "@mantine/core";

function SkeletonLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-100">
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="50%" radius="xl" />
      </div>

      <div className="w-3/4 p-4">
        <Skeleton height={16} radius="xl" />
        <Skeleton height={16} mt={6} radius="xl" />
        <Skeleton height={16} mt={6} width="80%" radius="xl" />
      </div>
    </div>
  );
}

export default SkeletonLayout;
