import { AxiosRequestConfig as Config } from "axios";

const JWTStorageName = "JWT";

export function setJWT(token: any) {
  localStorage.setItem(JWTStorageName, JSON.stringify(token));
}

export function getJWT() {
  return localStorage.getItem(JWTStorageName);
}

export function setAuthHeaders(config: Config<any>): Config<any> {
  const token = getJWT();
  if (token) config.headers!.authorization = `Bearer ${token}`;
  return config;
}
