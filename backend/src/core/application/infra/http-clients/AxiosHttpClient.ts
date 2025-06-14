import axios from "axios";
import https from "https";
import tls from "tls";
import InternalRequestError from "../../../../errors/InternalRequestError";
import HttpClient from "../../HttpClient";
tls.DEFAULT_ECDH_CURVE = "auto";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpsAgent = new https.Agent({
  requestCert: false,
  rejectUnauthorized: false,
  keepAlive: true,
  maxSockets: 5,
});

function generateFreshAgent() {
  return new https.Agent({
    requestCert: false,
    rejectUnauthorized: false,
  });
}

const TIMEOUT = 60000;

export default class AxiosHttpClient implements HttpClient {
  private readonly client: any;

  constructor(
    baseUrl: string,
    username: string,
    password: string,
    extraConfig: any = {}
  ) {
    this.client = axios.create({
      baseURL: baseUrl,
      httpsAgent: extraConfig?.freshAgent ? generateFreshAgent() : httpsAgent,
      auth: {
        username,
        password,
      },
      ...extraConfig,
      timeout: extraConfig?.timeout ? extraConfig.timeout : TIMEOUT,
    });
  }

  private catchRequestError(error: unknown) {
    if (!axios.isAxiosError(error)) throw error;
    throw new InternalRequestError(500, error.message);
  }

  public async get(url: string, options?: any) {
    try {
      const response = await this.client.get(url, options || {});
      return response.data;
    } catch (error) {
      this.catchRequestError(error);
    }
  }

  public async put(url: string, data: any) {
    try {
      const response = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      this.catchRequestError(error);
    }
  }

  public async patch(url: string, data: any) {
    try {
      const response = await this.client.patch(url, data);
      return response.data;
    } catch (error) {
      this.catchRequestError(error);
    }
  }

  public async post(url: string, data: any) {
    try {
      const response = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      this.catchRequestError(error);
    }
  }

  public async delete(url: string) {
    try {
      const response = await this.client.delete(url);
      return response.data;
    } catch (error) {
      this.catchRequestError(error);
    }
  }
}
