import axios from "axios";
import { UserLogs } from "../types/UserLogs";

const API_URL =
  "https://api.biometria.automais.tec.br/api/ApuracaoPonto/ApuracaoPonto";

interface Params {
  id: number;
  dataInicio: string;
  dataFim: string;
  token: string;
}

export const getLogs = async (
  params: Params
): Promise<UserLogs | null | undefined> => {
  try {
    const response = await axios.post(API_URL, params);
    return response.data;

    // return response;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};
