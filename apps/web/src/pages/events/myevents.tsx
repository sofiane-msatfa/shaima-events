import { useGetMyEvents } from "@/api/events";
import { useInView } from "react-intersection-observer";
import { Container, Typography } from "@mui/material";
import { EventList } from "@/components/event-list";
import { useEffect } from "react";

Component.displayName = "EventsPage";

export function Component() {
  const events = useGetMyEvents({ pageSize: 20 });

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView && events.hasNextPage) {
      events.fetchNextPage();
    }
  }, [inView, events]);

  const allEvents = events.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Container sx={{ my: 10 }}>
      <Typography component="h1" variant="h4">
        Events
      </Typography>
      {allEvents.length > 0 ? (
        <EventList events={allEvents} loading={events.isPending} />
      ) : (
        <Typography variant="body1">No events found</Typography>
      )}
      <div ref={ref} />
    </Container>
  );
}
