import React from 'react';

interface Props {
  label?: string;
  hasLabels: boolean;
  labelsInPrompt: boolean;
  onSuccess: () => void;
}

function PromptView({
  label,
  hasLabels,
  labelsInPrompt,
  onSuccess,
}: Props): JSX.Element {
  React.useEffect(() => {
    if (success) {
      onSuccess();
    }
  }, []);

  const failure = hasLabels && !labelsInPrompt;
  const success = hasLabels && labelsInPrompt;

  return (
    <div
      className={`border-box flex items-center text-left ${
        !hasLabels && `opacity-50`
      }`}
    >
      <div className="w-11 mr-4">
        <img src="/lens.svg" alt="Camera" />
      </div>

      <div>
        <p className="leading-none">
          <small>Recognized as...</small>
        </p>

        <h3 className="mt-1 leading-6 min-h-1rem leading-4 font-sans text-primary">
          {label || '...'}
        </h3>
      </div>

      <div className="ml-auto text-2xl">
        {success && <p className="text-4xl text-green-500">✓</p>}
        {failure && <p>❌</p>}
      </div>
    </div>
  );
}

export default PromptView;
