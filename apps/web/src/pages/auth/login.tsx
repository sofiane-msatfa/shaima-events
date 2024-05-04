import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema, type LoginRequest } from "@common/dto/login-request";
import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";

Component.displayName = "LoginPage";

export function Component() {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await auth.login(data);
      router.replace("/");
    } catch (err) {
      console.error(err);
      // toast ?
      alert("An error occurred");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password", { required: true })} />
      <button type="submit">Login</button>
      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
    </form>
  );
}
