import React from 'react';

interface Props {
  totalPromptsCount: number;
}

function DoneView({ totalPromptsCount }: Props): JSX.Element {
  return (
    <div>
      <h1>¡Felicidades!</h1>

      <p>You found all the {totalPromptsCount} words and sayings!</p>
    </div>
  );
}

export default DoneView;
