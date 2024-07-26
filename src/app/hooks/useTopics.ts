import { useGetTopicsQuery } from "../services/create_api";

export const useTopic = () => {
  const { data, error, isLoading } = useGetTopicsQuery();

  return {
    employee: data,
    error,
    isLoading,
  };
};
