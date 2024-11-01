type LoginError = "cpf" | "phote";

type LoginErrors = Record<LoginError, string | null>;

export type { LoginError, LoginErrors};
