import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'wouter';
import { Helmet } from 'react-helmet';

import { selectPromptByIndex, selectPromptLength } from '../reducers/prompts';

import Printer from './Printer';

interface Props {
  index: number;
}

function ResultView({ index }: Props): JSX.Element {
  const currentPrompt = useSelector(selectPromptByIndex(index));
  const promptsLength = useSelector(selectPromptLength);

  const nextRoute = index + 1 >= promptsLength ? `/end` : `/${index + 1}`;

  if (!currentPrompt) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Helmet>
        <title>{`Buscamara - Result ${index + 1}`}</title>
      </Helmet>

      <h2>¡Correcto!</h2>

      <div className="my-4">
        <Printer prompt={currentPrompt} />
      </div>

      <div className="mt-16">
        <p className="mb-4">
          <Link href={nextRoute}>
            <button className="primary">Next phrase</button>
          </Link>
        </p>

        <Link href="/end">
          <button className="clean">End</button>
        </Link>
      </div>
    </div>
  );
}

export default ResultView;
