import axios from "axios";

const APIENDPOINT = "/api/dashboard";

export async function getDashboard() {
  let res: any;
  res = await axios.get(APIENDPOINT);
  return res;
}
