export default interface IEmailRequest {
  from: IRecipient;
  to: IRecipient[];
  subject: string;
  textContent: string;
  HTMLContent: string;
  customId: string;
  reference?: string;
}

interface IRecipient {
  email: string;
  name: string;
}