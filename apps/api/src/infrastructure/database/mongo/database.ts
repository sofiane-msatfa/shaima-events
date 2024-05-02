import mongoose from "mongoose";
const { env } = await import("../../../env.js");

export const database = mongoose.connect(env.MONGODB_URI, {
  dbName: 'shaima-events',
}).then(
    () => { 
        console.log('Connected to MongoDB');
        
    },
  ).catch((err: Error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    process.exit();
  })