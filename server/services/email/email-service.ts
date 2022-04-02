require("dotenv").config();

import ICustomerQuery from "../../interfaces/ICustomerQuery";
import { sendOne } from "./mailjet-service";

const adminEmail = process.env.adminEmail!;

export async function sendCustomerQuery(req: any) {
  const result = await sendOne({
    from: { name: "NBL Notification", email: "nblbytanya@gmail.com" },
    to: [{ name: "Admin", email: adminEmail }],
    subject: "You have a new message from a customer.",
    textContent: createText(req.body.contactDetails),
    HTMLContent: createHTML(req.body.contactDetails),
    customId: "CustomerQueryNotification",
  });
  return result;
}

function createText(query: ICustomerQuery) {
  return `
    Name: ${query.name}\n
    Email: ${query.email}\n
    Phone: ${query.phone}\n
    Message: ${query.message}\n
  `;
}

function createHTML(query: ICustomerQuery) {
  return `
    <div style='text-align:center;'>
      <p>Name: ${query.name}</p>
      <p>Email: ${query.email}</p>
      <p>Phone: ${query.phone}</p>
      <p>Message:</p>
      <p>"${query.message}"</p>
    </div>
  `;
}
