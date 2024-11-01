type SignupError = "cpf" | "email" | "phone" | "birthDate";

type SignupErrors = Record<SignupError, string | null>;

export type { SignupError, SignupErrors};
