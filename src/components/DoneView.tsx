import React from 'react';

import Printer from './Printer';

interface Props {
  totalPromptsCount: number;
}

function DoneView({ totalPromptsCount }: Props): JSX.Element {
  return (
    <div>
      <h1>¡Felicidades!</h1>

      <p>You found all the {totalPromptsCount} words and sayings!</p>

      <Printer />
    </div>
  );
}

export default DoneView;
