const formatCpf = (cpf: string): string => {
  let value = cpf?.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return value;
};

const formatPhone = (phone: string): string => {
  let value = phone.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  if (value.length <= 11) {
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }
  return value;
};

const formatDateToISO = (date: string | null) => {
  const isoString = date?.length
    ? new Date(date).toISOString()
    : new Date().toISOString();
  return isoString;
};

const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, (match) => {
    return match.toUpperCase().replace("-", "").replace("_", "");
  });
};

export { formatCpf, formatPhone, formatDateToISO, toCamelCase };
