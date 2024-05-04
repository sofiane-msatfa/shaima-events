import { Box } from "@mui/material";
import { Header } from "./header";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
