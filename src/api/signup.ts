import axios from "axios";
import { keysToCamelCase } from "../utils/helpers";

const API_URL =
  "https://api.biometria.automais.tec.br/api/Autenticacao/Simples";

interface Credentials {
  cpf: string;
  birthDate: string;
}

interface UserResponse {
  nome: string;
  token: string;
  id: string;
}

export const signup = async (
  credentials: Credentials
): Promise<UserResponse | null | undefined> => {
  try {
    const response = await axios.post(API_URL, {
      cpf: credentials.cpf,
      dataDeNascimento: credentials.birthDate,
    });

    const camelCaseData = keysToCamelCase(response?.data);
    if (camelCaseData?.nome) {
      return response?.data;
    }

    alert("Dados não encontrados.");
    return;

    // return response;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};
