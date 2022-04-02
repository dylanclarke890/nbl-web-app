import IAppointment from "../../interfaces/IAppointment";
import ICustomerQuery from "../../interfaces/ICustomerQuery";
import { sendMany, sendOne } from "./mailjet-service";
import getRequestTemplate from "./template-service";

export async function sendCustomerQuery(contactDetails: ICustomerQuery) {
  const result = await sendOne(
    getRequestTemplate("customer-query", contactDetails)
  );
  return result;
}

export async function sendAppointmentConfirmation(appointment: IAppointment) {
  const adminEmail = getRequestTemplate("admin-confirmation", appointment);
  const customerEmail = getRequestTemplate(
    "customer-confirmation",
    appointment
  );

  const result = await sendMany([adminEmail, customerEmail]);
  return result;
}
