import mongoose from "mongoose";
import { ResultAsync } from "neverthrow";

export const connectToMongoDb = ResultAsync.fromThrowable(mongoose.connect, (error) => error);