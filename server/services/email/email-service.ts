require("dotenv").config();

import ICustomerQuery from "../../interfaces/ICustomerQuery";
import { sendOne } from "./mailjet-service";

export async function sendCustomerQuery(req: any) {
  const adminEmail = process.env.adminEmail!;
  let result = await sendOne({
    from: { name: "NBL Notification", email: "nblbytanya@gmail.com" },
    to: [{ name: "Admin", email: adminEmail }],
    subject: "You have a new message from a customer.",
    textContent: createText(req.body.contactDetails),
    HTMLContent: createHTML(req.body.contactDetails),
    customId: "QueryNotification",
  });
  return result;
}

function createText(query: ICustomerQuery) {
  return `
    You have a new message from a customer.\n
    name: ${query.name}\n
    email: ${query.email}\n
    phone: ${query.phone}\n
    message: ${query.message}\n
  `;
}

function createHTML(query: ICustomerQuery) {
  return `
    <div style='text-align:center;'>
      <h2>You have a new message from a customer.</h2>
      <p>name: ${query.name}</p>
      <p>email: ${query.email}</p>
      <p>phone: ${query.phone}</p>
      <p>message: ${query.message}</p>
    </div>
  `;
}
