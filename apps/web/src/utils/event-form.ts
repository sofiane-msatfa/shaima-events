import type { Event } from "@common/dto/event";
import type { EventCreateRequest } from "@common/dto/event-create-request";
import type { Feature } from "@common/dto/adresse-gouv-response";

function isEventCreateRequest(event: Event | EventCreateRequest): event is EventCreateRequest {
  return (event as EventCreateRequest).adresseGouv !== undefined;
}

export function buildAdresseGouvFeature(event: Event | EventCreateRequest): Feature {
  const coordinates = event.location?.split(",").map(Number) ?? [0, 0];

  return {
    properties: { label: event.address },
    geometry: { coordinates },
  } as Feature;
}

/** Permet de linéariser les données de création et de mise à jour d'event */
export function buildEventFormValues(event: Event | EventCreateRequest): EventCreateRequest {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const adresseGouv = isEventCreateRequest(event)
    ? event.adresseGouv
    : buildAdresseGouvFeature(event);
  const address = adresseGouv.properties.label;
  const location = adresseGouv.geometry.coordinates.join(",");

  return {
    ...event,
    startTime,
    endTime,
    adresseGouv,
    address,
    location,
  };
}
