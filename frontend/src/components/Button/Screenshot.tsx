import React from 'react';

import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { Loading } from '../Loading';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onScreenshot: (screenshot: string | null) => void;
};

export const ScreenshotButton = ({
  screenshot,
  onScreenshot,
}: ScreenshotButtonProps) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = React.useState(false);

  const onTakenScreenshot = async () => {
    try {
      setIsTakingScreenshot(true);

      const canvas = await html2canvas(document.querySelector('html')!);
      const base64Image = canvas.toDataURL('image/png');

      onScreenshot(base64Image);
    } catch (err) {
      console.log(err);
    } finally {
      setIsTakingScreenshot(false);
    }
  };

  return screenshot ? (
    <button
      type="button"
      onClick={() => onScreenshot(null)}
      className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
      style={{
        backgroundImage: `url(${screenshot})`,
        backgroundPosition: 'right bottom',
        backgroundSize: 180,
      }}
    >
      <Trash weight="fill" />
    </button>
  ) : (
    <button
      type="button"
      onClick={onTakenScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
};
