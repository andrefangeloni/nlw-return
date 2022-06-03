import express from 'express';
import nodemailer from 'nodemailer';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks';
import { SubmitFeedback } from './services/submit-feedback';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '8df10a4d9d0ccc',
    pass: 'ef0c5ae7ba60b5',
  },
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedback = new SubmitFeedback(prismaFeedbacksRepository);

  await submitFeedback.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'André Angeloni <andrefangeloni@gmail.com>',
  //   subject: 'Novo Feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n'),
  // });

  return res.status(201).send();
});
