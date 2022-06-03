import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '8df10a4d9d0ccc',
    pass: 'ef0c5ae7ba60b5',
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'André Angeloni <andrefangeloni@gmail.com>',
      subject,
      html: body,
    });
  }
}
