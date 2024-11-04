import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card, { CardBody } from "../../components/Card";
import { Button, InputField } from "../../components";
import CameraCapture from "../../components/CameraCapture";
import { login } from "../../api/login";
import { LoginErrors } from "./types";
import { formatCpf, validateCpf } from "../Signup/utils/helpers";
import constants from "./utils/constants";
import { useAuth } from "../../authentication/AuthProvider";

const Login: React.FC = () => {
  const { setAuthenticatedUser } = useAuth();

  const [cpf, setCpf] = useState("");
  const [step, setStep] = useState<"cpf" | "camera">("cpf");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const navigate = useNavigate();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, cpf: null } as LoginErrors));
    setCpf(formatCpf(e.target.value));
  };

  const handleCpfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cpfValue = cpf.replace(/\D/g, "");
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
    const cpfValue = cpf.replace(/\D/g, "");

    setIsLoading(true);
    setError(null);
    try {
      const response = await login({
        cpf: cpfValue,
        foto: imageSrc,
      });
      if (response?.id) {
        setAuthenticatedUser(response)
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
    <div className="w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card
        className={`space-y-8 min-w-[300px] w-[400px] ${
          step === "cpf" ? "lg:w-[450px]" : "lg:w-auto"
        }`}
      >
        <CardBody>
          <img
            src="/assets/images/logo_angra.png"
            alt="Logo"
            className="mx-auto max-h-[130px]"
          />
          <h1 className="text-center text-2xl font-bold">
            CADASTRO BIOMÉTRICO
          </h1>
          {step === "cpf" ? (
            <form onSubmit={handleCpfSubmit} className="mt-8 space-y-6">
              <InputField
                label="CPF:"
                type="tel"
                placeholder="Enter CPF"
                value={cpf}
                onChange={handleCpfChange}
                error={errors?.cpf}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Button type="submit" disabled={isLoading} className="!w-full">
                Próximo
              </Button>
            </form>
          ) : (
            <CameraCapture
              onCapture={handleCapture}
              onCancel={() => setStep("cpf")}
            />
          )}
          {isLoading && <p className="text-center mt-4">Carregando...</p>}
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
