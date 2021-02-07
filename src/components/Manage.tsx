import React from 'react';

import type { LabelAnnotation } from '../api';
import { addWord, removeWord, useWords } from '../reducer';

interface Props {
  isOpen: boolean;
  labels: LabelAnnotation[];
  onAddWord: () => void;
}

function Manage({ isOpen = false, labels, onAddWord }: Props): JSX.Element {
  const [words, dispatch] = useWords();

  const hasLabels = !!labels.length;
  const hasWords = !!words.length;

  return (
    <div className={`accordion ${isOpen ? 'isOpen' : ''}`}>
      {!hasLabels && hasWords && (
        <p>Take another picture to create more words!</p>
      )}

      {hasLabels && (
        <>
          <h3>What are we looking at?</h3>

          <small>Click to add words.</small>

          <ul className="flex justify-between flex-wrap py-1">
            {labels.map((l, i) => (
              <li key={i} className="flex-grow mb-2">
                <button
                  className="primary"
                  onClick={() => {
                    dispatch(addWord(l.description));
                    onAddWord();
                  }}
                >
                  {l.description}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasWords && (
        <>
          <h3>You currently have these words save in your vocabulary:</h3>

          <small>Click to remove words.</small>

          <ul className="flex justify-between flex-wrap py-1">
            {[...words].map((w, i) => (
              <li key={i} className="flex-grow mb-2">
                <button
                  className="primary"
                  onClick={() => dispatch(removeWord(w))}
                >
                  {w}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Manage;
