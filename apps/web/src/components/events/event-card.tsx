import type { Event } from "@common/dto/event";

import { useState } from "react";
import { Box, Stack, Typography, Paper, Fab } from "@mui/material";
import { Image } from "../image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Label } from "../label";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  const formattedDate = new Date(event.startTime).toLocaleDateString("fr-FR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const categoryLabel = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: "absolute", zIndex: 9, top: 16, right: 16 }}
    >
      <Label variant="filled" color="info">
        {event.category}
      </Label>
      {/* on peut rajouter des labels */}
    </Stack>
  );

  const participantLabel = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: "absolute", zIndex: 9, bottom: 16, right: 16 }}
    >
      {/* ajouter couleur dynamique lorsqu'on se rapproche de la limite */}
      <Label variant="filled" color="default">
        {event.participants.length} / {event.capacity}
      </Label>
    </Stack>
  );

  const favoriteButton = (
    <Fab
      size="small"
      variant="extended"
      className="join-event-btn"
      onClick={toggleFavorite}
      sx={{
        right: 16,
        bottom: 16,
        zIndex: 9,
        opacity: 0,
        position: "absolute",
        bgcolor: "primary.light",
        transition: (theme) =>
          theme.transitions.create("all", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
      }}
    >
      {isFavorited ? <FavoriteIcon sx={{ mr: 0.5 }} /> : <FavoriteBorderIcon sx={{ mr: 0.5 }} />}
      {isFavorited ? (
        <Typography variant="caption">Favorited</Typography>
      ) : (
        <Typography variant="caption">Favorite</Typography>
      )}
    </Fab>
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "relative",
        boxShadow: (theme) => theme.customShadows.z4,
        "&:hover .join-event-btn": {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: "relative", p: 1 }}>
        {categoryLabel}
        {favoriteButton}
        <Image src="https://picsum.photos/300" alt="" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack spacing={0} sx={{ px: 1.5, pb: 2 }}>
        <Typography variant="subtitle1" textTransform="capitalize">
          {event.name}
        </Typography>

        {/* {event.description && (
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>x
        )} */}

        <Typography variant="subtitle2" color="secondary.main">
          {formattedDate}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {/* mettre l'adresse réelle */}
          {event.address}
        </Typography>
      </Stack>

      {participantLabel}
    </Paper>
  );
}
