import React from 'react';

import { ArrowLeft } from 'phosphor-react';

import { CloseButton } from '../../Button/Close';
import { ScreenshotButton } from '../../Button/Screenshot';

import { FeedbackType, feedbackTypes } from '../WidgetForm';
import { api } from '../../../services/api';
import { Loading } from '../../Loading';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onResetFeedback: () => void;
};

export const FeedbackContentStep = ({
  feedbackType,
  onFeedbackSent,
  onResetFeedback,
}: FeedbackContentStepProps) => {
  const [comment, setComment] = React.useState('');
  const [isSendingFeedback, setIsSendingFeedback] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState<string | null>(null);

  const onSubmitFeedback = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSendingFeedback(true);

      await api.post('/feedbacks', {
        comment,
        screenshot,
        type: feedbackType,
      });

      onFeedbackSent();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendingFeedback(false);
    }
  };

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft
            weight="bold"
            className="w-4 h-4"
            onClick={() => onResetFeedback()}
          />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            alt={feedbackTypes[feedbackType].image.alt}
            src={feedbackTypes[feedbackType].image.source}
          />
          {feedbackTypes[feedbackType].title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={onSubmitFeedback}>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          placeholder="Conte com detalhes o que está acontecendo..."
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshot={setScreenshot}
          />

          <button
            type="submit"
            disabled={!comment.length || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  );
};
