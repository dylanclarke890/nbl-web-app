import MJ from "node-mailjet";
require("dotenv").config();

import IEmailRequest from "../../interfaces/IEmail";
import IMailJetRequest from "../../interfaces/IMailJetRequest";

const apiKey = process.env.apiKey!;
const apiSecret = process.env.apiSecret!;
const mailjet = MJ.connect(apiKey, apiSecret);

export async function sendOne(emailRequest: IEmailRequest) {
  let success = false;
  const request = mailjet
    .post("send", { version: "v3.1" })
    .request(createMailJetRequest(emailRequest));
  await request
    .then((res) => {
      console.log(res.body);
      success = true;
    })
    .catch((err) => {
      console.error(err);
      success = false;
    });
  return success;
}

export async function sendMany(emailRequests: IEmailRequest[]) {
  let success = false;
  const request = mailjet
    .post("send", { version: "v3.1" })
    .request(createMailJetRequests(emailRequests));
  await request
    .then((res) => {
      console.log(res.body);
      success = true;
    })
    .catch((err) => {
      console.error(err);
      success = false;
    });
  return success;
}

function createMailJetRequest(req: IEmailRequest): IMailJetRequest {
  return {
    Messages: [
      {
        From: {
          Email: req.from.email,
          Name: req.from.name,
        },
        To: req.to.map((val) => {
          return { Email: val.email, Name: val.name };
        }),
        Subject: req.subject,
        TextPart: req.textContent,
        HTMLPart: req.HTMLContent,
        CustomID: req.customId,
      },
    ],
  };
}

function createMailJetRequests(requests: IEmailRequest[]): IMailJetRequest {
  return {
    Messages: requests.map((req) => {
      return {
        From: {
          Email: req.from.email,
          Name: req.from.name,
        },
        To: req.to.map((val) => {
          return { Email: val.email, Name: val.name };
        }),
        Subject: req.subject,
        TextPart: req.textContent,
        HTMLPart: req.HTMLContent,
        CustomID: req.customId,
      };
    }),
  };
}
