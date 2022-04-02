require("dotenv").config();

import ICustomerQuery from "../../interfaces/ICustomerQuery";
import { sendOne } from "./mailjet-service";

export async function sendCustomerQuery(req: any) {
  const adminEmail = process.env.adminEmail;
  let result = await sendOne({
    from: { name: "NBL Notification", email: "notifications@nbl.co.uk" },
    to: [{ name: "Admin", email: adminEmail }],
    subject: "You have a message from a customer.",
    textPart: createText(req.contactDetails),
    HTMLPart: createHTML(req.contactDetails),
    customId: "QueryNotification",
  });
  return result;
}

function createText(query: ICustomerQuery) {
  return `
    You have a message from a customer.
    name: ${query.name}
    email: ${query.email}
    phone: ${query.phone}
    message: ${query.message}
  `;
}

function createHTML(query: ICustomerQuery) {
  return `
    <div style='text-align:center;'>
      <h2>You have a message from a customer.</h2>
      <p>name: ${query.name}</p>
      <p>email: ${query.email}</p>
      <p>phone: ${query.phone}</p>
      <p>message: ${query.message}</p>
    </div>
  `;
}
