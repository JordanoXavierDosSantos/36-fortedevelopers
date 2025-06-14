import CustomError, { ICustomErrorResponse } from "./CustomError";

const STATUS_CODE = 403;
const MESSAGE = "Usuário não autenticado";

export default class AuthorizationError extends CustomError {
  public displayableMessage: string;

  constructor(message: string) {
    super(message);
  }

  public generateApiResponse(): ICustomErrorResponse {
    return {
      statusCode: STATUS_CODE,
      body: {
        message: MESSAGE,
      },
    };
  }
}
