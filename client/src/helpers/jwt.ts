import { AxiosRequestConfig as Config } from "axios";

const JWTStorageName = "JWT";

export function setJWT(token: any) {
  localStorage.setItem(JWTStorageName, JSON.stringify(token));
}

export function getJWT() {
  let jwt = localStorage.getItem(JWTStorageName);
  if (jwt) {
    const parsed = parseJwt(jwt);
    const expirationTime = parsed.exp * 1000 - 60000; // refresh within 1 min to account for latency
    if (Date.now() >= expirationTime) {
      jwt = null;
      localStorage.removeItem(JWTStorageName);
    }
  }
  return jwt;
}

export function setAuthHeaders(config: Config<any>): Config<any> {
  const token = getJWT();
  if (token) config.headers!.authorization = `Bearer ${token}`;
  return config;
}

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
