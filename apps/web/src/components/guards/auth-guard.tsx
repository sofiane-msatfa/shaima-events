import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return router.replace("/login");
  }

  return <>{children}</>;
}
