import { Box, type BoxProps } from "@mui/material";

export type ImageRatio = "4/3" | "3/4" | "6/4" | "4/6" | "16/9" | "9/16" | "21/9" | "9/21" | "1/1";

export interface ImageProps extends BoxProps {
  src: string;
  alt: string;
  ratio?: ImageRatio; // default is 1/1
}

function getImageRatio(ratio: ImageRatio = "1/1") {
  return {
    "4/3": "calc(100% / 4 * 3)",
    "3/4": "calc(100% / 3 * 4)",
    "6/4": "calc(100% / 6 * 4)",
    "4/6": "calc(100% / 4 * 6)",
    "16/9": "calc(100% / 16 * 9)",
    "9/16": "calc(100% / 9 * 16)",
    "21/9": "calc(100% / 21 * 9)",
    "9/21": "calc(100% / 9 * 21)",
    "1/1": "100%",
  }[ratio];
}

export function Image({ ratio, src, alt, sx, ...props }: ImageProps) {
  return (
    <Box
      sx={{
        pt: "100%",
        overflow: "hidden",
        position: "relative",
        verticalAlign: "bottom",
        ...(!!ratio && {
          pt: getImageRatio(ratio),
        }),
        ...sx,
      }}
      {...props}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{
          top: 0,
          width: 1,
          height: 1,
          objectFit: "cover",
          position: "absolute",
          verticalAlign: "bottom",
        }}
      />
    </Box>
  );
}
