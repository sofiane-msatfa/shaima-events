import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequestSchema, type RegisterRequest } from "@common/dto/register-request";
import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";
import { z } from "zod";

Component.displayName = "RegisterPage";

interface RegisterForm extends RegisterRequest {
  passwordConfirmation: string;
}

const registerSchema = registerRequestSchema.extend({
  passwordConfirmation: z.string().min(8).max(255),
});

export function Component() {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (data.password !== data.passwordConfirmation) {
      return setError("passwordConfirmation", {
        type: "manual",
        message: "Passwords do not match",
      });
    }

    try {
      await auth.register(data);
      router.replace("/auth/login");
    } catch (err) {
      console.error(err);
      // toast ?
      alert("An error occurred");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Firstname" {...register("firstname", { required: true })} />
      <input type="text" placeholder="Lastname" {...register("lastname", { required: true })} />
      <input type="text" placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password", { required: true })} />
      <input
        type="password"
        placeholder="Confirm password"
        {...register("passwordConfirmation", { required: true })}
      />
      <button type="submit">Register</button>
      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
      {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
    </form>
  );
}
