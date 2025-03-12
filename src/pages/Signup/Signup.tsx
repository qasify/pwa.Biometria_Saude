// src/components/BiometricRegistration.tsx
import React, { useState } from "react";
import { Button, InputField } from "../../components";
import { useNavigate } from "react-router-dom";
import {
  formatCpf,
  formatDateToISO,
  formatPhone,
  validateCpf,
  validateEmail,
  validatePhone,
} from "./utils/helpers";
import { SignupErrors } from "./types";
import constants from "./utils/constants";
import { signup } from "../../api";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAuth } from "../../authentication/AuthProvider";
import ScreenHeader from "../../components/ScreenHeader";
import ImportantNote from "../../components/ImportantNote";
import CameraCapture from "../../components/CameraCapture";
import DatePicker from "../../components/DatePicker";

const BiometricRegistration: React.FC = () => {
  const navigate = useNavigate();

  const { setAuthenticatedUser } = useAuth();

  const [step, setStep] = useState<"cpf" | "camera">("cpf");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [errors, setErrors] = useState<SignupErrors | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, cpf: null } as SignupErrors));
    setCpf(formatCpf(e.target.value));
  };

  const handleBirthDateChange = (value:string) => {
    setErrors((prev) => ({ ...prev, birthDate: null } as SignupErrors));
    setBirthDate(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, phone: null } as SignupErrors));
    setPhone(formatPhone(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, email: null } as SignupErrors));
    setEmail(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const cpfValue = cpf.replace(/\D/g, "");
    const birthdateValue = formatDateToISO(birthDate || null);
    const phoneValue = phone.replace(/\D/g, "");
    const emailValue = email;

    const cpfVaild = validateCpf(cpfValue);
    const birthdateValid = birthDate.length > 0;
    const phoneValid = validatePhone(phoneValue);
    const emailValid = validateEmail(emailValue);

    if (!cpfVaild || !phoneValid || !emailValid || !birthdateValid) {
      setErrors({
        cpf: cpfVaild ? null : constants.INVALID_CPF,
        phone: phoneValid ? null : constants.INVALID_PHONE,
        email: emailValid ? null : constants.INVALID_EMAIL,
        birthDate: birthdateValid ? null : constants.INVALID_BIRTHDATE,
      });
      return;
    }

    setIsLoading(true);
    const response = await signup({
      cpf: cpfValue,
      birthDate: birthdateValue,
    });

    setIsLoading(false);

    // Nova validação baseada em uma propriedade exclusiva (por exemplo, id)
    if (response?.id) {
      setAuthenticatedUser({
        cpf: cpfValue,
        id: response.id,
        dataDeNascimento: birthdateValue,
        phone: phoneValue,
        email: emailValue,
        nome: response.nome,
        token: response.token,
      });

      setConfirmationMessage(
        `Olá ${response.nome}, você confirma que é você mesmo?`
      );
    } else {
      // Caso o registro não seja encontrado
      setConfirmationMessage(
        `<b>Seu cadastro não foi encontrado.</b> Por favor, entre em contato com o nosso Suporte pelo Email: <div style="text-align: center; margin-top: 8px;"><b>suporte@automais.com</b></div>`
      );
    }
  };

  const handleClose = () => {
    setAuthenticatedUser(null);
    setConfirmationMessage(null);
  };

  const handleConfirm = () => {
    setConfirmationMessage(null);
    navigate("/home");
  };

  const handlePicClick = () => {
    setStep("camera");
  };

  const handleCapture = async (imageSrc: string) => {
    setFoto(imageSrc);
    setStep("cpf");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center self-center justify-self-center gap-3 max-w-[500px]">
        {step === "cpf" ? (
          <>
            <ScreenHeader title="CADASTRO FACIAL" />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <InputField
                label="CPF:"
                type="tel"
                placeholder="Digite o CPF"
                value={cpf}
                onChange={handleCpfChange}
                error={errors?.cpf}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              />
              <DatePicker
                label="Data de Nascimento:"
                value={birthDate}
                onChange={handleBirthDateChange}
                error={errors?.birthDate}
              />
              <InputField
                label="Celular:"
                type="tel"
                placeholder="Digite o número de telefone"
                value={phone}
                onChange={handlePhoneChange}
                error={errors?.phone}
                pattern="\(\d{2}\) \d{5}-\d{4}"
              />
              <InputField
                label="Email:"
                type="email"
                placeholder="Digite o e-mail"
                value={email}
                onChange={handleEmailChange}
                error={errors?.email}
              />
              <div className="flex justify-center mt-4 w-full">
                <Button
                  onClick={handleSubmit}
                  className="!w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Enviar
                </Button>
              </div>
            </form>

            <img
              src={foto || "/assets/images/screen1.png"}
              alt="Face Activation"
              className="rounded-full object-cover w-[120px] h-[120px] self-center"
              onClick={handlePicClick}
            />

            <ImportantNote note="Caso já exista foto cadastrada, ela será substituída!" />
          </>
        ) : (
          <CameraCapture
            onCapture={handleCapture}
            onCancel={() => setStep("cpf")}
          />
        )}
      </div>
      <ConfirmationModal
        isVisible={!!confirmationMessage}
        onConfirm={handleConfirm} // Chama a função quando o usuário clica em "OK"
        onClose={handleClose} // Fecha o modal ao clicar fora
        message={confirmationMessage || ""}
      />
    </>
  );
};

export default BiometricRegistration;
