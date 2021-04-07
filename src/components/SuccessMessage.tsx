import React from 'react';

interface Props {
  onSuccess: () => void;
}

function PromptView({ onSuccess }: Props): JSX.Element {
  React.useEffect(() => {
    onSuccess();
  }, []);

  return <p className="text-4xl text-green-500">✓</p>;
}

export default PromptView;
