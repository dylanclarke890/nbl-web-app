import axios from "axios";
import ILoginData from "../interfaces/ILoginData";
import IRegisterData from "../interfaces/IRegisterData";
import IUser from "../interfaces/IUser";

const APIENDPOINT = "/api/auth/";

export async function register(data: IRegisterData): Promise<IUser> {
  const res = await axios.post(`${APIENDPOINT}register`, data);
  return res.data;
}

export async function login(data: ILoginData): Promise<IUser> {
  const res = await axios.post(`${APIENDPOINT}login`, data);
  return res.data;
}
