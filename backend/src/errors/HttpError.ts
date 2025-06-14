import CustomError, { ICustomErrorResponse } from "./CustomError";

export default class HttpError extends CustomError {
  public statusCode: number;
  public displayableMessage: string;

  constructor(statusCode: number, displayableMessage: string) {
    super(displayableMessage);
    this.statusCode = statusCode;
    this.displayableMessage = displayableMessage;
  }

  public generateApiResponse(): ICustomErrorResponse {
    return {
      statusCode: this.statusCode,
      body: {
        message: this.displayableMessage,
      },
    };
  }
}
