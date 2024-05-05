import { Container, Stack } from "@mui/material";
import { Header } from "./header";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: "auto",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
