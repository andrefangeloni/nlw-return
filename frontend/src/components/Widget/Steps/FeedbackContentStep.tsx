import React from 'react';

import { ArrowLeft } from 'phosphor-react';

import { CloseButton } from '../../Button/Close';
import { ScreenshotButton } from '../../Button/Screenshot';

import { FeedbackType, feedbackTypes } from '../WidgetForm';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onResetFeedback: () => void;
};

export const FeedbackContentStep = ({
  feedbackType,
  onResetFeedback,
}: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = React.useState<string | null>(null);

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

      <form className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshot={setScreenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
};
