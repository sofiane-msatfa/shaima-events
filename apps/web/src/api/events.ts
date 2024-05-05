import type { Event } from "@common/dto/event";
import type { PaginationResponse } from "@common/dto/pagination-response";
import type { EventFilters } from "@common/dto/event-filters";

import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export type PartialEventFilters = Partial<EventFilters>;

export const fetchEvents = async (eventFilters: PartialEventFilters) => {
  const response = await api.get<PaginationResponse<Event>>("/events", {
    params: eventFilters,
  });

  return response.data;
};

export const useGetEvents = (eventFilters?: PartialEventFilters) => {
  const { page, ...filters } = eventFilters || {};

  return useInfiniteQuery({
    queryKey: ["events", filters],
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

export const fetchMyEvents = async (eventFilters: PartialEventFilters) => {
  const response = await api.get<PaginationResponse<Event>>("/events/me", {
    params: eventFilters,
  });
  return response.data;
};

export const useGetMyEvents = (eventFilters?: PartialEventFilters) => {
  const { page, ...filters } = eventFilters || {};
  return useInfiniteQuery({
    queryKey: ["events", "me", filters],
    queryFn: ({ pageParam }) => fetchMyEvents({ ...filters, page: pageParam }),
    initialPageParam: 1,

    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrevPage ? firstPage.prevPage : undefined;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
  });
};

export const joinOrLeaveEvent = async (id: string) => {
  const response = await api.patch<Event>(`/events/${id}/participate`);
  return response.data;
};
