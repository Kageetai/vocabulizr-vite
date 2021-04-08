import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'wouter';
import useLocation from 'wouter/use-location';

import { LabelAnnotation, postImage } from '../api';
import {
  markPromptAsDone,
  saveScreenshot,
  selectDebug,
  selectPromptByIndex,
  selectPromptLength,
} from '../reducers/prompts';

import ResultBox from './ResultBox';
import CameraBox from './CameraBox';

interface Props {
  index: number;
}

function PromptView({ index }: Props): JSX.Element {
  const isDebug = useSelector(selectDebug);
  const currentPrompt = useSelector(selectPromptByIndex(index));
  const promptsLength = useSelector(selectPromptLength);
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<LabelAnnotation[]>([]);
  const [isPromptTimedOut, setPromptTimedOut] = useState<boolean>(false);
  const [captureCount, setCaptureCount] = useState(0);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setPromptTimedOut(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const onCapture = (imageSrc: string) => {
    postImage(imageSrc).then(setLabels);
    dispatch(saveScreenshot({ index, imageSrc }));
    setCaptureCount((c) => c + 1);
  };

  const onSuccess = () => {
    setTimeout(() => {
      setLabels([]);
      dispatch(markPromptAsDone(index));
      setLocation(index + '/success');
    }, 1000);
  };

  const labelsInPrompt = !!labels.filter((l) =>
    currentPrompt?.accepted.includes(l.description.toLowerCase()),
  ).length;
  const hasLabels = !!labels.length;
  const labelsList = labels.map((l) => l.description).join(', ');
  // const nextRoute = index + 1 >= promptsLength ? `/end` : `/${index + 1}`;

  if (!currentPrompt) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>&nbsp;</h2>

      <div className="border-box flex items-center text-left">
        <div className="w-11 mr-4 flex-shrink-0">
          <img src="/camera.svg" alt="Camera" />
        </div>

        <div>
          <p className="leading-none">
            <small>Take a photo of...</small>
          </p>

          <h3 className="mt-1 leading-6 min-h-1rem font-sans text-primary">
            {isPromptTimedOut ? currentPrompt.hint : '...'}
          </h3>
        </div>
      </div>

      <p className="leading-1 -mt-2 text-xl">
        {Array.from({ length: promptsLength }, (_, i) => (
          <Link key={i} href={`/${i}`}>
            <span
              className={`mx-1 ${
                index === i ? 'text-primary' : 'text-gray-400'
              }`}
            >
              &bull;
            </span>
          </Link>
        ))}
      </p>

      <CameraBox onCapture={onCapture} />

      <ResultBox
        label={labels[0]?.description}
        hasLabels={hasLabels}
        labelsInPrompt={labelsInPrompt}
        captureCount={captureCount}
        onSuccess={onSuccess}
      />

      {isDebug && labelsList}

      {/*<Link href={nextRoute}>*/}
      {/*  <small>Skip</small>*/}
      {/*</Link>*/}
    </div>
  );
}

export default PromptView;
