import "../services/LoadEnvironment";
import app from "./app";
import { getEnvironmentVariableAsNumber } from "../services/Environment";

const port = getEnvironmentVariableAsNumber("PORT") || 8080;

async function startServer() {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server started on port ${port}`);
  });
}

void startServer();
