import React, { useState } from 'react';
import Webcam from 'react-webcam';

import { LabelAnnotation, postImage } from '../api';
import { Prompt } from '../reducers/prompts';

const videoConstraints = {
  width: { min: 500 },
  height: { min: 500 },
  aspectRatio: 1,
  facingMode: { ideal: 'environment' },
};

interface Props {
  currentPrompt: Prompt;
  onSetLabels: (labels: LabelAnnotation[]) => void;
}

function App({ currentPrompt, onSetLabels }: Props): JSX.Element {
  const webcamRef = React.useRef<Webcam>(null);
  const [isUserFacing, setIsUserFacing] = useState(false);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);

  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices],
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        postImage(imageSrc).then(onSetLabels);
      }
    }
  }, [webcamRef]);

  const videoConstraintsUser = {
    ...videoConstraints,
    facingMode: isUserFacing ? 'user' : 'environment',
  };

  return (
    <div>
      <h1>¡Bienvenido a Buscamara!</h1>

      <p>Learn a new Spanish word and saying with your camera.</p>

      <div className="bg-gray-300 px-4 my-2">
        <h3>How</h3>

        <p>{currentPrompt.hint}</p>
      </div>

      <div className="relative max-w-full w-125 max-h-125 my-2 rounded-xl overflow-hidden">
        <span className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          Please allow us to use your device camera!
        </span>

        <Webcam
          width={500}
          height={500}
          mirrored={true}
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

        {devices.length > 1 && (
          <button
            className="changeCameraButton absolute top-0 right-0"
            onClick={() => setIsUserFacing(!isUserFacing)}
          >
            &nbsp;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
