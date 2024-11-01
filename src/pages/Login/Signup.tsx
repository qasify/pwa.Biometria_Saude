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
import { LogInErrors } from "./types";
import constants from "./utils/constants";
import { signup } from "../../api";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAuth } from "../../authentication/AuthProvider";

const BiometricRegistration: React.FC = () => {
  const navigate = useNavigate();

  const { setAuthenticatedUser } = useAuth();

  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<LogInErrors | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, cpf: null } as LogInErrors));
    setCpf(formatCpf(e.target.value));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, birthDate: null } as LogInErrors));
    setBirthDate(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, phone: null } as LogInErrors));
    setPhone(formatPhone(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, email: null } as LogInErrors));
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

    setConfirmationMessage(`Olá ${response.nome}, você confirma que é você mesmo?`);
  } else {
    // Caso o registro não seja encontrado
    setConfirmationMessage(`<b>Seu cadastro não foi encontrado.</b> Por favor, entre em contato com o nosso Suporte pelo Email: <div style="text-align: center; margin-top: 8px;"><b>suporte@automais.com</b></div>`);
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

  // Test Credentials
  // 05684082769
  // 14/02/1983
  // 21979997000
  // email@email.com.br

  return (
    <>
      <div className="w-full flex items-center justify-center p-2 self-center justify-self-center">
        <div className="flex flex-col items-center justify-center gap-4 mx-auto mt-10 p-8 rounded-lg shadow-lg bg-white min-w-[300px] w-[400px] lg:w-[450px] ">
          <img
            src="/assets/images/logo_angra.png"
            alt="Logo"
            className="mx-auto max-h-[130px]"
          />
          <h1 className="text-center text-2xl font-bold">
            CADASTRO BIOMÉTRICO
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <InputField
              label="CPF:"
              type="tel"
              placeholder="Enter CPF"
              value={cpf}
              onChange={handleCpfChange}
              error={errors?.cpf}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            />
            <InputField
              label="Data de Nascimento:"
              type="date"
              placeholder="mm/dd/yyyy"
              value={birthDate}
              onChange={handleBirthDateChange}
              error={errors?.birthDate}
            />
            <InputField
              label="Celular:"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneChange}
              error={errors?.phone}
              pattern="\(\d{2}\) \d{5}-\d{4}"
            />
            <InputField
              label="Email:"
              type="email"
              placeholder="Enter email"
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
        </div>
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
