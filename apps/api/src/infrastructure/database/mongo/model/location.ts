import type { Document } from "mongoose";
import { Schema, model } from "mongoose";
import { Collection } from "@/domain/enum/collection.js";

interface LocationDocument extends Document {
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
}

const locationSchema = new Schema<LocationDocument>({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const Location = model<LocationDocument>(Collection.Location, locationSchema);

export default Location;
