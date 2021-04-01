import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { LabelAnnotation } from '../api';
import { selectCurrentPrompt } from '../reducers/prompts';

import Header from './Header';
import PromptView from './PromptView';
import ResultView from './ResultView';

function App(): JSX.Element {
  const currentPrompt = useSelector(selectCurrentPrompt);
  const [labels, setLabels] = useState<LabelAnnotation[]>([]);

  const labelsInPrompt = labels.filter((l) =>
    currentPrompt?.accepted.includes(l.description.toLowerCase()),
  );

  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-125 mx-auto px-4 flex flex-col items-stretch text-center">
        <Header />

        {currentPrompt && (
          <>
            {!labelsInPrompt.length && (
              <PromptView
                currentPrompt={currentPrompt}
                onSetLabels={setLabels}
              />
            )}

            {!!labelsInPrompt.length && (
              <ResultView currentPrompt={currentPrompt} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
