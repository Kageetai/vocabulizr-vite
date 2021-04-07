import React from 'react';
import { useSelector } from 'react-redux';

import { selectDonePrompts } from '../reducers/prompts';

import PromptImage from './PromptImage';

function Printer(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);

  return (
    <ul className="border-box">
      {donePrompts.map((p) => (
        <li key={p.word} className="my-2">
          <div className="flex items-center text-left">
            <PromptImage p={p} />

            {p.phrase}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Printer;
