import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'wouter';
import useLocation from 'wouter/use-location';
import { Helmet } from 'react-helmet';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataLayer.push({ event: 'cameraCaptureButton-click' });
  };

  const onSuccess = () => {
    setTimeout(() => {
      setLabels([]);
      dispatch(markPromptAsDone(index));
      setLocation(index + '/success');
    }, 1000);
  };

  const labelsInPrompt = labels.filter((l) =>
    currentPrompt?.accepted.includes(l.description.toLowerCase()),
  );
  const hasLabelsInPrompt = !!labelsInPrompt.length;
  const hasLabels = !!labels.length;
  const labelsList = labels.map((l) => l.description).join(', ');

  if (!currentPrompt) {
    return <Redirect to="/" />;
  }

  console.log(index, promptsLength);

  return (
    <div>
      <Helmet>
        <title>{`Buscamara - Prompt ${index + 1}`}</title>
      </Helmet>

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

      <div className="flex items-center justify-center">
        {index > 0 ? (
          <Link href={`/${index - 1}`}>
            <img src="/arrow-left.svg" alt="previous" />
          </Link>
        ) : (
          <span className="w-6">&nbsp;</span>
        )}

        <small>
          {index + 1} / {promptsLength}
        </small>

        {index < promptsLength - 1 ? (
          <Link href={`/${index + 1}`}>
            <img src="/arrow-right.svg" alt="next" />
          </Link>
        ) : (
          <span className="w-6">&nbsp;</span>
        )}
      </div>

      <CameraBox onCapture={onCapture} />

      <ResultBox
        label={(labelsInPrompt[0] || labels[0])?.description}
        hasLabels={hasLabels}
        hasLabelsInPrompt={hasLabelsInPrompt}
        captureCount={captureCount}
        onSuccess={onSuccess}
      />

      {captureCount > 2 && (
        <Link href={`/${index}/success`}>
          <small>... or skip</small>
        </Link>
      )}

      {isDebug && labelsList}
    </div>
  );
}

export default PromptView;
