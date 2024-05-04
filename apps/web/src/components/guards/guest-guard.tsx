import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    return router.replace("/events");
  }

  return <>{children}</>;
}
