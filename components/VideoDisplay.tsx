
import React from 'react';
import type { AspectRatio } from '../types';
import { VevoLogo } from './icons/VevoLogo';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';

interface VideoDisplayProps {
  isLoading: boolean;
  loadingMessage: string;
  videoUrl: string | null;
  aspectRatio: AspectRatio;
  prompt: string;
  onReset: () => void;
}

const getAspectRatioClass = (aspectRatio: AspectRatio) => {
  switch (aspectRatio) {
    case '16:9': return 'aspect-video';
    case '9:16': return 'aspect-[9/16]';
    case '1:1': return 'aspect-square';
    case '4:3': return 'aspect-[4/3]';
    case '3:4': return 'aspect-[3/4]';
    default: return 'aspect-video';
  }
};

export const VideoDisplay: React.FC<VideoDisplayProps> = ({
  isLoading,
  loadingMessage,
  videoUrl,
  aspectRatio,
  prompt,
  onReset,
}) => {

    const shareOnTwitter = () => {
        const text = encodeURIComponent(`Check out the music video I generated with AI for "${prompt}"! #AIVideo #Gemini`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const shareOnFacebook = () => {
        const text = encodeURIComponent(`Check out the music video I generated with AI for "${prompt}"! #AIVideo #Gemini`);
        // Facebook's sharer.php doesn't pre-fill text well, but it opens the dialog.
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${text}`, '_blank');
    };

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center text-center p-8 bg-gray-900 rounded-lg">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-200">{loadingMessage}</p>
        <p className="text-sm text-gray-400">This can take a few minutes. Please be patient.</p>
      </div>
    );
  }

  if (!videoUrl) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">Your Video is Ready!</h2>
            <p className="text-gray-400 break-words">Prompt: "{prompt}"</p>
        </div>

        <div className={`relative w-full ${getAspectRatioClass(aspectRatio)} rounded-lg overflow-hidden shadow-2xl shadow-black/50 border-2 border-gray-700`}>
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain bg-black" />
            <div className="absolute bottom-2 right-3 pointer-events-none opacity-80">
                <VevoLogo className="h-8 w-auto text-white" />
            </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
            href={videoUrl}
            download={`vevo-ai-video-${prompt.slice(0, 20).replace(/\s/g, '_')}.mp4`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                <DownloadIcon className="h-5 w-5" />
                <span>Save</span>
            </a>
            <button onClick={shareOnTwitter} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200">
                <ShareIcon className="h-5 w-5" />
                <span>Twitter</span>
            </button>
            <button onClick={shareOnFacebook} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200">
                 <ShareIcon className="h-5 w-5" />
                <span>Facebook</span>
            </button>
             <button onClick={onReset} className="flex items-center justify-center w-full px-4 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors duration-200">
                New Video
            </button>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
            <p><span className="font-bold">Pro Tip:</span> To publish on YouTube, save the video to your device first, then upload it manually to your channel.</p>
        </div>
    </div>
  );
};
