import { connectToMongoDb } from "./infrastructure/database/mongo/database.js";
import { createExpressApp } from "./presentation/http/app.js";

async function runServer() {
  const { env } = await import("./env.js");
  const app = await createExpressApp();

  const connectionResult = await connectToMongoDb(env.MONGODB_URI);

  if (connectionResult.isErr()) {
    console.error(connectionResult.error);
    return process.exit(1);
  }

  app
    .listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

runServer();
