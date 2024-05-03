import { createContext } from "react";
import type { LoginRequest } from "@/dtos/login-request";
import type { RegisterRequest } from "@/dtos/register-request";
import type { UserLight } from "@/dtos/user-light";

type AsyncVoidFunction = () => Promise<void>;

export interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserLight | null;
  register: (credentials: RegisterRequest) => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: AsyncVoidFunction;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
