import React, { useState } from 'react';

import { useWords } from '../reducer';
import type { LabelAnnotation } from '../api';

interface Props {
  isOpen: boolean;
  labels: LabelAnnotation[];
}

function Practise({ isOpen = false, labels }: Props): JSX.Element {
  const [words] = useWords();
  const [currentWord, setCurrentWord] = useState(words.random());

  const hasLabels = !!labels.length;
  const isCorrect = labels.find((l) => l.description === currentWord);

  return (
    <div className={`accordion ${isOpen ? 'isOpen' : ''}`}>
      <p>Take a picture of this:</p>

      <h3>{currentWord}</h3>

      {hasLabels && isCorrect && <h2>Success!</h2>}
      {hasLabels && !isCorrect && <h2>Wrong!</h2>}
    </div>
  );
}

export default Practise;
