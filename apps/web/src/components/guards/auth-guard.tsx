import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // TODO: utiliser un dictionnaire de routes pour centraliser le tout
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
