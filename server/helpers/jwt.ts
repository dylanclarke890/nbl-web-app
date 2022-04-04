import jwt from "jsonwebtoken";

export function signJwtToken(
  data: string | object | Buffer,
  { secret, expiresIn }: any
) {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn,
    };
    jwt.sign(data, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

export function verifyJwtToken({ token, secret }: { token: any; secret: any }) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, payload: any) => {
      if (err) {
        const message =
          err.name === "TokenExpiredError" ? err.message : "Unauthorized";
        return reject(message);
      }
      resolve(payload);
    });
  });
}
