export const links = {
  org: "https://github.com/UVAEstudantes",
  frontend: "https://github.com/UVAEstudantes/noponto-frontend",
  backend: "https://github.com/UVAEstudantes/noponto-backend",
  releases: "https://github.com/UVAEstudantes/.github/releases",
};
export const asset = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}`;
export const screenshots = [
  [
    "004",
    "A cidade no mapa",
    "Veículos, paradas e itinerários em uma só visão.",
  ],
  [
    "001",
    "Seu ônibus, em detalhes",
    "Linha, sentido e atualização do veículo.",
  ],
  ["002", "Está chegando", "Aproximações estimadas para a sua parada."],
  [
    "008",
    "O seu ponto de partida",
    "Informações e próximas chegadas da parada.",
  ],
  [
    "010",
    "Por aqui passa qual linha?",
    "Conheça as linhas que atendem a parada.",
  ],
  [
    "003",
    "Sua espera no radar",
    "Escolha as linhas e a antecedência dos avisos.",
  ],
  ["005", "Do seu jeito", "Perfil local e linhas favoritas."],
  ["007", "Pode chegar", "Um tutorial para os primeiros passos."],
  [
    "009",
    "Uma prévia do caminho",
    "Rotinas demonstrativas, ainda sem viagens calculadas.",
  ],
  [
    "006",
    "O que vem pela frente",
    "Estatísticas ilustrativas, sem histórico real.",
  ],
  ["011", "Radar no bolso", "Notificação compacta no Android."],
  ["012", "A espera em detalhes", "Notificação expandida e ações rápidas."],
] as const;
export const future = [
  [
    "Mais acessibilidade",
    "Evoluir os recursos de voz e oferecer interfaces mais simples para diferentes necessidades.",
  ],
  [
    "Uma cidade que colabora",
    "Estudar informações da comunidade sobre linhas, paradas e estações, com cuidado na validação dos relatos.",
  ],
  [
    "Mais caminhos possíveis",
    "Explorar alternativas de trajetos e novas integrações conforme a disponibilidade das fontes. São propostas, sem datas prometidas.",
  ],
];
