import IUserData from "../interfaces/IUserData";
import { loginUser, registerUser } from "../services/auth-service";

export async function login(req: any, res: any) {
  let result: any;
  try {
    result = await loginUser(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function register(req: any, res: any) {
  let result: IUserData;
  try {
    result = await registerUser(req);
  } catch (err) {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}
