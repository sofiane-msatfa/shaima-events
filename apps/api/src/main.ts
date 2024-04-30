import { createExpressApp } from "./presentation/http/app.js";

async function runServer() {
  const { env } = await import("./env.js");
  const app = await createExpressApp();

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
