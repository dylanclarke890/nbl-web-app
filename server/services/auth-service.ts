let mongoose = require("mongoose");

import bcrypt from "bcryptjs";

import IUserData from "../interfaces/IUserData";
import UserModel from "../models/user";

export async function register(req: any): Promise<IUserData> {
  const hash = hashPassword(req.body.password);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    hash,
  });

  await user.save();
  return { id: user._id, name: user.name, email: user.email };
}

export async function login(req: any): Promise<IUserData> {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) throw Error("user not found.");
  if (!checkHash(req.body.password, user.hash)) {
    throw Error("Password does not match.");
  }
  return { id: user._id, name: user.name, email: user.email };
}

function checkHash(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

function getHash(password: string, salt: string) {
  const generated = bcrypt.hashSync(password, salt);
  if (!checkHash(password, generated)) throw Error("Issue with hash.");
  return generated;
}

function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = getHash(password, salt);
  return hashedPassword;
}
