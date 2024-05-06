import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequestSchema, type RegisterRequest } from "@common/dto/register-request";
import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";
import { z } from "zod";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
      toast.error("Une erreur s'est produite");
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5" marginTop={2} marginBottom={2}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Firstname"
                {...register("firstname", { required: true })}
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Lastname"
                {...register("lastname", { required: true })}
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                fullWidth
                id="password"
                label="Password"
                name="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                placeholder="Confirm password"
                {...register("passwordConfirmation", { required: true })}
                fullWidth
                id="passwordConfirmation"
                label="Confirm password"
                name="passwordConfirmation"
              />
              {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="#">Forgot password ?</Link>
            </Grid>
            <Grid item>
              <Link to="#">{"Don't have an account ? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
