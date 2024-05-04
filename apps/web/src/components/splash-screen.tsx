import { motion } from "framer-motion";
import { Box } from "@mui/material";

const colors = ["#22238f", "#6b45fa", "#ca3286", "#fe2b49", "#fe652d"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {},
  animate: {
    height: [40, 100, 40],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

export function SplashScreen({ count = 5 }) {
  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          display: "flex",
          gap: 16,
          height: 100,
          alignItems: "center",
        }}
      >
        {Array(count)
          .fill(null)
          .map((_, index) => {
            return (
              <motion.div
                key={index}
                variants={dotVariants}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: colors[index % colors.length],
                  borderRadius: 20,
                }}
              />
            );
          })}
      </motion.div>
    </Box>
  );
}
