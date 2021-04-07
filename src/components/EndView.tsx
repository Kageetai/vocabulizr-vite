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
      <h2>All my words</h2>

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

      <div className="mt-16">
        {import.meta.env.VITE_GOOGLE_FORM_URL && (
          <p className="mb-4">
            <a
              href={import.meta.env.VITE_GOOGLE_FORM_URL as string}
              className="primary"
            >
              Feedback
            </a>
          </p>
        )}

        <p>
          <button className="clean" onClick={onRestart}>
            Play again
          </button>
        </p>

        <h3>¡Muchas gracias!</h3>

        <p>
          We loved making this learning experience for you. If you have other
          comments, suggestions, or thoughts about Buscamara, we&apos;d love to
          here from you in{' '}
          <a
            className="text-primary hover:underline"
            href="https://www.facebook.com/groups/babbelexploradores"
          >
            Exploradores
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default EndView;
