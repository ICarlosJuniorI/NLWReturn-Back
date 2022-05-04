import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7f752f9a5c64e",
    pass: "0d48f667c270e9"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    // Envia um novo email
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Carlos Junior <carlos-junior08@hotmail.com>',
      subject,
      html: body,
    })
  };
}