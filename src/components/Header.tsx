import React from 'react';
import { Link, useRoute } from 'wouter';
import { useSelector } from 'react-redux';

import { selectDonePrompts } from '../reducers/prompts';

function Header(): JSX.Element {
  const donePrompts = useSelector(selectDonePrompts);
  const [match] = useRoute('/all');

  const hasDonePrompts = !!donePrompts.length;

  const onBack = () => window.history.back();

  return (
    <div className="relative mb-2 flex justify-center">
      <div>
        <h1>Buscamara</h1>

        <small>Guess, capture, learn.</small>
      </div>

      {match ? (
        <button className="clean absolute top-4 right-0" onClick={onBack}>
          X
        </button>
      ) : (
        <Link href="/all">
          <button
            className="clean absolute top-4 right-0"
            disabled={!hasDonePrompts}
          >
            <img src="/scroll.png" alt="scroll" />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
