import React, { useState } from "react";
import ProblemItem from "../../components/ProblemItem";
import PROBLEMS_LIST from "./utils/constants/ProblemsList";
import { useParams } from "react-router-dom";
import NavButton from "../../components/NavButton";
import { Button, InputField } from "../../components";
import { formatPhone } from "../Signup/utils/helpers";

const ProblemDetails = () => {
  const { id } = useParams();
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [problemText, setProblemText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const problem = PROBLEMS_LIST.find((item) => id && item.id.toString() === id);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    //TODO: api

    setIsLoading(false);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center self-center justify-self-center gap-4 p-[-40px] my-10">
      <div className="flex flex-col self-start px-2 w-full pr-8">
        {problem && <ProblemItem {...problem} />}
      </div>
      {id !== PROBLEMS_LIST.length.toString() ? (
        <textarea
          className="h-80 w-full mt-5 mb-12 focus:outline-none p-3 shadow-lg rounded-lg"
          placeholder="tipo de problema.."
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
        />
      ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
            <InputField
              label="Full Name:"
              type="text"
              placeholder="Digite o full name"
              value={fullname}
              onChange={handleFullNameChange}
            />
            <InputField
              label="Celular:"
              type="tel"
              placeholder="Digite o número de telefone"
              value={phone}
              onChange={handlePhoneChange}
              pattern="\(\d{2}\) \d{5}-\d{4}"
            />
            <InputField
              label="Email:"
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={handleEmailChange}
            />
            <textarea
              className="h-40 w-full my-2 focus:outline-none p-3 shadow-lg rounded-lg"
              placeholder="tipo de problema.."
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
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
      )}

      <NavButton
        imageSrc="/assets/images/screen3.jpeg"
        altText="I still have a problem"
        text="Ainda tenho um problema"
      />
    </div>
  );
};

export default ProblemDetails;
