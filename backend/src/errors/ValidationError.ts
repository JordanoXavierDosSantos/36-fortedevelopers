import { ValidationErrorItem } from "joi";
import CustomError, { ICustomErrorResponse } from "./CustomError";

export default class ValidationError extends CustomError {
  public static ERROR_MESSAGE = "Input data validation";
  private readonly errors: ValidationErrorItem[];

  constructor(errors: ValidationErrorItem[]) {
    super(ValidationError.ERROR_MESSAGE);
    this.errors = errors;
  }

  public generateApiResponse(): ICustomErrorResponse {
    return {
      statusCode: 400,
      body: {
        message: "Dados inválidos",
        errors: this.errors.map((error) => ({
          message: error.message,
          field: error?.context?.key,
        })),
      },
    };
  }
}
