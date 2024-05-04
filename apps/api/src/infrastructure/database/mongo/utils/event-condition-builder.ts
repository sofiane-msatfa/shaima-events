import type { EventFilters } from "@common/dto/event-filters.js";
import type { FilterQuery } from "mongoose";
import type { EventDocument } from "../model/event.js";

type EventConditionBuilder = {
  [P in keyof EventFilters]?: (value: EventFilters[P]) => FilterQuery<EventDocument>;
};

const eventConditionBuilder: EventConditionBuilder = {
  name: (value) => ({ name: { $regex: value, $options: "i" } }),
  category: (value) => ({ category: value }),
  location: (value) => ({ location: value }),
  address: (value) => ({ address: { $regex: value, $options: "i" } }),
  startTime: (value) => ({ startTime: { $gte: value } }),
  endTime: (value) => ({ endTime: { $lte: value } }),
  author: (value) => ({ author: value }),
  participants: (value) => ({ participants: { $in: value } }),
  tags: (value) => ({ tags: { $in: value } }),
  capacityMin: (value) => ({ capacity: { $gte: value } }),
  capacityMax: (value) => ({ capacity: { $lte: value } }),
};

export function buildEventQueryFilters(
  filters: Partial<EventFilters> = {},
): FilterQuery<EventDocument> {
  const query: FilterQuery<EventDocument> = {};

  for (const [key, buildCondition] of Object.entries(eventConditionBuilder)) {
    const filterKey = key as keyof EventFilters;
    const filterValue = filters?.[filterKey];

    if (filterValue === undefined) continue;
    // @ts-expect-error - infers as never for some reason
    Object.assign(query, buildCondition(filterValue));
  }

  return query;
}

export function buildNonExclusiveQueryFilters(
  filters: Partial<EventFilters> = {},
  nonExclusiveKeys: Array<keyof EventFilters> = [],
): FilterQuery<EventDocument> {
  const query: FilterQuery<EventDocument> = {};
  const nonExclusiveCondition: FilterQuery<EventDocument>[] = [];

  for (const [key, buildCondition] of Object.entries(eventConditionBuilder)) {
    const filterKey = key as keyof EventFilters;
    const filterValue = filters?.[filterKey];

    if (filterValue === undefined) continue;
    // @ts-expect-error - infers as never for some reason
    const condition = buildCondition(filterValue);

    if (nonExclusiveKeys.includes(filterKey)) {
      nonExclusiveCondition.push(condition);
    } else {
      Object.assign(query, condition);
    }
  }

  if (nonExclusiveCondition.length > 0) {
    query.$or = nonExclusiveCondition;
  }

  return query;
}
