export type AuthUser = {
  id: string;
  token: string;
  nome?: string;
};


export type UserData = AuthUser & {
  cpf: string;
  dataDeNascimento: string; // Assuming the date is in ISO format or a string; otherwise, you can use Date
  phone?: string;
  email?: string;
  foto?: string; // Base64 encoded image data
};

