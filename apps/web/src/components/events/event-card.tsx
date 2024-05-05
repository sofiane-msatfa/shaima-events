import type { Event } from "@common/dto/event";
import type { UserLight } from "@common/dto/user-light";

import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Fab,
  IconButton,
  Divider,
  Card,
  CardHeader,
  CardActions,
  CardContent,
} from "@mui/material";
import { Image } from "../image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Label } from "../label";
import { toggleEventParticipation } from "@/api/events";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useBoolean } from "@/hooks/use-boolean";
import { EditEventForm } from "./edit-event-form";

interface EventCardProps {
  event: Event;
  user: UserLight;
}

export function EventCard({ event, user }: EventCardProps) {
  const dialog = useBoolean();
  const [isFavorited, setIsFavorited] = useState(() => event.participants.includes(user.id));
  const isAuthor = event.author === user.id;

  const toggleFavorite = async () => {
    // optimistic update
    setIsFavorited((prev) => !prev);
    const updatedEvent = await toggleEventParticipation(event.id);
    // on met à jour l'état avec la valeur réelle
    setIsFavorited(updatedEvent.participants.includes(user.id));
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
      {isAuthor ? (
        <Label variant="filled" color="primary">
          Organisateur
        </Label>
      ) : null}
      {/* on peut rajouter des labels */}
    </Stack>
  );

  const participantLabel = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: "absolute", zIndex: 9, bottom: 16, left: 16 }}
    >
      {/* ajouter couleur dynamique lorsqu'on se rapproche de la limite */}
      <Label variant="filled" color="default">
        {event.participants.length} participants
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

  const authorTools = (
    <CardActions disableSpacing sx={{ mt: "auto" }}>
      <IconButton aria-label="add to favorites" size="small" onClick={dialog.onTrue}>
        <EditCalendarIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="share" size="small" color="error">
        <DeleteOutlineIcon fontSize="inherit" />
      </IconButton>
    </CardActions>
  );

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          // position: "relative",
          boxShadow: (theme) => theme.customShadows.z4,
          "&:hover .join-event-btn": {
            opacity: 1,
          },
        }}
      >
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader={formattedDate}
          titleTypographyProps={{ variant: "body1", fontWeight: 500 }}
          subheaderTypographyProps={{ variant: "body2", color: "secondary.main" }}
        />
        <Box sx={{ position: "relative", p: 1 }}>
          {categoryLabel}

          {!isAuthor ? favoriteButton : null}

          <Image src="https://picsum.photos/300" alt="" sx={{ borderRadius: 1 }} />

          {participantLabel}
        </Box>

        <CardContent sx={{ pt: 1 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={400}>
              {event.address}
            </Typography>
            <Divider />
            <Typography variant="subtitle2" color="text.secondary">
              {event.description}
            </Typography>
          </Stack>
        </CardContent>

        {isAuthor ? authorTools : null}
      </Card>

      <EditEventForm event={event} open={dialog.value} onClose={dialog.onFalse} />
    </>
  );
}
