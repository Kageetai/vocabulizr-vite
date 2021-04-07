import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'wouter';

import { selectPromptByIndex, selectPromptLength } from '../reducers/prompts';

import PromptImage from './PromptImage';

interface Props {
  index: number;
}

function ResultView({ index }: Props): JSX.Element {
  const currentPrompt = useSelector(selectPromptByIndex(index));
  const promptsLength = useSelector(selectPromptLength);

  const nextRoute = index + 1 >= promptsLength ? `/end` : `/${index + 1}`;

  if (!currentPrompt) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>¡Correcto!</h1>

      <div className="border-box flex items-center text-left">
        <PromptImage p={currentPrompt} />

        <div>
          <h3 className="mt-1">The Phrase</h3>

          <p>{currentPrompt.phrase}</p>
        </div>
      </div>

      <p className="my-4 italic">&quot;{currentPrompt.explanation}&quot;</p>

      <p className="my-2">
        <Link href={nextRoute}>
          <button className="primary">Next phrase</button>
        </Link>
      </p>

      <Link href="/end">
        <button className="clean">End</button>
      </Link>
    </div>
  );
}

export default ResultView;
