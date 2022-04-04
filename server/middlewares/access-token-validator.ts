require("dotenv").config();

import { verifyJwtToken } from "../helpers/jwt";

export async function accessTokenValidator(req: any, res: any, next: any) {
  try {
    let token = null;
    token = req.headers["authorization"];
    if (!token) throw Error("Not Authorized");
    token = JSON.parse(token.split(" ")[1]);
    req.payload = await verifyJwtToken({
      token,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    next();
  } catch (error) {
    next(error);
  }
}
