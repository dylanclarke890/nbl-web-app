import axios from "axios";
import { setAuthHeaders, setJWT } from "../helpers/jwt";
import ILoginData from "../interfaces/ILoginData";
import IRegisterData from "../interfaces/IRegisterData";
import IUser from "../interfaces/IUser";

const APIENDPOINT = "/api/auth/";

axios.interceptors.request.use(setAuthHeaders, (error) =>
  Promise.reject(error)
);

export async function register(data: IRegisterData): Promise<IUser> {
  const res = await axios.post(`${APIENDPOINT}register`, data);
  return res.data;
}

export async function login(data: ILoginData): Promise<boolean> {
  const res = await axios.post(`${APIENDPOINT}login`, data);
  if (res.data) {
    setJWT(res.data);
    console.log("JWT set");
    return true;
  }
  return false;
}
