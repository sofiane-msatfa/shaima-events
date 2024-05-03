import { Collection } from "@/domain/enum/collection.js";
import { Schema, SchemaTypes, model } from "mongoose";
import type { Types, Document } from "mongoose";

export interface UserDocument extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  deletedAt: Date | null;
  events?: Types.ObjectId[];
}

const userSchema = new Schema<UserDocument>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{ type: SchemaTypes.ObjectId, ref: Collection.Event }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const User = model<UserDocument>(Collection.User, userSchema);

export default User;
