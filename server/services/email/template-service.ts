require("dotenv").config();

import IAppointment from "../../interfaces/IAppointment";
import ICustomerQuery from "../../interfaces/ICustomerQuery";
import IEmailRequest, { IRecipient } from "../../interfaces/IEmail";

const adminEmail = process.env.adminEmail!;
const businessEmail = process.env.businessEmail!;

export default function getRequestTemplate(
  id: string,
  content: any
): IEmailRequest {
  let subject: string = "";
  let text: string = "";
  let html: string = "";
  let from: IRecipient = { email: "", name: "" };
  let to: IRecipient[] = [];
  let customId = "";
  let reference: string | undefined = undefined;

  switch (id) {
    case "customer-query":
      subject = "You have a new message from a customer";
      text = getCustomerQueryText(content);
      html = getCustomerQueryHTML(content);
      from = { name: "NBL Notifications", email: businessEmail };
      to = [{ name: "Admin", email: adminEmail }];
      customId = "CustomerQueryNotification";
      break;
    case "customer-confirmation":
      subject = "Your appointment has been booked";
      text = getCustomerBookingText(content);
      html = getCustomerBookingHTML(content);
      from = { name: "NBL", email: businessEmail };
      to = [{ name: "Admin", email: adminEmail }];
      // to = [{ name: content.customer.name, email: content.customer.email }];
      reference = content._id;
      customId = "CustomerAppointmentConfirmation";
      break;
    case "admin-confirmation":
      subject = "Another customer ready for a treatment!";
      text = getAdminBookingText(content);
      html = getAdminBookingHTML(content);
      from = { name: "NBL Notifications", email: businessEmail };
      to = [{ name: "Admin", email: adminEmail }];
      reference = content._id;
      customId = "AdminAppointmentNotification";
      break;
    default:
      break;
  }

  return {
    from,
    to,
    subject,
    HTMLContent: html,
    textContent: text,
    customId,
    reference,
  };
}

function getCustomerQueryText(content: ICustomerQuery): string {
  return `
    Name: ${content.name}\n
    Email: ${content.email}\n
    Phone: ${content.phone}\n
    Message: ${content.message}\n
  `;
}

function getCustomerQueryHTML(content: ICustomerQuery): string {
  return `
    <div style='text-align:center;'>
      <p>Name: ${content.name}</p>
      <p>Email: ${content.email}</p>
      <p>Phone: ${content.phone}</p>
      <p>Message:</p>
      <p>"${content.message}"</p>
    </div>
  `;
}

function getCustomerBookingText(content: IAppointment): string {
  return `
    Hello ${content.person.name},\n
    Your appointment for ${content.treatment.type} has been confirmed.
    Please find the details below.\n
    Reference: ${content._id}\n
    Booking date: ${content.date.toDateString()} at: ${content.time.from} - ${content.time.to}\n
    Total Price: ${content.treatment.price} (GBP)\n
    Thanks,\n
    Tanya
  `;
}

function getCustomerBookingHTML(content: IAppointment): string {
  return `
  <div style='text-align:center;'>
    <p>Hello ${content.person.name},</p>
    <p>
      Your appointment for ${content.treatment.type} has been confirmed.
      Please find the details below.
    </p>
    <p>Reference: ${content._id}</p>
    <p>Booking date: ${content.date.toDateString()} at: ${content.time.from} - ${content.time.to}</p>
    <p>Total: ${content.treatment.price}</p>
    <p>Thanks,</p>
    <p>Tanya</p>
  </div>
`;
}

function getAdminBookingText(content: IAppointment): string {
  return `
  Details (ref: ${content._id}):\n
  For: ${content.person.name}\n
  Email: ${content.person.email}\n
  Phone: ${content.person.phone}\n
  Treatment: ${content.treatment.type} (${content.treatment.price})\n
  Date: ${content.date.toDateString()}\n
  Time: ${content.time.from} - ${content.time.to}\n
`;
}

function getAdminBookingHTML(content: IAppointment): string {
  return `
  <div style='text-align:center;'>
    <p>Details (ref: ${content._id}):</p>
    <p>For: ${content.person.name}</p>
    <p>Email: ${content.person.email}</p>
    <p>Phone: ${content.person.phone}</p>
    <p>Treatment: ${content.treatment.type} (${content.treatment.price})</p>
    <p>Date: ${content.date.toDateString()}</p>
    <p>Time: ${content.time.from} - ${content.time.to}</p>
  </div>
`;
}
