import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import NavButton from "../../components/NavButton";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleHaveAccount = () => {
    navigate("/login");
  };

  const handleNeedAccount = () => {
    navigate("/signup");
  };

  const handleHaveAProblem = () => {
    navigate("/problems");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 self-center justify-self-center">
      <ScreenHeader title="BIOMETRIA FACIAL" />

      <div className="space-y-4 w-full mt-20 px-5">
        <NavButton
          imageSrc="/assets/images/screen1.png"
          altText="Face Activation"
          text="Escolhe sua Matrícula"
          onClick={handleHaveAccount}
        />
        <NavButton
          imageSrc="/assets/images/screen2.jpeg"
          altText="Facial Registration"
          text="Cadastro Facial"
          onClick={handleNeedAccount}
        />
        <NavButton
          imageSrc="/assets/images/screen3.jpeg"
          altText="Have a Problem?"
          text="Tenho um Problema"
          onClick={handleHaveAProblem}
        />
      </div>
    </div>
  );
};

export default Auth;
