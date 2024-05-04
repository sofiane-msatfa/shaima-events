import { Paper, Skeleton, Stack, Typography } from "@mui/material";

export function EventCardSkeleton() {
  return (
    <Paper variant="outlined">
      <Stack sx={{ p: 1 }}>
        <Skeleton sx={{ paddingTop: "100%", transform: "inherit" }} />
      </Stack>

      <Stack spacing={0.5} sx={{ px: 1.5, pb: 2 }}>
        <Typography variant="subtitle1">
          <Skeleton width="80%" />
        </Typography>
        <Skeleton sx={{ width: 0.5, height: 16 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton sx={{ width: 40, height: 16 }} />
          <Skeleton sx={{ width: 40, height: 16 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}
