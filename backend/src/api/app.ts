import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import ErrorHandler from "./middlewares/ErrorHandler";
import Router from "./Router";
import testRoute from "../routes/testRoute";

const app = express();

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.status(req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      "-",
      tokens.res(req, res, "content-length"),
      `${tokens["response-time"](req, res) ?? ""}ms`,
    ].join(" ");
  })
);

const privateCors = {
  maxAge: 7200,
  origin: (origin: string, callback: CallableFunction) => {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(privateCors));

const router = new Router(app);

router.get("/test", testRoute);

app.use(ErrorHandler); // Error handlers must be the last middleware

export default app;
