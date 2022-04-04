import { AxiosRequestConfig as Config } from "axios";

export function setJWT(token: any) {
  localStorage.setItem("JWT", JSON.stringify(token));
}

export function getJWT() {
  return localStorage.getItem("JWT");
}

export function setAuthHeaders(config: Config<any>): Config<any> {
  console.log("Intercepted");
  const token = getJWT();
  config.headers!.authorization = `Bearer ${token}`;
  return config;
}
