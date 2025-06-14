
import * as core from "express-serve-static-core";
import { Request, RequestHandler, Response } from "express";

interface Pagination {
  take: number;
  skip: number;
  search?: string;
}

export interface HandleRequestProps<T> {
  data: T;
  pagination: Pagination;
  request: Request;
  response: Response;
  headers: Request["headers"];
}

export type HandleRequest = (
  data: HandleRequestProps<unknown>
) => Promise<unknown>;

type Action = (path: string, handle: HandleRequest) => any;

interface IRouter {
  post: Action;
  get: Action;
  delete: Action;
  put: Action;
}

function getInputData(request: Request): object {
  let inputData = {};
  if (typeof request.body === "object") {
    inputData = { ...inputData, ...request.body };
  }
  return { ...inputData, ...request.params, ...request.query };
}

function getPagination(inputData: any): Pagination {
  const pageIndex = Number(inputData.pageIndex) || 0;
  const pageSize = Number(inputData.pageSize) || 0;

  return {
    skip: pageSize * pageIndex,
    take: pageSize,
    search: inputData.search,
  };
}

function adaptRequest(handle: HandleRequest) {
  return async (request: Request, response: Response) => {
    const inputData = getInputData(request);


    const returnedData = await handle({
      data: inputData,
      pagination: getPagination(inputData),
      request,
      response,
      headers: request.headers,
    });

    if (response.headersSent) return;

    if (!returnedData) return response.status(204).send();
    if (typeof returnedData === "object") return response.json(returnedData);
    if (["string", "number"].includes(typeof returnedData)) {
      return response.send(returnedData);
    }
  };
}

class Router implements IRouter {
  private readonly app: core.Express;

  constructor(app: core.Express) {
    this.app = app;
  }

  use(path: string, middleware: any) {
    this.app.use(path, middleware);
  }

  get(path: string, handle: HandleRequest, middlewares?: RequestHandler[]) {
    if (middlewares) {
      this.app.get(path, middlewares, adaptRequest(handle));
    } else {
      this.app.get(path, adaptRequest(handle));
    }
  }

  post(path: string, handle: HandleRequest, middlewares?: RequestHandler[]) {
    if (middlewares) {
      this.app.post(path, middlewares, adaptRequest(handle));
    } else {
      this.app.post(path, adaptRequest(handle));
    }
  }

  delete(path: string, handle: HandleRequest, middlewares?: RequestHandler[]) {
    if (middlewares) {
      this.app.delete(path, middlewares, adaptRequest(handle));
    } else {
      this.app.delete(path, adaptRequest(handle));
    }
  }

  patch(path: string, handle: HandleRequest, middlewares?: RequestHandler[]) {
    if (middlewares) {
      this.app.patch(path, middlewares, adaptRequest(handle));
    } else {
      this.app.patch(path, adaptRequest(handle));
    }
  }

  put(path: string, handle: HandleRequest, middlewares?: RequestHandler[]) {
    if (middlewares) {
      this.app.put(path, middlewares, adaptRequest(handle));
    } else {
      this.app.put(path, adaptRequest(handle));
    }
  }
}

export default Router;
