import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../Button";

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: "user",
    width: window.innerHeight - 16,
    height: window.innerHeight - 16,
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUrl(imageSrc);
    }
  }, []);

  const handleConfirm = () => {
    if (url) {
      onCapture(url);
    }
  };

  const handleRefresh = () => {
    setUrl(null);
  };

  const onUserMedia = (e: MediaStream) => {
    //  Track if required
    // e.getTracks().forEach((track) => {
    //   console.log(track);
    // });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!url ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
        />
      ) : (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
      <div className="absolute z-50 bottom-0 flex flex-wrap w-full justify-center items-center gap-2 py-4 bg-white">
        {url ? (
          <>
            <Button  onClick={handleConfirm} className="min-w-[160px]">
              Confirmar
            </Button>
            <Button onClick={handleRefresh} className="min-w-[160px]">
              Tentar Novamente
            </Button>
          </>
        ) : (
          <Button onClick={capturePhoto} className="min-w-[160px]">
            Foto
          </Button>
        )}
        <Button onClick={onCancel} className="min-w-[160px]">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default CameraCapture;