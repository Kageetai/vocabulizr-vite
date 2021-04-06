import React from 'react';

interface Props {
  label: string;
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
    <div className="px-4 py-2 my-2 border-border border-2 rounded-xl flex items-center">
      <div className="w-16">
        <img src="/lens.png" alt="Camera" />
      </div>

      <h3 className="mt-0 leading-6 font-sans text-primary">{label}</h3>
      <div className="ml-auto text-2xl">
        {success && <p className="text-4xl text-green-500">✓</p>}
        {failure && <p>❌</p>}
      </div>
    </div>
  );
}

export default PromptView;
