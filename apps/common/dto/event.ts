import type { EventCategory } from "../enum/event-category.js";

export interface Event {
  id: string;
  name: string;
  description?: string;
  category: EventCategory;
  location: string;
  address: string;
  startTime: Date;
  endTime: Date;
  author: string;
  participants: string[];
  tags: string[];
  medias: string[];
  capacity: number;
  artists?: string[];
  illustration: string;
}
