import React from 'react';

import { ChatTeardropDots } from 'phosphor-react';

export const Widget = () => {
  const [isOpened, setIsOpened] = React.useState(false);

  const onToggle = () => setIsOpened(!isOpened);

  return (
    <div className="absolute bottom-5 right-5">
      {isOpened ? <p>Hello World</p> : null}

      <button
        onClick={() => onToggle()}
        className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group"
      >
        <ChatTeardropDots className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </button>
    </div>
  );
};
