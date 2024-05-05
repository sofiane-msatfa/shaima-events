import { Box } from "@mui/material";
import { EventCard } from "./event-card";
import { EventCardSkeleton } from "./event-card-skeleton";

import type { Event } from "@common/dto/event";
import type { UserLight } from "@common/dto/user-light";

interface EventListProps {
  events: Event[];
  loading: boolean;
  user: UserLight;
}

export function EventList({ events, loading, user }: EventListProps) {
  const renderEventSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => <EventCardSkeleton key={index} />);
  };

  const renderEventCards = () => {
    return events.map((event) => <EventCard user={user} key={event.id} event={event} />);
  };

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
    >
      {loading ? renderEventSkeletons() : renderEventCards()}
    </Box>
  );
}
