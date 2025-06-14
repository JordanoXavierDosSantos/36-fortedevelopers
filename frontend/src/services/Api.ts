import axios from "axios";

function getApiUrl() {
  return "http://localhost:8080";
}

const Api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export function getPublicAssetUrl(fileName: string) {
  return new URL(`${Api.defaults.baseURL}/public/${fileName}`).href;
}

export function openInNewPage(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default Api;
