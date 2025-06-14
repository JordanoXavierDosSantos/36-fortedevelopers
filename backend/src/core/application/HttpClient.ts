export default interface HttpClient {
  get: (path: string, params?: any) => Promise<any>;
  put: (path: string, body: any) => Promise<any>;
  patch: (path: string, body: any) => Promise<any>;
  post: (path: string, body: any) => Promise<any>;
  delete: (path: string) => Promise<any>;
}
