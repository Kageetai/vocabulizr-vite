import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'wouter';

import { reset, selectDonePrompts } from '../reducers/prompts';

import Printer from './Printer';

function EndView(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);
  const dispatch = useDispatch();
  const [_, setLocation] = useLocation();
  const [index, setIndex] = useState(0);

  const onRestart = () => {
    dispatch(reset());
    setLocation('/');
  };

  const length = donePrompts.length;

  return (
    <div>
      <h2>¡Felicidades!</h2>

      <div className="my-4">
        <Printer prompt={donePrompts[index]} />

        {!!length && (
          <div className="flex justify-center mt-4">
            <button
              disabled={index < 1}
              onClick={() => setIndex(index - 1)}
              className="clean mr-2"
            >
              <img src="/arrow-left.svg" alt="previous" />
            </button>
            {index + 1} / {length}
            <button
              disabled={index >= length - 1}
              onClick={() => setIndex(index + 1)}
              className="clean ml-2"
            >
              <img src="/arrow-right.svg" alt="next" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-4">
        {import.meta.env.VITE_GOOGLE_FORM_URL && (
          <>
            <h3>¡Muchas gracias!</h3>

            <p>
              We&apos;d love to hear how this learning experience was for you!.
            </p>

            <p className="">
              <a
                href={import.meta.env.VITE_GOOGLE_FORM_URL as string}
                className="primary"
              >
                Give Feedback
              </a>
            </p>
          </>
        )}

        <p>
          <button
            className="clean inline-flex justify-center"
            onClick={onRestart}
          >
            <img
              className="inline-block mr-1"
              src="/retry.svg"
              alt="Play again"
            />
            Play again
          </button>
        </p>
      </div>
    </div>
  );
}

export default EndView;
