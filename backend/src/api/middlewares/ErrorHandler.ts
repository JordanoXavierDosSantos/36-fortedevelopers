import CustomError from "../../errors/CustomError";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import InternalRequestError from "../../errors/InternalRequestError";

const DEFAULT_ERROR_HTTP_STATUS_CODE = 500;
const DEFAULT_ERROR_MESSAGE = "Erro no servidor";

export default function ErrorHandler(
  error: Error | any,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error?.message) error.message = error.message.split("\n").join("   ");
  console.error(error);

  if (error instanceof CustomError) {
    const errorResponse = error.generateApiResponse();
    response.status(errorResponse.statusCode);
    response.json(errorResponse.body);
  } else if (error instanceof InternalRequestError) {
    const errorResponse = error.generateApiResponse();
    response.status(errorResponse.statusCode);
    response.json(errorResponse.body);
  } else if (axios.isAxiosError(error)) {
    response.status(DEFAULT_ERROR_HTTP_STATUS_CODE);
  } else {
    response.status(DEFAULT_ERROR_HTTP_STATUS_CODE);
    response.json({ message: DEFAULT_ERROR_MESSAGE, error });
  }
}
