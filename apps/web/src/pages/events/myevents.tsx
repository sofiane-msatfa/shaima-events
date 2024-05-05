import { useGetMyEvents } from "@/api/events";
import { useInView } from "react-intersection-observer";
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { EventList } from "@/components/events/event-list";
import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

Component.displayName = "EventsPage";

export function Component() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

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
        <EventList user={user} events={allEvents} loading={events.isPending} />
      ) : (
        <Typography variant="body1">No events found</Typography>
      )}
      <div ref={ref} />
    </Container>
  );
}
