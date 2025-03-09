import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components";
import CameraCapture from "../../components/CameraCapture";
import { login } from "../../api/login";
import { LoginErrors } from "./types";
import { formatCpf, validateCpf } from "../Signup/utils/helpers";
import constants from "./utils/constants";
import { useAuth } from "../../authentication/AuthProvider";
import ScreenHeader from "../../components/ScreenHeader";
import { FormDataType } from "./types";
import EnrollmentButton from "../../components/EnrollmentButton";
import LocationDropdown from "../../components/LocationDropDown";

const Login: React.FC = () => {
  const { setAuthenticatedUser } = useAuth();

  const [formData, setFormData] = useState<FormDataType>({
    cpf: "",
    enrollment: undefined,
    location: undefined,
  });
  const [step, setStep] = useState<"cpf" | "camera">("cpf");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const navigate = useNavigate();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, cpf: null } as LoginErrors));
    setFormData((prev) => ({ ...prev, cpf: formatCpf(e.target.value) }));
  };

  const handleEnrollmentChange = (value: number) => {
    setFormData((prev) => ({ ...prev, enrollment: value }));
  };

  const handleCpfSubmit = () => {
    const cpfValue = formData.cpf.replace(/\D/g, "");
    const cpfVaild = validateCpf(cpfValue);

    if (!cpfVaild) {
      setErrors({
        cpf: cpfVaild ? null : constants.INVALID_CPF,
        phote: "",
      });
      return;
    }

    setError(null);
    setStep("camera");
  };

  const handleCapture = async (imageSrc: string) => {
    // navigate("/logs");
    const cpfValue = formData.cpf.replace(/\D/g, "");

    setIsLoading(true);
    setError(null);
    try {
      const response = await login({
        cpf: cpfValue,
        foto: imageSrc,
      });
      if (response?.id) {
        setAuthenticatedUser(response);
        navigate("/logs");
      } else {
        setStep("cpf");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
      setStep("cpf");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center self-center justify-self-center gap-6 max-w-[500px]">
      {step === "cpf" ? (
        <div className="flex flex-col gap-5 w-full">
          <InputField
            label="CPF:"
            type="tel"
            placeholder="Enter CPF"
            value={formData.cpf}
            onChange={handleCpfChange}
            error={errors?.cpf}
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          />
          <div className="flex flex-col gap-2 w-full">
            <EnrollmentButton
              isSelected={formData.enrollment === 1}
              onClick={() => handleEnrollmentChange(1)}
            >
              MATRÍCULA 1
            </EnrollmentButton>
            <EnrollmentButton
              isSelected={formData.enrollment === 2}
              onClick={() => handleEnrollmentChange(2)}
            >
              MATRÍCULA 2
            </EnrollmentButton>
            <EnrollmentButton
              isSelected={formData.enrollment === 3}
              onClick={() => handleEnrollmentChange(3)}
            >
              MATRÍCULA 3
            </EnrollmentButton>
          </div>

          <LocationDropdown/>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <img
            src="/assets/images/screen1.png"
            alt="Face Activation"
            className="rounded-full object-cover w-[156px] h-[147px] self-center"
          />

          <ScreenHeader title="ATIVE SUA FACE" onClick={handleCpfSubmit} />
        </div>
      ) : (
        <CameraCapture
          onCapture={handleCapture}
          onCancel={() => setStep("cpf")}
        />
      )}
      {isLoading && <p className="text-center mt-4">Carregando...</p>}
    </div>
  );
};

export default Login;
