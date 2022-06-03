import express from 'express';
import { NodemailerAdapter } from './adapters/nodemailer';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks';
import { SubmitFeedback } from './services/submit-feedback';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerAdapter();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const submitFeedback = new SubmitFeedback(
    nodemailerMailAdapter,
    prismaFeedbacksRepository,
  );

  await submitFeedback.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
