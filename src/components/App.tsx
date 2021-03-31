import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useSelector } from 'react-redux';

import { LabelAnnotation, postImage } from '../api';
import { selectWords } from '../reducers/words';

import Manage from './Manage';
import Practise from './Practise';

const videoConstraints = {
  width: { min: 500 },
  height: { min: 500 },
  aspectRatio: 1,
  facingMode: { ideal: 'environment' },
};

function App(): JSX.Element {
  const words = useSelector(selectWords);
  const webcamRef = React.useRef<Webcam>(null);
  const [labels, setLabels] = useState<LabelAnnotation[]>([]);
  const [isPractiseOpen, setIsPractiseOpen] = useState(!!words.length);
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
        postImage(imageSrc).then(setLabels);
      }
    }
  }, [webcamRef]);

  const hasLabels = !!labels.length;
  const hasWords = !!words.length;

  const toggleAccordion = () => setIsPractiseOpen((prev) => !prev);

  const videoConstraintsUser = {
    ...videoConstraints,
    facingMode: isUserFacing ? 'user' : 'environment',
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-125 mx-auto px-4 flex flex-col items-stretch text-center">
        <h1>Vocabulizr</h1>

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

          <button
            className="bg-gray-50 bg-opacity-75 hover:bg-opacity-90 w-16 h-16 rounded-full focus:ring absolute bottom-2 left-1/2 transform -translate-x-1/2"
            onClick={capture}
            aria-label="Capture image"
          >
            &nbsp;
          </button>

          {devices.length > 1 && (
            <button
              className="changeCameraButton absolute top-0 right-0"
              onClick={() => setIsUserFacing(!isUserFacing)}
            >
              &nbsp;
            </button>
          )}
        </div>

        {!hasLabels && !hasWords && (
          <h2>Take a picture to create your first word!</h2>
        )}

        {(hasLabels || hasWords) && (
          <>
            {hasWords && (
              <>
                <h2 className="accordion-header" onClick={toggleAccordion}>
                  Practise
                </h2>

                <Practise isOpen={isPractiseOpen} labels={labels} />

                <h2 className="accordion-header" onClick={toggleAccordion}>
                  Manage
                </h2>
              </>
            )}

            <Manage
              isOpen={!isPractiseOpen}
              labels={labels}
              onAddWord={() => setLabels([])}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
