export interface AdresseGouvResponse {
  type: string;
  version: string;
  features: Feature[];
  attribution: string;
  licence: string;
  query: string;
  filters: Filters;
  limit: number;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Properties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  name: string;
  postcode: string | undefined;
  citycode: string;
  x: number;
  y: number;
  city: string;
  district: string | undefined;
  oldcity: string | undefined;
  oldcitycode: string | undefined;
  context: string;
  type: string;
  importance: number;
  street: string;
}

export interface Filters {
  type: string;
}
