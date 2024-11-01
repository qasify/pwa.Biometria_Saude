import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { captureImage } from "../../api";
import { UserData } from "../../types";
import { useAuth } from "../../authentication/AuthProvider";
import Card, { CardBody } from "../../components/Card";
import CameraCapture from "../../components/CameraCapture";
import { Button } from "../../components";
import ConfirmationModal from "../../components/ConfirmationModal";

const Home: React.FC = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleCapture = async (imageSrc: string) => {
    setIsLoading(true);
    try {
      const response = await captureImage({
        ...authenticatedUser,
        foto: imageSrc,
      } as UserData);
      if (response) {
        setConfirmationMessage(response);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      setConfirmationMessage("An error occurred while processing your image.");
    } finally {
      setIsLoading(false);
      setShowCamera(false);
    }
  };

  const handleCancel = () => {
    setAuthenticatedUser(null);
    navigate("/");
  };

  const handleConfirmationClose = () => {
    setConfirmationMessage(null);
    navigate("/dashboard"); //
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className=" space-y-8 ">
        <CardBody>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            Captura de Imagem
          </h2>
          {showCamera ? (
            <CameraCapture onCapture={handleCapture} onCancel={handleCancel} />
          ) : (
            <div className="text-center">
              <p className="mb-4">Imagem capturada com sucesso!</p>
              <Button onClick={() => setShowCamera(true)}>
                Capturar Novamente
              </Button>
            </div>
          )}
          {isLoading && (
            <div className="text-center mt-4">
              <p>Processando imagem...</p>
            </div>
          )}
        </CardBody>
      </Card>
      <ConfirmationModal
        isVisible={!!confirmationMessage}
        onConfirm={handleConfirmationClose}
        message={confirmationMessage || ""}
      />
    </div>
  );
};

export default Home;