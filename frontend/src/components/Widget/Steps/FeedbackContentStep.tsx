import { ArrowLeft } from 'phosphor-react';
import { CloseButton } from '../../Button/Close';

import { FeedbackType, feedbackTypes } from '../WidgetForm';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onResetFeedback: () => void;
};

export const FeedbackContentStep = ({
  feedbackType,
  onResetFeedback,
}: FeedbackContentStepProps) => (
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

    <div className="flex py-8 gap-2 w-full"></div>
  </>
);
