import React from 'react';

import SuccessMessage from './SuccessMessage';

interface Props {
  label?: string;
  hasLabels: boolean;
  hasLabelsInPrompt: boolean;
  captureCount: number;
  onSuccess: () => void;
}

function PromptView({
  label,
  hasLabels,
  hasLabelsInPrompt,
  captureCount,
  onSuccess,
}: Props): JSX.Element {
  const failure = hasLabels && !hasLabelsInPrompt;
  const success = hasLabels && hasLabelsInPrompt;

  return (
    <>
      <div
        className={`border-box flex items-center text-left ${
          !hasLabels && `opacity-50`
        } ${hasLabels && `hasLabels`}`}
      >
        <div className="w-11 mr-4 flex-shrink-0">
          <img src="/lens.svg" alt="Lens" />
        </div>

        <div>
          <p className="leading-none">
            <small>Recognized as...</small>
          </p>

          <h3 className="mt-1 leading-6 min-h-1rem font-sans text-primary">
            {label || '...'}
          </h3>
        </div>

        <div className="ml-auto text-2xl">
          {success && <SuccessMessage onSuccess={onSuccess} />}
          {failure && <p>❌</p>}
        </div>
      </div>

      {success && <p className="text-green-500">That&apos;s correct!</p>}
      {failure && (
        <p className="text-red-500">
          {captureCount % 2 === 0 ? 'Try again!' : 'Give it another try!'}
        </p>
      )}
    </>
  );
}

export default PromptView;
