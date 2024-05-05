import type { UserLight } from "@common/dto/user-light";
import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import { useAuth } from "@/contexts/auth/use-auth";

export const fetchCurrentUser = async () => {
  const response = await api.get<UserLight>("/users/me");
  return response.data;
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchCurrentUser,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
