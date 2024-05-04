import { type PartialEventFilters, useGetEvents } from "@/api/events";
import { useInView } from "react-intersection-observer";
import { Container, Typography } from "@mui/material";
import { EventList } from "@/components/events/event-list";
import { useEffect, useState } from "react";
import { EventToolbar } from "@/components/events/event-toolbar";
import { useDebounce } from "@/hooks/use-debounce";

Component.displayName = "EventsPage";

const defaultFilters: PartialEventFilters = {
  startTime: new Date(),
  pageSize: 20,
};

export function Component() {
  const [filters, setFilters] = useState<PartialEventFilters>(defaultFilters);
  const events = useGetEvents(filters);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const onFiltersChange = useDebounce((filters: PartialEventFilters) => {
    setFilters(filters);
  }, 500);

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

      <EventToolbar filters={filters} onFiltersChange={onFiltersChange} />
      <EventList events={allEvents} loading={events.isPending} />

      <div ref={ref} />
    </Container>
  );
}
