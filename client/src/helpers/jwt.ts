export function setJWT(token: any) {
  localStorage.setItem("JWT", JSON.stringify(token));
}

export function getJWT() {
  return localStorage.getItem("JWT");
}
