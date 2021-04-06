import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useSelector } from 'react-redux';

import { LabelAnnotation, postImage } from '../api';
import { selectPromptByIndex } from '../reducers/prompts';

const videoConstraints = {
  width: { min: 500 },
  height: { min: 500 },
  aspectRatio: 1,
  facingMode: 'user',
};

interface Props {
  index: number;
}

function PromptView({ index }: Props): JSX.Element {
  const currentPrompt = useSelector(selectPromptByIndex(index));
  const webcamRef = React.useRef<Webcam>(null);
  const [isUserFacing, setIsUserFacing] = useState(false);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [labels, setLabels] = useState<LabelAnnotation[]>([]);

  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices],
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
    setIsUserFacing(devices.length === 1);
  }, [handleDevices]);

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        postImage(imageSrc).then(setLabels);
      }
    }
  }, [webcamRef]);

  const videoConstraintsUser = {
    ...videoConstraints,
    facingMode: isUserFacing ? 'user' : 'environment',
  };
  const hasSeveralCameras = devices.length > 1;
  const labelsInPrompt = !!labels.filter((l) =>
    currentPrompt?.accepted.includes(l.description.toLowerCase()),
  ).length;
  const hasLabels = !!labels.length;
  const debug = new URLSearchParams(location.search).has('debug');
  const labelsList = labels.map((l) => l.description).join(',');

  return (
    <div>
      <div className="bg-gray-300 px-4 my-2">
        <h3>How</h3>

        <p>{currentPrompt?.hint}</p>
      </div>

      <div className="relative max-w-full w-125 max-h-125 my-2 rounded-xl overflow-hidden">
        <span className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -z-1">
          Please allow us to use your device camera!
        </span>

        <Webcam
          width={500}
          height={500}
          mirrored={
            (!hasSeveralCameras && isUserFacing) ||
            (hasSeveralCameras && isUserFacing)
          }
          videoConstraints={videoConstraintsUser}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

        {devices.length && (
          <button
            className="opacity-75 hover:opacity-90 w-16 h-16 rounded-full focus:ring absolute bottom-2 left-1/2 transform -translate-x-1/2"
            onClick={capture}
            aria-label="Capture image"
          >
            &nbsp;
          </button>
        )}

        {hasSeveralCameras && (
          <button
            className="changeCameraButton absolute top-0 right-0"
            onClick={() => setIsUserFacing(!isUserFacing)}
          >
            &nbsp;
          </button>
        )}
      </div>

      {hasLabels && !labelsInPrompt && <h2>Wrong! Try again!</h2>}
      {hasLabels && labelsInPrompt && <h2>Correct!</h2>}

      {debug && labelsList}
    </div>
  );
}

export default PromptView;
