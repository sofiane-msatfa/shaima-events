import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated) {
    // TODO: utiliser un dictionnaire de routes pour centraliser le tout
    return <Navigate to="/auth/login" replace />;
  }

  if (isLoading) {
    // on s'assure que l'utilisateur est chargé avant de rendre l'enfant
    return null;
  }

  return <>{children}</>;
}
