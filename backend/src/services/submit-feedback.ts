import { MailAdapter } from '../adapters/mail-adapter';

import { FeedbacksRepository } from '../repositories/feedbacks';

export interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private mailAdapter: MailAdapter,
    private feedbacksRepository: FeedbacksRepository,
  ) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('type-is-required');
    }

    if (!comment) {
      throw new Error('comment-is-required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('screenshot-must-be-base64');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
