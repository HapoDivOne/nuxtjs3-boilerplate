// /constants/endpoints.ts
import axios from "axios";

export const getApiBase = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.apiBase ?? "http://localhost:8000/api/v1";
};

export function axiosBase() {
  const token = useCookie("token");
  const axiosBase = axios.create({
    baseURL: getApiBase(),
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  axiosBase.interceptors.request.use(function (config: any) {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.value}`,
      };
    }
    return config;
  });
  return axiosBase;
}

export function createEndpoint(
  endpoint: string,
  params?: Record<string, string | number>,
): string {
  const baseURL = getApiBase();
  let url = `${baseURL}${endpoint}`;
  if (params) {
    Object.keys(params).forEach((key) => {
      url = url.replace(`:${key}`, encodeURIComponent(params[key].toString()));
    });
  }
  return url;
}

export function methodGet(url: string, params?: any) {
  return axiosBase().get(createEndpoint(url), { params });
}

export function methodPost(url: string, body?: any) {
  return axiosBase().post(createEndpoint(url), body);
}

export function methodPut(url: string, body?: any) {
  return axiosBase().put(createEndpoint(url), body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function methodDelete(url: string) {
  return axiosBase().delete(createEndpoint(url));
}

// API Endpoint with param
export const LOGIN = "/login"; // POST
export const LOGOUT = "/logout"; // POST
export const SEND_RESET_PASSWORD_MAIL = "/send-email"; // POST
export const RESET_PASSWORD = "/reset-password"; // POST
export const CHECK_TOKEN_SEND_EMAIL = "/check-token"; // get
export const CHANGE_PASSWORD = "/change-password"; // get
