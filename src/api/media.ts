import axios from "axios";
import { UserData } from "../types";

const API_URL =
  "https://api.biometria.automais.tec.br/api/Funcionario/AtualizaFuncionario";

export const captureImage = async (
  payload: UserData
): Promise<string | null | undefined> => {
  try {
    const response = await axios.post(API_URL, {
      ...payload,
      foto: payload?.foto?.replace(/^data:image\/[a-zA-Z]+;base64,/, ""),
    });

    console.log(response);
    if (response) return response.data;
    return;

    // return response;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};
