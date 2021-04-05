import React from 'react';

import { Prompt } from '../reducers/prompts';

interface Props {
  donePrompts: Prompt[];
}

function Printer({ donePrompts }: Props): JSX.Element {
  return (
    <div className="printer-frame mt-4">
      <div className="printer-slot" />

      <div className="printer-button" />

      <ul className="printer-paper">
        {donePrompts.map((p) => (
          <li key={p.word} className="my-2">
            {p.phrase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Printer;
