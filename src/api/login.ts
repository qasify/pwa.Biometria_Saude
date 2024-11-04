import axios from "axios";
import { keysToCamelCase } from "../utils/helpers";

const API_URL =
  "https://api.biometria.automais.tec.br/api/Autenticacao/CpfFoto";

interface Credentials {
  cpf: string;
  foto: string;
}

interface UserResponse {
  nome: string;
  token: string;
  id: string;
}

export const login = async (
  credentials: Credentials
): Promise<UserResponse | null | undefined> => {
  try {
    const response = await axios.post(API_URL, {
      cpf: credentials.cpf,
      foto: credentials.foto.replace(/^data:image\/[a-zA-Z]+;base64,/, ""),
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
