import type { Event } from "@common/dto/event";
import type { PaginationResponse } from "@common/dto/pagination-response";
import type { EventFilters } from "@common/dto/event-filters";

import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";

type PartialEventFilters = Partial<EventFilters>;

export const fetchEvents = async (eventFilters: PartialEventFilters) => {
  const response = await api.get<PaginationResponse<Event>>("/events", {
    params: eventFilters,
  });

  return response.data;
};

export const useGetEvents = (eventFilters?: PartialEventFilters) => {
  const { page, ...filters } = eventFilters || {};

  return useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) => fetchEvents({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrevPage ? firstPage.prevPage : undefined;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
  });
};
