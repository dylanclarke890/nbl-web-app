import MJ from "node-mailjet";
require("dotenv").config();

import IEmailRequest from "../interfaces/IEmailRequest";
import IMailJetRequest from "../interfaces/IMailJetRequest";

const apiKey = process.env.apiKey;
const apiSecret = process.env.apiSecret;
const mailjet = MJ.connect(apiKey, apiSecret);

export function sendOne(emailRequest: IEmailRequest) {
  const request = mailjet
    .post("send", { version: "v3.1" })
    .request(createMailJetRequest(emailRequest));
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createMailJetRequest(req: IEmailRequest): IMailJetRequest {
  return {
    Messages: [
      {
        From: {
          Email: req.from.email,
          Name: req.from.name,
        },
        To: [
          {
            Email: req.from.email,
            Name: req.from.name,
          },
        ],
        Subject: req.subject,
        TextPart: req.textPart,
        HTMLPart: req.HTMLPart,
        CustomID: req.customId,
      },
    ],
  };
}
