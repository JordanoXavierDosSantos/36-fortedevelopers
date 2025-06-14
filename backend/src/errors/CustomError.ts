export interface ICustomErrorResponse {
  statusCode: number;
  body: object;
}

export default abstract class CustomError extends Error {
  public abstract generateApiResponse(): ICustomErrorResponse;
}
