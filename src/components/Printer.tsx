import React from 'react';

import { Prompt } from '../reducers/prompts';

import PromptImage from './PromptImage';

interface Props {
  prompt: Prompt;
}

function Printer({ prompt }: Props): JSX.Element {
  if (!prompt) {
    return (
      <div className="border-box flex flex-col justify-center min-h-60 text-gray-400 italic">
        <span>No words yet</span>
      </div>
    );
  }

  return (
    <div className="border-box text-left min-h-60">
      <div className="flex items-center mb-4 mt-2">
        <img src="/bookmark.svg" alt="Bookmark" className="mr-4" />

        <h3 className="m-0">{prompt.word}</h3>

        <span className="ml-auto -mr-4">
          <PromptImage p={prompt} />
        </span>
      </div>

      <p className="text-primary">{prompt.phrase}</p>

      <p className="mt-2 leading-none">
        <small>Meaning</small>
      </p>

      <p>{prompt.translation}</p>

      <p className="mt-2 leading-none">
        <small>Explanation</small>
      </p>

      <p>{prompt.explanation}</p>
    </div>
  );
}

export default Printer;
