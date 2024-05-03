import { useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth-context";
import api, { setAccessTokenInterceptor } from "@/utils/api";
import type { LoginRequest } from "@/dtos/login-request";
import type { RegisterRequest } from "@/dtos/register-request";
import type { AccessTokenResponse } from "@/dtos/access-token-response";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("access_token");
  });
  const isAuthenticated = !!accessToken;

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
    const response = await api.post<AccessTokenResponse>(
      "/auth/login",
      credentials,
    );
    const { accessToken } = response.data;
    localStorage.setItem("access_token", accessToken);
    setAccessToken(accessToken);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("access_token");
    setAccessToken(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      accessToken,
      register,
      login,
      logout,
    }),
    [isAuthenticated, accessToken, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
