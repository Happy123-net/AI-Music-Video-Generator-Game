
import React from 'react';
import type { AspectRatio } from '../types';

interface VideoGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const aspectRatios: AspectRatio[] = ['16:9', '9:16', '1:1', '4:3', '3:4'];

const AspectRatioButton: React.FC<{
  value: AspectRatio;
  current: AspectRatio;
  onClick: (value: AspectRatio) => void;
}> = ({ value, current, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(value)}
    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
      current === value
        ? 'bg-violet-600 text-white shadow-lg'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
  >
    {value}
  </button>
);


export const VideoGeneratorForm: React.FC<VideoGeneratorFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onSubmit,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Video Prompt
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={4}
          className="block w-full bg-gray-900 border-gray-600 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm placeholder-gray-500 text-white p-4 transition"
          placeholder="e.g., 'A neon hologram of a cat DJing at a futuristic space disco'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Aspect Ratio
        </label>
        <div className="flex flex-wrap gap-2">
          {aspectRatios.map((ar) => (
            <AspectRatioButton key={ar} value={ar} current={aspectRatio} onClick={setAspectRatio} />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !prompt}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </form>
  );
};
