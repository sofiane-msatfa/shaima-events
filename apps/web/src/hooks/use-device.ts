import { useResponsive } from "./use-responsive";

export const useDevice = () => {
  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("between", ["sm", "md"]);
  const isDesktop = useResponsive("up", "md");

  return { isMobile, isTablet, isDesktop };
};
