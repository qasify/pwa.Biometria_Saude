export interface ProblemType {
  id: number;
  label: string;
  color: string;
  icon?: string;
  text?: string;
  href?: string;
}

const PROBLEMS_LIST: ProblemType[] = [
  {
    id: 1,
    label: "Não sou eu na foto",
    color: "#FDECEC",
    icon: "📷",
    text: "Caso tenha seu registro de ponto e você não foi identificado, basta fazer um novo cadastro.<br/> Caso tenha feito um novo cadastro e a foto não foi substituída, pedimos que repeita o procedimento mais uma vez, pois pode ter ocorrido problema de internet ou conexão com o relógio.<br/> Caso tenha feito o cadastro mais de 3 vezes e seu cadastro não foi ativado no local onde esta, pedimos que acione o suporte na tela anterior. ",
  },
  {
    id: 2,
    label: "Relógio desligado",
    color: "#FCE2E2",
    icon: "📵",
    text: "Em caso de relógio desligado, solicitamos que procure o responsável atual do TI.",
  },
  {
    id: 3,
    label: "Escolhi a matrícula errada",
    color: "#EDE8F6",
    icon: "🔢",
    text: "Aguarde 15 minutos e refaça seu registro fácil.",
  },
  {
    id: 4,
    label: "Não consigo cadastrar minha presença",
    color: "#FFF3CD",
    icon: '⚠️',
    text: "Verifique sua conexão da internet. Caso possa, conect em uma rede wi-fi.",
  },
  {
    id: 5,
    label: "Não consigo ativar minha presença",
    color: "#FFF1CC",
    icon: "❗",
    text: "Aguarde 15 minutos e tente ativar novamente.",
  },
  {
    id: 6,
    label: "Quero ver minha folha de ponto",
    color: "#E3F3E5",
    icon: "📄",
    text: "Acesse seu App RH ID.",
  },
  {
    id: 7,
    label: "Quero registrar uma ausência",
    color: "#FAE7EB",
    icon: "📅",
    text: "Todos as ausências podem ser lançadas diretamente no App RH ID.",
  },
  {
    id: 8,
    label: "Quero baixar o RH ID",
    color: "#E2EEFA",
    icon: "📲",
    href: "www.google.com.br",
  },
  {
    id: 9,
    label: "Suporte",
    color: "#F3F3F3",
    icon: "✉️",
    text: "Ligue para 21986946432",
  },
];

export default PROBLEMS_LIST;
