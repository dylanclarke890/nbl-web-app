require("dotenv").config();

import { addUser, getUser } from "./user-service";
import { hashPassword, checkHash } from "../helpers/password";
import { signJwtToken } from "../helpers/jwt";
import * as Validation from "../helpers/validation";
import IUserData from "../interfaces/IUserData";

export async function registerUser(req: any): Promise<IUserData> {
  const { name, email, password } = req.body;
  const hash = hashPassword(password);
  const newUser = { name, email, hash };
  const user = await addUser(newUser);
  return { id: user._id, name: user.name, email: user.email };
}

export async function loginUser(req: any): Promise<any> {
  const { email, password } = req.body;
  if (!Validation.validateEmail(email)) throw Error("Invalid email");
  const user = await getUser(email);
  if (!user) throw Error("User not found.");
  if (!checkHash(password, user.hash)) throw Error("Password does not match.");
  const token = await tokenHandler({
    id: user._id,
    name: user.name,
    email: user.email,
  });
  return token;
}

async function tokenHandler(user: IUserData) {
  try {
    const accessToken = await signJwtToken(user, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_EXPIRY,
    });
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
}
