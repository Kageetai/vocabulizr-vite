import React from 'react';

import { Prompt } from '../reducers/prompts';

interface Props {
  currentPrompt: Prompt;
}

function App({ currentPrompt }: Props): JSX.Element {
  return (
    <div>
      <h1>¡Correcto!</h1>

      <p>
        You took a photo of a{' '}
        <span className="text-primary">{currentPrompt.word}.</span>
      </p>

      <div className="border px-4 my-2">
        <h3>The Phrase</h3>

        <p>{currentPrompt.phrase}</p>
      </div>
    </div>
  );
}

export default App;
