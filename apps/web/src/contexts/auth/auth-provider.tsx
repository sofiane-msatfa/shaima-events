import { useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth-context";
import { api, setAccessTokenInterceptor } from "@/api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "@common/dto/login-request";
import type { RegisterRequest } from "@common/dto/register-request";
import type { AccessTokenResponse } from "@common/dto/access-token-response";
import type { UserLight } from "@common/dto/user-light";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("access_token");
  });

  const { data: user, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<UserLight>("/users/me");
      return response.data;
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (accessToken) {
      setAccessTokenInterceptor(accessToken);
    }
  }, [accessToken]);

  // we should handle errors in the component that uses the context
  // maybe add captcha to prevent brute force attacks
  const register = async (credentials: RegisterRequest) => {
    await api.post("/auth/register", credentials);
  };

  // we should handle errors in the component that uses the context
  const login = async (credentials: LoginRequest) => {
    const response = await api.post<AccessTokenResponse>("/auth/login", credentials);
    const { accessToken } = response.data;
    localStorage.setItem("access_token", accessToken);
    setAccessToken(accessToken);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("access_token");
    setAccessToken(null);
    queryClient.invalidateQueries({ queryKey: ["me"] });
  };

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated: !!accessToken,
      isLoading: isPending,
      accessToken,
      register,
      login,
      logout,
      user: user ?? null,
    }),
    [accessToken, user, isPending, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
