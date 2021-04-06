import React from 'react';
import { useSelector } from 'react-redux';

import { selectDonePrompts } from '../reducers/prompts';

function Printer(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);

  return (
    <ul className="border-box">
      {donePrompts.map((p) => (
        <li key={p.word} className="my-2">
          {p.phrase}
        </li>
      ))}
    </ul>
  );
}

export default Printer;
