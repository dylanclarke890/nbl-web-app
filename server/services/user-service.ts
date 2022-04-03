let mongoose = require("mongoose");

import UserModel from "../models/user";
import IUserInternal from "../interfaces/IUserInternal";

export async function getUser(email: string) {
  return await UserModel.findOne({ email });
}

export async function addUser({ name, email, hash }: IUserInternal) {
  const user = new UserModel({ name, email, hash });
  await user.save();
  return user;
}
