import axios from "axios";

import IContactRequest from "../interfaces/IContactRequest";

const APIENDPOINT = "/api/contact";

export async function sendContactRequest(req: IContactRequest) {
  let res: boolean = false;
  res = await axios.post(APIENDPOINT, { contactDetails: req });
  return res;
}
