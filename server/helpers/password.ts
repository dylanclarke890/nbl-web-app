import bcrypt from "bcryptjs";

export function checkHash(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

function getHash(password: string, salt: string) {
  const generated = bcrypt.hashSync(password, salt);
  if (!checkHash(password, generated)) throw Error("Issue with hash.");
  return generated;
}

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = getHash(password, salt);
  return hashedPassword;
}