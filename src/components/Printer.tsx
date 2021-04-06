import React from 'react';
import { useSelector } from 'react-redux';

import { selectDonePrompts } from '../reducers/prompts';

function Printer(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);

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
