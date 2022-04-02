export default interface IMailJetRequest {
  Messages: IMessage[];
}

interface IMessage {
  From: IRecipient;
  To: IRecipient[];
  Subject: string;
  TextPart: string;
  HTMLPart: string;
  CustomID: string;
}

interface IRecipient {
  Email: string;
  Name: string;
}
