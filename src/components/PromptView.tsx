import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'wouter';
import useLocation from 'wouter/use-location';

import { LabelAnnotation, postImage } from '../api';
import { selectPromptByIndex, selectPromptLength } from '../reducers/prompts';

import ResultBox from './ResultBox';
import CameraBox from './CameraBox';

interface Props {
  index: number;
}

function PromptView({ index }: Props): JSX.Element {
  const currentPrompt = useSelector(selectPromptByIndex(index));
  const promptsLength = useSelector(selectPromptLength);
  const [labels, setLabels] = useState<LabelAnnotation[]>([]);
  const [_, setLocation] = useLocation();

  const onCapture = (imageSrc: string) => {
    postImage(imageSrc).then(setLabels);
  };

  const onSuccess = () => {
    setTimeout(() => {
      setLabels([]);
      setLocation(nextRoute);
    }, 1000);
  };

  const labelsInPrompt = !!labels.filter((l) =>
    currentPrompt?.accepted.includes(l.description.toLowerCase()),
  ).length;
  const hasLabels = !!labels.length;
  const debug = new URLSearchParams(location.search).has('debug');
  const labelsList = labels.map((l) => l.description).join(', ');
  const nextRoute = index + 1 >= promptsLength ? `/end` : `/${index + 1}`;

  if (!currentPrompt) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="px-4 py-1 my-2 border-border border-2 rounded-xl flex items-center">
        <div className="w-16">
          <img src="/camera.png" alt="Camera" />
        </div>

        <div>
          <small>Take a photo of...</small>

          <h3 className="mt-1 leading-6 font-sans text-primary">
            {currentPrompt.hint}
          </h3>
        </div>
      </div>

      <CameraBox onCapture={onCapture} />

      {hasLabels && (
        <ResultBox
          label={labels[0].description}
          hasLabels={hasLabels}
          labelsInPrompt={labelsInPrompt}
          onSuccess={onSuccess}
        />
      )}

      {debug && labelsList}

      <Link href={nextRoute}>
        <small>Skip</small>
      </Link>
    </div>
  );
}

export default PromptView;
