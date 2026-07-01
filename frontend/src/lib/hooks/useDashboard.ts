import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "@/services/api";

export const useDashboard = () => {
  return useQuery<any>({
    queryKey: ["dashboard"],
    queryFn: getAdminDashboard,
  });
};
