import { ICustomErrorResponse } from "./CustomError";

export default class InternalRequestError extends Error {
  public statusCode;
  public message;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  public generateApiResponse(): ICustomErrorResponse {
    return {
      statusCode: this.statusCode,
      body: {
        message: this.getErrorMessage(),
      },
    };
  }

  private getErrorMessage(): string {
    if (this.message.includes("ECONNREFUSED")) {
      return "network.error.refused";
    }
    if (this.message.includes("EHOSTUNREACH")) {
      return "network.error.unreachable";
    }
    if (this.message.includes("timeout")) {
      return "network.error.timeout";
    }
    return "internal.device.configuration.error";
  }
}
