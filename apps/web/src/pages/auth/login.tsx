import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema, type LoginRequest } from "@common/dto/login-request";
import { useAuth } from "@/contexts/auth/use-auth";
import { useRouter } from "@/hooks/use-router";
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { toast } from "sonner";

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
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
