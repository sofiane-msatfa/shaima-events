import { createSampleUsers, createSampleEvents, clearDatabase } from "./factory.js";
import { connectToMongoDb } from "./database.js";
import { fileURLToPath } from "node:url";
import process from "node:process";

async function seed() {
  const { env } = await import("@/env.js");
  console.log("Seeding database...");
  await connectToMongoDb(env.MONGODB_URI);
  await clearDatabase();
  await createSampleUsers(2);
  await createSampleEvents(500);
  console.log("Database seeded successfully!");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed()
    .catch((error) => {
      console.error("Error while seeding database", error);
      process.exit(1);
    })
    .finally(() => {
      process.exit(0);
    });
}
