type LogInError = "cpf" | "email" | "phone" | "birthDate";

type LogInErrors = Record<LogInError, string | null>;

export type { LogInError, LogInErrors };
