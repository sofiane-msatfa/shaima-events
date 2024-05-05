import type { QueryClient } from "@tanstack/react-query";
import type { Event } from "@common/dto/event";
import type { PaginationResponse } from "@common/dto/pagination-response";
import type { EventFilters } from "@common/dto/event-filters";
import type { EventUpdateRequest } from "@common/dto/event-update-request";
import type { EventCreateRequest } from "@common/dto/event-create-request";

import { api } from "@/api/client";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export type PartialEventFilters = Partial<EventFilters>;
export type PaginatedEvents = PaginationResponse<Event>;
export type EventUpdateRequestWithId = EventUpdateRequest & { id: string };

/* -------------------------------- fetchers -------------------------------- */

export const fetchEvents = async (eventFilters: PartialEventFilters) => {
  const response = await api.get<PaginatedEvents>("/events", {
    params: eventFilters,
  });

  return response.data;
};

export const fetchMyEvents = async (eventFilters: PartialEventFilters) => {
  const response = await api.get<PaginatedEvents>("/events/me", {
    params: eventFilters,
  });
  return response.data;
};

export const updateEvent = async (id: string, updateRequest: EventUpdateRequest) => {
  const response = await api.patch<Event>(`/events/${id}`, updateRequest);
  return response.data;
};

export const toggleEventParticipation = async (id: string) => {
  const response = await api.patch<Event>(`/events/${id}/participate`);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete<Event>(`/events/${id}`);
  return response.data;
};

/* ----------------------------------- get ---------------------------------- */

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

/* ---------------------------------- post ---------------------------------- */

export const usePostEvent = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (event: EventCreateRequest) => {
      return api.post<Event>("/events", event);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

/* ---------------------------------- patch --------------------------------- */

export const usePatchEvent = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (eventUpdateRequestWithId: EventUpdateRequestWithId) => {
      const { id, ...updateRequest } = eventUpdateRequestWithId;
      return updateEvent(id, updateRequest);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

/* --------------------------------- delete --------------------------------- */

export const useDeleteEvent = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => {
      return deleteEvent(id);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
