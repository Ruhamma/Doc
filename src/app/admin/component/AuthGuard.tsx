import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);
};

export default useAuthGuard;
