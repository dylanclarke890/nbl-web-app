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
  let isAMatch = false;
  bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
    if (!isMatch || err) {
      console.log(hashedPassword + " is not encryption of " + password);
    }
    isAMatch = isMatch && !err;
    console.log("Encrypted password is: ", password);
    console.log("Decrypted password is: ", hashedPassword);
  });
  return isAMatch;
}

function getHash(password: string, salt: string) {
  let generated = "";
  bcrypt.hash(password, salt, (err, hash) => {
    const errMsg = "Error while hashing.";
    if (err) throw Error(errMsg);
    if (!checkHash(password, hash)) throw Error(errMsg);
    generated = hash;
  });

  return generated;
}

function hashPassword(password: string) {
  let hashedPassword = "";
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) throw Error("Error while generating salt.");
    hashedPassword = getHash(password, Salt);
  });

  return hashedPassword;
}
