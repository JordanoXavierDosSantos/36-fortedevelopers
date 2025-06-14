import dotenv from "dotenv";

if (!process.env.NODE_ENV) { throw new Error("Environment variable NODE_ENV is not set."); }

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: ".env",
  });
}
