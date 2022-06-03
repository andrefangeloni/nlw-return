import { SubmitFeedback } from '../services/submit-feedback';

const sendMailSpy = jest.fn();
const createFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedback(
  { sendMail: sendMailSpy },
  { create: createFeedbackSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64/askldnalkdna.jpg',
      }),
    ).resolves.not.toThrow();

    expect(sendMailSpy).toHaveBeenCalled();
    expect(createFeedbackSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64/askldnalkdna.jpg',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64/askldnalkdna.jpg',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot format', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg',
      }),
    ).rejects.toThrow();
  });
});
