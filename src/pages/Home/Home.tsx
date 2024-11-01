import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../components";
import { useAuth } from "../../authentication/AuthProvider";
import { captureImage } from "../../api";
import { UserData } from "../../types";
import ConfirmationModal from "../../components/ConfirmationModal";

const Home: React.FC = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const videoConstraints = {
      facingMode: "user",
      width: window.innerHeight - 16, // off setting the padding
      height: window.innerHeight - 16, // off setting the padding
      // aspectRatio: 16 / 9,
    };

    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);

    const capturePhoto = useCallback(async () => {
      if (webcamRef.current) {
        // eslint-disable-next-line
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
      }
    }, []);

    const handleCancel = () => {
      setAuthenticatedUser(null);
    };

    const handleRefresh = () => {
      setUrl(null);
    };

    const handleConfirm = async () => {
      setIsLoading(true);
      const response = await captureImage({
        ...authenticatedUser,
        foto: url as string,
      } as UserData);
      if (response) setConfirmationMessage(response);
      setIsLoading(false);
    };

    const onUserMedia = (e: MediaStream) => {
      //  Track if required
      // e.getTracks().forEach((track) => {
      //   console.log(track);
      // });
    };

    return (
      <>
        <div className="w-full flex flex-col items-center justify-center p-2">
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
          <div className="absolute bottom-0 flex flex-wrap w-full justify-center items-center gap-2 py-4">
            {url ? (
              <>
                <Button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  isLoading={isLoading}
                  className="min-w-[160px]"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="min-w-[160px]"
                >
                  Tentar Novamente
                </Button>
              </>
            ) : (
              <Button onClick={capturePhoto} className="min-w-[160px]">
                Foto
              </Button>
            )}
            <Button
              onClick={handleCancel}
              className="min-w-[160px]"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
        <ConfirmationModal
          isVisible={!!confirmationMessage}
          onConfirm={handleCancel}
          message={confirmationMessage || ""}
        />
      </>
    );
};

export default Home;
