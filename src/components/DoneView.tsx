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

      {!!donePrompts.length && <Printer />}

      <button className="clean" onClick={onRestart}>
        Restart
      </button>

      {import.meta.env.VITE_GOOGLE_FORM_EMBED_URL && (
        <iframe
          className="max-w-full max-h-screen mt-16"
          src={import.meta.env.VITE_GOOGLE_FORM_EMBED_URL as string}
          width="640"
          height="489"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      )}
    </div>
  );
}

export default DoneView;
