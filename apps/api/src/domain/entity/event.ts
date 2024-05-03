import type { EventCategory } from "../enum/event-category.js";

export interface Event {
  name: string;
  description?: string;
  category: EventCategory;
  location: string;
  startTime: Date;
  endTime: Date;
  author: string;
  participants: string[];
  tags: string[];
  medias: string[];
  capacity: number;
  artists?: string[];
}
