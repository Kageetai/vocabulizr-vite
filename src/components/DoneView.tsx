import React from 'react';
import { useSelector } from 'react-redux';

import { selectDonePrompts } from '../reducers/prompts';

import Printer from './Printer';

function DoneView(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);

  return (
    <div>
      <h1>¡Felicidades!</h1>

      <p className="my-2">You found {donePrompts.length} words and sayings!</p>
      <Printer />
    </div>
  );
}

export default DoneView;
