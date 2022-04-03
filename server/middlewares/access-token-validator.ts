require("dotenv").config();

import _getKeyValue from "lodash/get";
import { verifyJwtToken } from "../helpers/jwt";

export async function accessTokenValidator(req: any, res: any, next: any) {
  try {
    let token = _getKeyValue(req.headers, "authorization", null);
    if (!token) throw Error("Not Authorized");
    token = token.split(" ")[1];
    req.payload = await verifyJwtToken({
      token,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    next();
  } catch (error) {
    next(error);
  }
}
