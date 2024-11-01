export type UserData = {
  id: string;
  cpf: string;
  dataDeNascimento: string; // Assuming the date is in ISO format or a string; otherwise, you can use Date
  phone: string;
  email: string;
  foto?: string; // Base64 encoded image data
  token: string;
};
