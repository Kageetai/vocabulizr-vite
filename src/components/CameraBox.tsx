import React, { useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: { min: 500 },
  height: { min: 500 },
  aspectRatio: 1,
  facingMode: 'user',
};

interface Props {
  onCapture: (imageSrc: string) => void;
}

function CameraBox({ onCapture }: Props): JSX.Element {
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
    setIsUserFacing(devices.length === 1);
  }, [handleDevices]);

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [webcamRef]);

  const videoConstraintsUser = {
    ...videoConstraints,
    facingMode: isUserFacing ? 'user' : 'environment',
  };
  const hasSeveralCameras = devices.length > 1;

  return (
    <div className="cameraBox relative">
      <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
        Please allow us to use your device camera!
      </p>

      <Webcam
        className="relative"
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
          className="cameraCaptureButton absolute bottom-2 left-1/2 transform -translate-x-1/2"
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
  );
}

export default CameraBox;
