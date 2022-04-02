export default interface IEmailRequest {
  from: IRecipient;
  to: IRecipient[];
  subject: string;
  textPart: string;
  HTMLPart: string;
  customId: string;
}

interface IRecipient {
  email: string;
  name: string;
}