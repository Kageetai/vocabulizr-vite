import React from 'react';

import { Prompt } from '../reducers/prompts';

interface Props {
  p?: Prompt;
}

function PromptImage({ p }: Props): JSX.Element | null {
  if (!p?.image) {
    return null;
  }

  return (
    <img className="w-11 h-auto mr-4 rounded" src={p.image} alt={p.word} />
  );
}

export default PromptImage;
