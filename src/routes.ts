import express, { Request, Response } from 'express';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router();

routes.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body;  

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();
  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodeMailerMailAdapter);

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return response.status(201).send();
})