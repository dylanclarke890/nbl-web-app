import { sendCustomerQuery } from "../services/email/email-service";

export async function customerQuery(req: any, res: any) {
  let result: boolean = false;
  try {
    result = await sendCustomerQuery(req.body.contactDetails);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}
