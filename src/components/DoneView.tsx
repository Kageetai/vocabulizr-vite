import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'wouter';

import { reset, selectDonePrompts } from '../reducers/prompts';

import Printer from './Printer';

function DoneView(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);
  const dispatch = useDispatch();
  const [_, setLocation] = useLocation();

  const onRestart = () => {
    dispatch(reset());
    setLocation('/');
  };

  return (
    <div>
      <h1>¡Felicidades!</h1>

      <p className="my-2 p-2">
        You found {donePrompts.length} words and sayings!
      </p>

      <Printer />

      <button className="clean" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}

export default DoneView;
