// Mock data for Prime package

// Registro de Ponto - Time Tracking Prime
export const inconsistenciasPorEmpresa = [
  { empresa: "Nexti", totalInconsistencias: 89, qualidadeMarcacao: 85.2 },
  { empresa: "G4S", totalInconsistencias: 76, qualidadeMarcacao: 87.5 },
  { empresa: "JCC", totalInconsistencias: 65, qualidadeMarcacao: 88.1 },
  { empresa: "Verzani", totalInconsistencias: 42, qualidadeMarcacao: 90.3 },
  { empresa: "Orsegups", totalInconsistencias: 28, qualidadeMarcacao: 92.5 },
];

// Qualidade das Marcações por Empresa com hierarquia (empresa -> cliente -> posto -> colaborador)
export const qualidadeMarcacoesDetalhadas = [
  {
    empresa: "Nexti",
    totalInconsistencias: 89,
    qualidadeMarcacao: 85.2,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        totalInconsistencias: 50,
        qualidadeMarcacao: 84.5,
        postos: [
          {
            posto: "Porteiro Shopping",
            totalInconsistencias: 30,
            qualidadeMarcacao: 83.2,
            colaboradores: [
              { colaborador: "João Silva", totalInconsistencias: 15, qualidadeMarcacao: 82.5 },
              { colaborador: "Maria Santos", totalInconsistencias: 10, qualidadeMarcacao: 84.0 },
              { colaborador: "Pedro Costa", totalInconsistencias: 5, qualidadeMarcacao: 86.5 },
            ]
          },
          {
            posto: "Vigilante Noturno",
            totalInconsistencias: 20,
            qualidadeMarcacao: 86.2,
            colaboradores: [
              { colaborador: "Carlos Lima", totalInconsistencias: 12, qualidadeMarcacao: 85.5 },
              { colaborador: "Ana Paula", totalInconsistencias: 8, qualidadeMarcacao: 87.8 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        totalInconsistencias: 39,
        qualidadeMarcacao: 86.1,
        postos: [
          {
            posto: "Recepcionista",
            totalInconsistencias: 20,
            qualidadeMarcacao: 85.5,
            colaboradores: [
              { colaborador: "Juliana Rocha", totalInconsistencias: 12, qualidadeMarcacao: 84.8 },
              { colaborador: "Roberto Alves", totalInconsistencias: 8, qualidadeMarcacao: 86.5 },
            ]
          },
          {
            posto: "Portaria",
            totalInconsistencias: 19,
            qualidadeMarcacao: 86.8,
            colaboradores: [
              { colaborador: "Fernando Dias", totalInconsistencias: 10, qualidadeMarcacao: 86.2 },
              { colaborador: "Mariana Souza", totalInconsistencias: 9, qualidadeMarcacao: 87.5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    totalInconsistencias: 76,
    qualidadeMarcacao: 87.5,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        totalInconsistencias: 45,
        qualidadeMarcacao: 86.8,
        postos: [
          {
            posto: "Vigilante",
            totalInconsistencias: 28,
            qualidadeMarcacao: 86.2,
            colaboradores: [
              { colaborador: "Lucas Martins", totalInconsistencias: 16, qualidadeMarcacao: 85.5 },
              { colaborador: "Patricia Gomes", totalInconsistencias: 12, qualidadeMarcacao: 87.2 },
            ]
          },
          {
            posto: "Supervisor",
            totalInconsistencias: 17,
            qualidadeMarcacao: 87.8,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", totalInconsistencias: 10, qualidadeMarcacao: 87.0 },
              { colaborador: "Camila Ferreira", totalInconsistencias: 7, qualidadeMarcacao: 89.0 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        totalInconsistencias: 31,
        qualidadeMarcacao: 88.5,
        postos: [
          {
            posto: "Porteiro",
            totalInconsistencias: 31,
            qualidadeMarcacao: 88.5,
            colaboradores: [
              { colaborador: "Thiago Oliveira", totalInconsistencias: 18, qualidadeMarcacao: 87.8 },
              { colaborador: "Fernanda Ribeiro", totalInconsistencias: 13, qualidadeMarcacao: 89.5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    totalInconsistencias: 65,
    qualidadeMarcacao: 88.1,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        totalInconsistencias: 65,
        qualidadeMarcacao: 88.1,
        postos: [
          {
            posto: "Auxiliar de Limpeza",
            totalInconsistencias: 38,
            qualidadeMarcacao: 87.2,
            colaboradores: [
              { colaborador: "Sandra Mendes", totalInconsistencias: 22, qualidadeMarcacao: 86.5 },
              { colaborador: "Paulo Nunes", totalInconsistencias: 16, qualidadeMarcacao: 88.2 },
            ]
          },
          {
            posto: "Porteiro",
            totalInconsistencias: 27,
            qualidadeMarcacao: 89.5,
            colaboradores: [
              { colaborador: "Marcos Pereira", totalInconsistencias: 15, qualidadeMarcacao: 88.8 },
              { colaborador: "Adriana Castro", totalInconsistencias: 12, qualidadeMarcacao: 90.5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    totalInconsistencias: 42,
    qualidadeMarcacao: 90.3,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        totalInconsistencias: 42,
        qualidadeMarcacao: 90.3,
        postos: [
          {
            posto: "Recepcionista",
            totalInconsistencias: 24,
            qualidadeMarcacao: 89.8,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", totalInconsistencias: 14, qualidadeMarcacao: 89.2 },
              { colaborador: "Gabriel Soares", totalInconsistencias: 10, qualidadeMarcacao: 90.5 },
            ]
          },
          {
            posto: "Vigilante",
            totalInconsistencias: 18,
            qualidadeMarcacao: 91.0,
            colaboradores: [
              { colaborador: "Renato Cunha", totalInconsistencias: 10, qualidadeMarcacao: 90.5 },
              { colaborador: "Larissa Moura", totalInconsistencias: 8, qualidadeMarcacao: 91.8 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    totalInconsistencias: 28,
    qualidadeMarcacao: 92.5,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        totalInconsistencias: 28,
        qualidadeMarcacao: 92.5,
        postos: [
          {
            posto: "Supervisor",
            totalInconsistencias: 16,
            qualidadeMarcacao: 92.0,
            colaboradores: [
              { colaborador: "Eduardo Correia", totalInconsistencias: 9, qualidadeMarcacao: 91.5 },
              { colaborador: "Tatiana Azevedo", totalInconsistencias: 7, qualidadeMarcacao: 92.8 },
            ]
          },
          {
            posto: "Porteiro",
            totalInconsistencias: 12,
            qualidadeMarcacao: 93.2,
            colaboradores: [
              { colaborador: "André Monteiro", totalInconsistencias: 7, qualidadeMarcacao: 92.8 },
              { colaborador: "Simone Reis", totalInconsistencias: 5, qualidadeMarcacao: 93.8 },
            ]
          },
        ]
      },
    ]
  },
];

// Inconsistências por Empresa com hierarquia (empresa -> cliente -> posto -> colaborador)
export const inconsistenciasDetalhadas = [
  {
    empresa: "Nexti",
    totalInconsistencias: 89,
    totalTratadas: 75,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        totalInconsistencias: 50,
        totalTratadas: 42,
        postos: [
          {
            posto: "Porteiro Shopping",
            totalInconsistencias: 30,
            totalTratadas: 25,
            colaboradores: [
              { colaborador: "João Silva", totalInconsistencias: 15, totalTratadas: 12 },
              { colaborador: "Maria Santos", totalInconsistencias: 10, totalTratadas: 8 },
              { colaborador: "Pedro Costa", totalInconsistencias: 5, totalTratadas: 5 },
            ]
          },
          {
            posto: "Vigilante Noturno",
            totalInconsistencias: 20,
            totalTratadas: 17,
            colaboradores: [
              { colaborador: "Carlos Lima", totalInconsistencias: 12, totalTratadas: 10 },
              { colaborador: "Ana Paula", totalInconsistencias: 8, totalTratadas: 7 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        totalInconsistencias: 39,
        totalTratadas: 33,
        postos: [
          {
            posto: "Recepcionista",
            totalInconsistencias: 20,
            totalTratadas: 17,
            colaboradores: [
              { colaborador: "Juliana Rocha", totalInconsistencias: 12, totalTratadas: 10 },
              { colaborador: "Roberto Alves", totalInconsistencias: 8, totalTratadas: 7 },
            ]
          },
          {
            posto: "Portaria",
            totalInconsistencias: 19,
            totalTratadas: 16,
            colaboradores: [
              { colaborador: "Fernando Dias", totalInconsistencias: 10, totalTratadas: 8 },
              { colaborador: "Mariana Souza", totalInconsistencias: 9, totalTratadas: 8 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    totalInconsistencias: 76,
    totalTratadas: 68,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        totalInconsistencias: 45,
        totalTratadas: 40,
        postos: [
          {
            posto: "Vigilante",
            totalInconsistencias: 28,
            totalTratadas: 25,
            colaboradores: [
              { colaborador: "Lucas Martins", totalInconsistencias: 16, totalTratadas: 14 },
              { colaborador: "Patricia Gomes", totalInconsistencias: 12, totalTratadas: 11 },
            ]
          },
          {
            posto: "Supervisor",
            totalInconsistencias: 17,
            totalTratadas: 15,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", totalInconsistencias: 10, totalTratadas: 9 },
              { colaborador: "Camila Ferreira", totalInconsistencias: 7, totalTratadas: 6 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        totalInconsistencias: 31,
        totalTratadas: 28,
        postos: [
          {
            posto: "Porteiro",
            totalInconsistencias: 31,
            totalTratadas: 28,
            colaboradores: [
              { colaborador: "Thiago Oliveira", totalInconsistencias: 18, totalTratadas: 16 },
              { colaborador: "Fernanda Ribeiro", totalInconsistencias: 13, totalTratadas: 12 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    totalInconsistencias: 65,
    totalTratadas: 55,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        totalInconsistencias: 65,
        totalTratadas: 55,
        postos: [
          {
            posto: "Auxiliar de Limpeza",
            totalInconsistencias: 38,
            totalTratadas: 32,
            colaboradores: [
              { colaborador: "Sandra Mendes", totalInconsistencias: 22, totalTratadas: 18 },
              { colaborador: "Paulo Nunes", totalInconsistencias: 16, totalTratadas: 14 },
            ]
          },
          {
            posto: "Porteiro",
            totalInconsistencias: 27,
            totalTratadas: 23,
            colaboradores: [
              { colaborador: "Marcos Pereira", totalInconsistencias: 15, totalTratadas: 13 },
              { colaborador: "Adriana Castro", totalInconsistencias: 12, totalTratadas: 10 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    totalInconsistencias: 42,
    totalTratadas: 38,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        totalInconsistencias: 42,
        totalTratadas: 38,
        postos: [
          {
            posto: "Recepcionista",
            totalInconsistencias: 24,
            totalTratadas: 22,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", totalInconsistencias: 14, totalTratadas: 13 },
              { colaborador: "Gabriel Soares", totalInconsistencias: 10, totalTratadas: 9 },
            ]
          },
          {
            posto: "Vigilante",
            totalInconsistencias: 18,
            totalTratadas: 16,
            colaboradores: [
              { colaborador: "Renato Cunha", totalInconsistencias: 10, totalTratadas: 9 },
              { colaborador: "Larissa Moura", totalInconsistencias: 8, totalTratadas: 7 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    totalInconsistencias: 28,
    totalTratadas: 26,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        totalInconsistencias: 28,
        totalTratadas: 26,
        postos: [
          {
            posto: "Supervisor",
            totalInconsistencias: 16,
            totalTratadas: 15,
            colaboradores: [
              { colaborador: "Eduardo Correia", totalInconsistencias: 9, totalTratadas: 9 },
              { colaborador: "Tatiana Azevedo", totalInconsistencias: 7, totalTratadas: 6 },
            ]
          },
          {
            posto: "Porteiro",
            totalInconsistencias: 12,
            totalTratadas: 11,
            colaboradores: [
              { colaborador: "André Monteiro", totalInconsistencias: 7, totalTratadas: 6 },
              { colaborador: "Simone Reis", totalInconsistencias: 5, totalTratadas: 5 },
            ]
          },
        ]
      },
    ]
  },
];

// Solicitações de Justificativa por Empresa com hierarquia
export const solicitacoesDetalhadas = [
  {
    empresa: "Nexti",
    totalSolicitacoes: 58,
    totalTratadas: 52,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        totalSolicitacoes: 32,
        totalTratadas: 29,
        postos: [
          {
            posto: "Porteiro Shopping",
            totalSolicitacoes: 18,
            totalTratadas: 16,
            colaboradores: [
              { colaborador: "João Silva", totalSolicitacoes: 10, totalTratadas: 9 },
              { colaborador: "Maria Santos", totalSolicitacoes: 5, totalTratadas: 5 },
              { colaborador: "Pedro Costa", totalSolicitacoes: 3, totalTratadas: 2 },
            ]
          },
          {
            posto: "Vigilante Noturno",
            totalSolicitacoes: 14,
            totalTratadas: 13,
            colaboradores: [
              { colaborador: "Carlos Lima", totalSolicitacoes: 8, totalTratadas: 8 },
              { colaborador: "Ana Paula", totalSolicitacoes: 6, totalTratadas: 5 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        totalSolicitacoes: 26,
        totalTratadas: 23,
        postos: [
          {
            posto: "Recepcionista",
            totalSolicitacoes: 14,
            totalTratadas: 12,
            colaboradores: [
              { colaborador: "Juliana Rocha", totalSolicitacoes: 8, totalTratadas: 7 },
              { colaborador: "Roberto Alves", totalSolicitacoes: 6, totalTratadas: 5 },
            ]
          },
          {
            posto: "Portaria",
            totalSolicitacoes: 12,
            totalTratadas: 11,
            colaboradores: [
              { colaborador: "Fernando Dias", totalSolicitacoes: 7, totalTratadas: 6 },
              { colaborador: "Mariana Souza", totalSolicitacoes: 5, totalTratadas: 5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    totalSolicitacoes: 42,
    totalTratadas: 38,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        totalSolicitacoes: 25,
        totalTratadas: 23,
        postos: [
          {
            posto: "Vigilante",
            totalSolicitacoes: 15,
            totalTratadas: 14,
            colaboradores: [
              { colaborador: "Lucas Martins", totalSolicitacoes: 9, totalTratadas: 8 },
              { colaborador: "Patricia Gomes", totalSolicitacoes: 6, totalTratadas: 6 },
            ]
          },
          {
            posto: "Supervisor",
            totalSolicitacoes: 10,
            totalTratadas: 9,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", totalSolicitacoes: 6, totalTratadas: 5 },
              { colaborador: "Camila Ferreira", totalSolicitacoes: 4, totalTratadas: 4 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        totalSolicitacoes: 17,
        totalTratadas: 15,
        postos: [
          {
            posto: "Porteiro",
            totalSolicitacoes: 17,
            totalTratadas: 15,
            colaboradores: [
              { colaborador: "Thiago Oliveira", totalSolicitacoes: 10, totalTratadas: 9 },
              { colaborador: "Fernanda Ribeiro", totalSolicitacoes: 7, totalTratadas: 6 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    totalSolicitacoes: 35,
    totalTratadas: 30,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        totalSolicitacoes: 35,
        totalTratadas: 30,
        postos: [
          {
            posto: "Auxiliar de Limpeza",
            totalSolicitacoes: 20,
            totalTratadas: 17,
            colaboradores: [
              { colaborador: "Sandra Mendes", totalSolicitacoes: 12, totalTratadas: 10 },
              { colaborador: "Paulo Nunes", totalSolicitacoes: 8, totalTratadas: 7 },
            ]
          },
          {
            posto: "Porteiro",
            totalSolicitacoes: 15,
            totalTratadas: 13,
            colaboradores: [
              { colaborador: "Marcos Pereira", totalSolicitacoes: 9, totalTratadas: 8 },
              { colaborador: "Adriana Castro", totalSolicitacoes: 6, totalTratadas: 5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    totalSolicitacoes: 28,
    totalTratadas: 26,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        totalSolicitacoes: 28,
        totalTratadas: 26,
        postos: [
          {
            posto: "Recepcionista",
            totalSolicitacoes: 16,
            totalTratadas: 15,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", totalSolicitacoes: 9, totalTratadas: 9 },
              { colaborador: "Gabriel Soares", totalSolicitacoes: 7, totalTratadas: 6 },
            ]
          },
          {
            posto: "Vigilante",
            totalSolicitacoes: 12,
            totalTratadas: 11,
            colaboradores: [
              { colaborador: "Renato Cunha", totalSolicitacoes: 7, totalTratadas: 7 },
              { colaborador: "Larissa Moura", totalSolicitacoes: 5, totalTratadas: 4 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    totalSolicitacoes: 21,
    totalTratadas: 20,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        totalSolicitacoes: 21,
        totalTratadas: 20,
        postos: [
          {
            posto: "Supervisor",
            totalSolicitacoes: 12,
            totalTratadas: 12,
            colaboradores: [
              { colaborador: "Eduardo Correia", totalSolicitacoes: 7, totalTratadas: 7 },
              { colaborador: "Tatiana Azevedo", totalSolicitacoes: 5, totalTratadas: 5 },
            ]
          },
          {
            posto: "Porteiro",
            totalSolicitacoes: 9,
            totalTratadas: 8,
            colaboradores: [
              { colaborador: "André Monteiro", totalSolicitacoes: 5, totalTratadas: 5 },
              { colaborador: "Simone Reis", totalSolicitacoes: 4, totalTratadas: 3 },
            ]
          },
        ]
      },
    ]
  },
];

export const evolucaoInconsistencias = [
  { mes: "Jan", inconsistencias: 320, tratadas: 285 },
  { mes: "Fev", inconsistencias: 290, tratadas: 265 },
  { mes: "Mar", inconsistencias: 310, tratadas: 278 },
  { mes: "Abr", inconsistencias: 280, tratadas: 252 },
  { mes: "Mai", inconsistencias: 300, tratadas: 270 },
  { mes: "Jun", inconsistencias: 300, tratadas: 267 },
];

export const evolucaoQualidadeMarcacoes = [
  { mes: "Jan", qualidade: 84.2 },
  { mes: "Fev", qualidade: 85.5 },
  { mes: "Mar", qualidade: 86.1 },
  { mes: "Abr", qualidade: 87.3 },
  { mes: "Mai", qualidade: 88.0 },
  { mes: "Jun", qualidade: 88.7 },
];

// Detalhamento por Cliente (para modal)
export const inconsistenciasPorCliente = (empresa: string) => {
  const clientesPorEmpresa: Record<string, any[]> = {
    "Nexti": [
      { cliente: "Cliente A1", totalInconsistencias: 45, qualidadeMarcacao: 89.2 },
      { cliente: "Cliente A2", totalInconsistencias: 38, qualidadeMarcacao: 90.1 },
      { cliente: "Cliente A3", totalInconsistencias: 32, qualidadeMarcacao: 91.5 },
    ],
    "G4S": [
      { cliente: "Cliente B1", totalInconsistencias: 52, qualidadeMarcacao: 87.8 },
      { cliente: "Cliente B2", totalInconsistencias: 41, qualidadeMarcacao: 89.5 },
      { cliente: "Cliente B3", totalInconsistencias: 35, qualidadeMarcacao: 90.8 },
    ],
    "JCC": [
      { cliente: "Cliente C1", totalInconsistencias: 28, qualidadeMarcacao: 92.1 },
      { cliente: "Cliente C2", totalInconsistencias: 25, qualidadeMarcacao: 92.8 },
      { cliente: "Cliente C3", totalInconsistencias: 22, qualidadeMarcacao: 93.2 },
    ],
    "Verzani": [
      { cliente: "Cliente D1", totalInconsistencias: 18, qualidadeMarcacao: 93.5 },
      { cliente: "Cliente D2", totalInconsistencias: 15, qualidadeMarcacao: 94.1 },
      { cliente: "Cliente D3", totalInconsistencias: 9, qualidadeMarcacao: 95.2 },
    ],
    "Orsegups": [
      { cliente: "Cliente E1", totalInconsistencias: 12, qualidadeMarcacao: 95.8 },
      { cliente: "Cliente E2", totalInconsistencias: 10, qualidadeMarcacao: 96.2 },
      { cliente: "Cliente E3", totalInconsistencias: 6, qualidadeMarcacao: 97.1 },
    ],
  };
  return clientesPorEmpresa[empresa] || [];
};

// Detalhamento por Posto (para modal de segundo nível)
export const inconsistenciasPorPosto = (cliente: string) => {
  const postosPorCliente: Record<string, any[]> = {
    "Cliente A1": [
      { posto: "Posto 101", totalInconsistencias: 18, qualidadeMarcacao: 88.5 },
      { posto: "Posto 102", totalInconsistencias: 15, qualidadeMarcacao: 89.8 },
      { posto: "Posto 103", totalInconsistencias: 12, qualidadeMarcacao: 90.2 },
    ],
    "Cliente A2": [
      { posto: "Posto 201", totalInconsistencias: 16, qualidadeMarcacao: 89.5 },
      { posto: "Posto 202", totalInconsistencias: 12, qualidadeMarcacao: 90.5 },
      { posto: "Posto 203", totalInconsistencias: 10, qualidadeMarcacao: 91.0 },
    ],
    "Cliente B1": [
      { posto: "Posto 301", totalInconsistencias: 22, qualidadeMarcacao: 86.8 },
      { posto: "Posto 302", totalInconsistencias: 18, qualidadeMarcacao: 88.2 },
      { posto: "Posto 303", totalInconsistencias: 12, qualidadeMarcacao: 89.5 },
    ],
  };
  return postosPorCliente[cliente] || [
    { posto: "Posto Geral 1", totalInconsistencias: 8, qualidadeMarcacao: 91.2 },
    { posto: "Posto Geral 2", totalInconsistencias: 7, qualidadeMarcacao: 91.8 },
    { posto: "Posto Geral 3", totalInconsistencias: 6, qualidadeMarcacao: 92.5 },
  ];
};

export const tiposInconsistencias = [
  { name: "Horário Inválido", value: 29.7, color: "hsl(var(--chart-1))" },
  { name: "Não Registrado", value: 25.3, color: "hsl(var(--chart-2))" },
  { name: "Terminal Não Autorizado", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Fora do Perímetro", value: 16, color: "hsl(var(--chart-4))" },
  { name: "Marcação Duplicada", value: 11, color: "hsl(var(--chart-5))" },
];

export const motivosAjuste = [
  { name: "Esquecimento de marcar", value: 24.5, color: "hsl(var(--chart-1))" },
  { name: "Erro no horário", value: 19.8, color: "hsl(var(--chart-2))" },
  { name: "Problema técnico no terminal", value: 15.6, color: "hsl(var(--chart-3))" },
  { name: "Ausência não registrada", value: 14.2, color: "hsl(var(--chart-4))" },
  { name: "Marcação em local errado", value: 12.7, color: "hsl(var(--chart-5))" },
  { name: "Outros", value: 13.2, color: "hsl(var(--chart-6))" },
];

// Evolução do Tempo de Tratativa das Inconsistências
export const evolucaoTratativas = [
  { mes: "Jan", tempoMedio: 3.2 },
  { mes: "Fev", tempoMedio: 3.0 },
  { mes: "Mar", tempoMedio: 2.8 },
  { mes: "Abr", tempoMedio: 2.7 },
  { mes: "Mai", tempoMedio: 2.6 },
  { mes: "Jun", tempoMedio: 2.5 },
];

// Tratativas de Ponto por Operador
export const tratativasPorOperador = [
  { operador: "Carlos Silva", quantidade: 125 },
  { operador: "Ana Santos", quantidade: 98 },
  { operador: "Pedro Oliveira", quantidade: 87 },
  { operador: "Maria Costa", quantidade: 76 },
  { operador: "João Souza", quantidade: 64 },
  { operador: "Julia Lima", quantidade: 52 },
];

export const top10ColaboradoresInconsistencias = [
  { rank: 1, nome: "João Silva", posto: "Porteiro", empresa: "Nexti", inconsistencias: 45 },
  { rank: 2, nome: "Maria Santos", posto: "Recepcionista", empresa: "G4S", inconsistencias: 38 },
  { rank: 3, nome: "Pedro Costa", posto: "Auxiliar de Limpeza", empresa: "JCC", inconsistencias: 35 },
  { rank: 4, nome: "Ana Oliveira", posto: "Assistente de Serviços Gerais", empresa: "Nexti", inconsistencias: 32 },
  { rank: 5, nome: "Carlos Souza", posto: "Supervisor", empresa: "G4S", inconsistencias: 28 },
  { rank: 6, nome: "Julia Lima", posto: "Porteiro", empresa: "JCC", inconsistencias: 25 },
  { rank: 7, nome: "Roberto Alves", posto: "Auxiliar de Limpeza", empresa: "Nexti", inconsistencias: 22 },
  { rank: 8, nome: "Fernanda Dias", posto: "Recepcionista", empresa: "G4S", inconsistencias: 20 },
  { rank: 9, nome: "Lucas Mendes", posto: "Assistente de Serviços Gerais", empresa: "Nexti", inconsistencias: 18 },
  { rank: 10, nome: "Patricia Rocha", posto: "Supervisor", empresa: "JCC", inconsistencias: 15 },
];

export const top10PostosInconsistencias = [
  { rank: 1, posto: "Porteiro", empresa: "Nexti", inconsistencias: 125 },
  { rank: 2, posto: "Recepcionista", empresa: "G4S", inconsistencias: 98 },
  { rank: 3, posto: "Auxiliar de Limpeza", empresa: "JCC", inconsistencias: 87 },
  { rank: 4, posto: "Assistente de Serviços Gerais", empresa: "Nexti", inconsistencias: 76 },
  { rank: 5, posto: "Supervisor", empresa: "G4S", inconsistencias: 68 },
  { rank: 6, posto: "Vigilante", empresa: "Verzani", inconsistencias: 54 },
  { rank: 7, posto: "Porteiro", empresa: "JCC", inconsistencias: 48 },
  { rank: 8, posto: "Recepcionista", empresa: "Orsegups", inconsistencias: 42 },
  { rank: 9, posto: "Auxiliar de Limpeza", empresa: "Nexti", inconsistencias: 35 },
  { rank: 10, posto: "Supervisor", empresa: "JCC", inconsistencias: 28 },
];

// Operacional - Operational Prime
export const absencesByEmployee = [
  { rank: 1, name: "João Silva", role: "Porteiro", absences: 12, type: "Falta" },
  { rank: 2, name: "Maria Santos", role: "Recepcionista", absences: 10, type: "Atestado" },
  { rank: 3, name: "Pedro Costa", role: "Auxiliar de Limpeza", absences: 9, type: "Falta" },
  { rank: 4, name: "Ana Oliveira", role: "Assistente", absences: 8, type: "Atestado" },
  { rank: 5, name: "Carlos Souza", role: "Supervisor", absences: 7, type: "Falta" },
  { rank: 6, name: "Julia Lima", role: "Porteiro", absences: 6, type: "Atestado" },
  { rank: 7, name: "Roberto Alves", role: "Auxiliar de Limpeza", absences: 6, type: "Falta" },
  { rank: 8, name: "Fernanda Dias", role: "Recepcionista", absences: 5, type: "Atestado" },
  { rank: 9, name: "Lucas Mendes", role: "Assistente", absences: 5, type: "Falta" },
  { rank: 10, name: "Patricia Rocha", role: "Supervisor", absences: 4, type: "Atestado" },
];

export const workloadDeviationByEmployee = [
  { rank: 1, name: "João Silva", role: "Porteiro", planned: 176, realized: 190, deviation: 14, type: "Excesso" },
  { rank: 2, name: "Maria Santos", role: "Recepcionista", planned: 176, realized: 165, deviation: -11, type: "Deficiência" },
  { rank: 3, name: "Pedro Costa", role: "Auxiliar", planned: 176, realized: 188, deviation: 12, type: "Excesso" },
  { rank: 4, name: "Ana Oliveira", role: "Assistente", planned: 176, realized: 166, deviation: -10, type: "Deficiência" },
  { rank: 5, name: "Carlos Souza", role: "Supervisor", planned: 176, realized: 186, deviation: 10, type: "Excesso" },
  { rank: 6, name: "Julia Lima", role: "Porteiro", planned: 176, realized: 168, deviation: -8, type: "Deficiência" },
  { rank: 7, name: "Roberto Alves", role: "Auxiliar", planned: 176, realized: 184, deviation: 8, type: "Excesso" },
  { rank: 8, name: "Fernanda Dias", role: "Recepcionista", planned: 176, realized: 169, deviation: -7, type: "Deficiência" },
  { rank: 9, name: "Lucas Mendes", role: "Assistente", planned: 176, realized: 183, deviation: 7, type: "Excesso" },
  { rank: 10, name: "Patricia Rocha", role: "Supervisor", planned: 176, realized: 170, deviation: -6, type: "Deficiência" },
];

export const overstaffedPositions = [
  { position: "Posto A - Shopping Center", expected: 5, actual: 8, excess: 3 },
  { position: "Posto B - Condomínio Residencial", expected: 3, actual: 6, excess: 3 },
  { position: "Posto C - Hospital Regional", expected: 10, actual: 12, excess: 2 },
  { position: "Posto D - Universidade", expected: 7, actual: 9, excess: 2 },
  { position: "Posto E - Fábrica", expected: 15, actual: 16, excess: 1 },
];

export const uncoveredPositionsByUnit = [
  { unit: "Orsegups", uncovered: 12 },
  { unit: "Nexti", uncovered: 8 },
  { unit: "Orbenk", uncovered: 7 },
  { unit: "Verzani", uncovered: 5 },
  { unit: "G4S", uncovered: 4 },
  { unit: "JCC", uncovered: 3 },
];

// Eventos de Postos Descobertos por Empresa
export const eventosPostosDescobertosDetalhado = {
  "Empresa A": {
    cnpj: "12.345.678/0001-90",
    numeroEventos: 15,
    clientes: {
      "Cliente A1": {
        cnpj: "11.222.333/0001-44",
        numeroEventos: 8,
        postos: [
          { posto: "Posto A1-1", cc: "CC-1001", numeroEventos: 4 },
          { posto: "Posto A1-2", cc: "CC-1002", numeroEventos: 4 },
        ]
      },
      "Cliente A2": {
        cnpj: "11.222.333/0002-55",
        numeroEventos: 7,
        postos: [
          { posto: "Posto A2-1", cc: "CC-1003", numeroEventos: 3 },
          { posto: "Posto A2-2", cc: "CC-1004", numeroEventos: 4 },
        ]
      }
    }
  },
  "Empresa B": {
    cnpj: "98.765.432/0001-10",
    numeroEventos: 13,
    clientes: {
      "Cliente B1": {
        cnpj: "22.333.444/0001-66",
        numeroEventos: 13,
        postos: [
          { posto: "Posto B1-1", cc: "CC-2001", numeroEventos: 7 },
          { posto: "Posto B1-2", cc: "CC-2002", numeroEventos: 6 },
        ]
      }
    }
  },
  "Empresa C": {
    cnpj: "55.666.777/0001-88",
    numeroEventos: 11,
    clientes: {
      "Cliente C1": {
        cnpj: "33.444.555/0001-77",
        numeroEventos: 11,
        postos: [
          { posto: "Posto C1-1", cc: "CC-3001", numeroEventos: 5 },
          { posto: "Posto C1-2", cc: "CC-3002", numeroEventos: 6 },
        ]
      }
    }
  }
};

export const evolucaoPostosDescobertos = [
  { mes: "Jan", eventos: 25 },
  { mes: "Fev", eventos: 30 },
  { mes: "Mar", eventos: 28 },
  { mes: "Abr", eventos: 35 },
  { mes: "Mai", eventos: 39 },
];

// Eventos de Falta de Efetivo por Empresa
export const eventosFaltaEfetivoDetalhado = {
  "Empresa A": {
    cnpj: "12.345.678/0001-90",
    numeroEventos: 12,
    clientes: {
      "Cliente A1": {
        cnpj: "11.222.333/0001-44",
        numeroEventos: 7,
        postos: [
          { posto: "Posto A1-1", cc: "CC-1001", numeroEventos: 3, previsto: 10, atual: 7 },
          { posto: "Posto A1-2", cc: "CC-1002", numeroEventos: 4, previsto: 12, atual: 8 },
        ]
      },
      "Cliente A2": {
        cnpj: "11.222.333/0002-55",
        numeroEventos: 5,
        postos: [
          { posto: "Posto A2-1", cc: "CC-1003", numeroEventos: 5, previsto: 8, atual: 5 },
        ]
      }
    }
  },
  "Empresa B": {
    cnpj: "98.765.432/0001-10",
    numeroEventos: 10,
    clientes: {
      "Cliente B1": {
        cnpj: "22.333.444/0001-66",
        numeroEventos: 10,
        postos: [
          { posto: "Posto B1-1", cc: "CC-2001", numeroEventos: 6, previsto: 15, atual: 11 },
          { posto: "Posto B1-2", cc: "CC-2002", numeroEventos: 4, previsto: 9, atual: 6 },
        ]
      }
    }
  },
  "Empresa C": {
    cnpj: "55.666.777/0001-88",
    numeroEventos: 6,
    clientes: {
      "Cliente C1": {
        cnpj: "33.444.555/0001-77",
        numeroEventos: 6,
        postos: [
          { posto: "Posto C1-1", cc: "CC-3001", numeroEventos: 6, previsto: 20, atual: 16 },
        ]
      }
    }
  }
};

export const evolucaoFaltaEfetivo = [
  { mes: "Jan", eventos: 18 },
  { mes: "Fev", eventos: 22 },
  { mes: "Mar", eventos: 20 },
  { mes: "Abr", eventos: 25 },
  { mes: "Mai", eventos: 28 },
];

// Eventos de Excedentes por Empresa
export const eventosExcedentesDetalhado = {
  "Empresa A": {
    cnpj: "12.345.678/0001-90",
    numeroEventos: 6,
    clientes: {
      "Cliente A1": {
        cnpj: "11.222.333/0001-44",
        numeroEventos: 4,
        postos: [
          { posto: "Posto A1-1", cc: "CC-1001", numeroEventos: 2, previsto: 8, atual: 10 },
          { posto: "Posto A1-2", cc: "CC-1002", numeroEventos: 2, previsto: 10, atual: 12 },
        ]
      },
      "Cliente A2": {
        cnpj: "11.222.333/0002-55",
        numeroEventos: 2,
        postos: [
          { posto: "Posto A2-1", cc: "CC-1003", numeroEventos: 2, previsto: 6, atual: 8 },
        ]
      }
    }
  },
  "Empresa B": {
    cnpj: "98.765.432/0001-10",
    numeroEventos: 5,
    clientes: {
      "Cliente B1": {
        cnpj: "22.333.444/0001-66",
        numeroEventos: 5,
        postos: [
          { posto: "Posto B1-1", cc: "CC-2001", numeroEventos: 3, previsto: 12, atual: 15 },
          { posto: "Posto B1-2", cc: "CC-2002", numeroEventos: 2, previsto: 7, atual: 9 },
        ]
      }
    }
  },
  "Empresa C": {
    cnpj: "55.666.777/0001-88",
    numeroEventos: 4,
    clientes: {
      "Cliente C1": {
        cnpj: "33.444.555/0001-77",
        numeroEventos: 4,
        postos: [
          { posto: "Posto C1-1", cc: "CC-3001", numeroEventos: 4, previsto: 15, atual: 18 },
        ]
      }
    }
  }
};

export const evolucaoExcedentes = [
  { mes: "Jan", eventos: 10 },
  { mes: "Fev", eventos: 12 },
  { mes: "Mar", eventos: 11 },
  { mes: "Abr", eventos: 13 },
  { mes: "Mai", eventos: 15 },
];

// Dispositivos - Devices Prime
export const collectorTypes = [
  { name: "Terminal", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Aplicativo", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Nexti Smart", value: 20, color: "hsl(var(--chart-3))" },
];

// Distribuição de Dispositivos por Empresa com hierarquia (empresa -> cliente -> posto)
export const dispositivosDistribuicaoDetalhada = [
  {
    empresa: "Nexti",
    aplicativo: 220,
    tbi: 45,
    smart: 80,
    web: 5,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        aplicativo: 120,
        tbi: 25,
        smart: 45,
        web: 3,
        postos: [
          { posto: "Porteiro Shopping", aplicativo: 70, tbi: 15, smart: 25, web: 2 },
          { posto: "Vigilante Noturno", aplicativo: 50, tbi: 10, smart: 20, web: 1 },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        aplicativo: 100,
        tbi: 20,
        smart: 35,
        web: 2,
        postos: [
          { posto: "Recepcionista", aplicativo: 60, tbi: 12, smart: 20, web: 1 },
          { posto: "Portaria", aplicativo: 40, tbi: 8, smart: 15, web: 1 },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    aplicativo: 180,
    tbi: 38,
    smart: 65,
    web: 3,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        aplicativo: 110,
        tbi: 22,
        smart: 40,
        web: 2,
        postos: [
          { posto: "Vigilante", aplicativo: 70, tbi: 14, smart: 25, web: 1 },
          { posto: "Supervisor", aplicativo: 40, tbi: 8, smart: 15, web: 1 },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        aplicativo: 70,
        tbi: 16,
        smart: 25,
        web: 1,
        postos: [
          { posto: "Porteiro", aplicativo: 70, tbi: 16, smart: 25, web: 1 },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    aplicativo: 150,
    tbi: 32,
    smart: 55,
    web: 2,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        aplicativo: 150,
        tbi: 32,
        smart: 55,
        web: 2,
        postos: [
          { posto: "Auxiliar de Limpeza", aplicativo: 90, tbi: 18, smart: 30, web: 1 },
          { posto: "Porteiro", aplicativo: 60, tbi: 14, smart: 25, web: 1 },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    aplicativo: 120,
    tbi: 25,
    smart: 42,
    web: 0,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        aplicativo: 120,
        tbi: 25,
        smart: 42,
        web: 0,
        postos: [
          { posto: "Recepcionista", aplicativo: 70, tbi: 15, smart: 25, web: 0 },
          { posto: "Vigilante", aplicativo: 50, tbi: 10, smart: 17, web: 0 },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    aplicativo: 95,
    tbi: 18,
    smart: 35,
    web: 0,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        aplicativo: 95,
        tbi: 18,
        smart: 35,
        web: 0,
        postos: [
          { posto: "Supervisor", aplicativo: 55, tbi: 10, smart: 20, web: 0 },
          { posto: "Porteiro", aplicativo: 40, tbi: 8, smart: 15, web: 0 },
        ]
      },
    ]
  },
];

// Colaboradores sem Biometria/Senha/Facial com hierarquia (empresa -> cliente -> posto -> colaborador)
export const colaboradoresSemCadastroDetalhado = [
  {
    empresa: "Nexti",
    percentualSemBiometriaSenha: 15.2,
    colaboradoresSemFacial: 32,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        percentualSemBiometriaSenha: 14.8,
        colaboradoresSemFacial: 18,
        postos: [
          {
            posto: "Porteiro Shopping",
            percentualSemBiometriaSenha: 13.5,
            colaboradoresSemFacial: 10,
            colaboradores: [
              { colaborador: "João Silva", cadastroFaltante: "Senha" },
              { colaborador: "Maria Santos", cadastroFaltante: "Biometria" },
              { colaborador: "Pedro Costa", cadastroFaltante: "Facial" },
            ]
          },
          {
            posto: "Vigilante Noturno",
            percentualSemBiometriaSenha: 16.2,
            colaboradoresSemFacial: 8,
            colaboradores: [
              { colaborador: "Carlos Lima", cadastroFaltante: "Facial" },
              { colaborador: "Ana Paula", cadastroFaltante: "Senha" },
            ]
          },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        percentualSemBiometriaSenha: 15.8,
        colaboradoresSemFacial: 14,
        postos: [
          {
            posto: "Recepcionista",
            percentualSemBiometriaSenha: 14.2,
            colaboradoresSemFacial: 8,
            colaboradores: [
              { colaborador: "Juliana Rocha", cadastroFaltante: "Biometria" },
              { colaborador: "Roberto Alves", cadastroFaltante: "Facial" },
            ]
          },
          {
            posto: "Portaria",
            percentualSemBiometriaSenha: 17.5,
            colaboradoresSemFacial: 6,
            colaboradores: [
              { colaborador: "Fernando Dias", cadastroFaltante: "Senha" },
              { colaborador: "Mariana Souza", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    percentualSemBiometriaSenha: 12.8,
    colaboradoresSemFacial: 28,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        percentualSemBiometriaSenha: 11.5,
        colaboradoresSemFacial: 16,
        postos: [
          {
            posto: "Vigilante",
            percentualSemBiometriaSenha: 10.8,
            colaboradoresSemFacial: 10,
            colaboradores: [
              { colaborador: "Lucas Martins", cadastroFaltante: "Facial" },
              { colaborador: "Patricia Gomes", cadastroFaltante: "Senha" },
            ]
          },
          {
            posto: "Supervisor",
            percentualSemBiometriaSenha: 12.5,
            colaboradoresSemFacial: 6,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", cadastroFaltante: "Biometria" },
              { colaborador: "Camila Ferreira", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        percentualSemBiometriaSenha: 14.5,
        colaboradoresSemFacial: 12,
        postos: [
          {
            posto: "Porteiro",
            percentualSemBiometriaSenha: 14.5,
            colaboradoresSemFacial: 12,
            colaboradores: [
              { colaborador: "Thiago Oliveira", cadastroFaltante: "Senha" },
              { colaborador: "Fernanda Ribeiro", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    percentualSemBiometriaSenha: 10.5,
    colaboradoresSemFacial: 22,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        percentualSemBiometriaSenha: 10.5,
        colaboradoresSemFacial: 22,
        postos: [
          {
            posto: "Auxiliar de Limpeza",
            percentualSemBiometriaSenha: 9.8,
            colaboradoresSemFacial: 14,
            colaboradores: [
              { colaborador: "Sandra Mendes", cadastroFaltante: "Facial" },
              { colaborador: "Paulo Nunes", cadastroFaltante: "Biometria" },
            ]
          },
          {
            posto: "Porteiro",
            percentualSemBiometriaSenha: 11.5,
            colaboradoresSemFacial: 8,
            colaboradores: [
              { colaborador: "Marcos Pereira", cadastroFaltante: "Senha" },
              { colaborador: "Adriana Castro", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    percentualSemBiometriaSenha: 8.2,
    colaboradoresSemFacial: 18,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        percentualSemBiometriaSenha: 8.2,
        colaboradoresSemFacial: 18,
        postos: [
          {
            posto: "Recepcionista",
            percentualSemBiometriaSenha: 7.5,
            colaboradoresSemFacial: 10,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", cadastroFaltante: "Facial" },
              { colaborador: "Gabriel Soares", cadastroFaltante: "Senha" },
            ]
          },
          {
            posto: "Vigilante",
            percentualSemBiometriaSenha: 9.2,
            colaboradoresSemFacial: 8,
            colaboradores: [
              { colaborador: "Renato Cunha", cadastroFaltante: "Biometria" },
              { colaborador: "Larissa Moura", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    percentualSemBiometriaSenha: 6.8,
    colaboradoresSemFacial: 15,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        percentualSemBiometriaSenha: 6.8,
        colaboradoresSemFacial: 15,
        postos: [
          {
            posto: "Supervisor",
            percentualSemBiometriaSenha: 6.2,
            colaboradoresSemFacial: 8,
            colaboradores: [
              { colaborador: "Eduardo Correia", cadastroFaltante: "Facial" },
              { colaborador: "Tatiana Azevedo", cadastroFaltante: "Senha" },
            ]
          },
          {
            posto: "Porteiro",
            percentualSemBiometriaSenha: 7.5,
            colaboradoresSemFacial: 7,
            colaboradores: [
              { colaborador: "André Monteiro", cadastroFaltante: "Biometria" },
              { colaborador: "Simone Reis", cadastroFaltante: "Facial" },
            ]
          },
        ]
      },
    ]
  },
];

// Engajamento e Retenção - Engagement Prime
export const turnoverByPeriod = [
  { period: "0-30 dias", percentage: 15.2 },
  { period: "31-60 dias", percentage: 12.8 },
  { period: "61-90 dias", percentage: 10.5 },
  { period: "90-365 dias", percentage: 8.3 },
  { period: "Acima de 365", percentage: 5.1 },
];

export const terminationByGender = [
  { name: "Masculino", value: 58, color: "hsl(var(--chart-1))" },
  { name: "Feminino", value: 42, color: "hsl(var(--chart-2))" },
];

export const terminationByAge = [
  { name: "18-25 anos", value: 35, color: "hsl(var(--chart-1))" },
  { name: "26-35 anos", value: 28, color: "hsl(var(--chart-2))" },
  { name: "36-45 anos", value: 22, color: "hsl(var(--chart-3))" },
  { name: "46+ anos", value: 15, color: "hsl(var(--chart-4))" },
];

export const terminationByTenure = [
  { name: "0-6 meses", value: 45, color: "hsl(var(--chart-1))" },
  { name: "7-12 meses", value: 25, color: "hsl(var(--chart-2))" },
  { name: "1-2 anos", value: 18, color: "hsl(var(--chart-3))" },
  { name: "2+ anos", value: 12, color: "hsl(var(--chart-4))" },
];

export const terminationByRole = [
  { name: "Porteiro", value: 30, color: "hsl(var(--chart-1))" },
  { name: "Auxiliar de Limpeza", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Recepcionista", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Assistente", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Supervisor", value: 10, color: "hsl(var(--chart-5))" },
];

export const distanceRanking = [
  { rank: 1, name: "João Silva", role: "Porteiro", distance: 45.2 },
  { rank: 2, name: "Maria Santos", role: "Recepcionista", distance: 38.5 },
  { rank: 3, name: "Pedro Costa", role: "Auxiliar", distance: 35.8 },
  { rank: 4, name: "Ana Oliveira", role: "Assistente", distance: 32.4 },
  { rank: 5, name: "Carlos Souza", role: "Supervisor", distance: 28.9 },
  { rank: 6, name: "Julia Lima", role: "Porteiro", distance: 25.7 },
  { rank: 7, name: "Roberto Alves", role: "Auxiliar", distance: 22.3 },
  { rank: 8, name: "Fernanda Dias", role: "Recepcionista", distance: 20.1 },
  { rank: 9, name: "Lucas Mendes", role: "Assistente", distance: 18.6 },
  { rank: 10, name: "Patricia Rocha", role: "Supervisor", distance: 15.2 },
];

export const terminationReasons = [
  { reason: "Pedido de Demissão", count: 85 },
  { reason: "Justa Causa", count: 45 },
  { reason: "Término de Contrato", count: 32 },
  { reason: "Acordo", count: 28 },
  { reason: "Outros", count: 15 },
];

// Evolution data for admissions, terminations, and turnover
export const evolucaoAdmissoes = [
  { mes: "Jan", admissoes: 45 },
  { mes: "Fev", admissoes: 52 },
  { mes: "Mar", admissoes: 48 },
  { mes: "Abr", admissoes: 55 },
  { mes: "Mai", admissoes: 50 },
  { mes: "Jun", admissoes: 58 },
];

export const evolucaoDesligamentos = [
  { mes: "Jan", desligamentos: 28 },
  { mes: "Fev", desligamentos: 32 },
  { mes: "Mar", desligamentos: 25 },
  { mes: "Abr", desligamentos: 30 },
  { mes: "Mai", desligamentos: 27 },
  { mes: "Jun", desligamentos: 35 },
];

export const evolucaoTurnover = [
  { mes: "Jan", turnover: 3.2 },
  { mes: "Fev", turnover: 3.8 },
  { mes: "Mar", turnover: 2.9 },
  { mes: "Abr", turnover: 3.5 },
  { mes: "Mai", turnover: 3.1 },
  { mes: "Jun", turnover: 4.1 },
];

// Turnover by company with drill-down
export const turnoverPorEmpresaDetalhado = {
  "Empresa Alpha Ltda": {
    cnpj: "12.345.678/0001-90",
    admissoes: 120,
    desligamentos: 85,
    turnover: 3.5,
    clientes: {
      "Cliente Premium SA": {
        cnpj: "23.456.789/0001-01",
        admissoes: 45,
        desligamentos: 32,
        turnover: 3.2,
        postos: [
          { posto: "Posto Centro", cc: "CC-001", admissoes: 15, desligamentos: 10, turnover: 2.8 },
          { posto: "Posto Norte", cc: "CC-002", admissoes: 18, desligamentos: 12, turnover: 3.1 },
          { posto: "Posto Sul", cc: "CC-003", admissoes: 12, desligamentos: 10, turnover: 3.5 },
        ],
      },
      "Cliente Business Corp": {
        cnpj: "34.567.890/0001-12",
        admissoes: 38,
        desligamentos: 28,
        turnover: 3.4,
        postos: [
          { posto: "Posto Leste", cc: "CC-004", admissoes: 20, desligamentos: 15, turnover: 3.2 },
          { posto: "Posto Oeste", cc: "CC-005", admissoes: 18, desligamentos: 13, turnover: 3.6 },
        ],
      },
      "Cliente Global Ltda": {
        cnpj: "45.678.901/0001-23",
        admissoes: 37,
        desligamentos: 25,
        turnover: 3.8,
        postos: [
          { posto: "Posto Central", cc: "CC-006", admissoes: 22, desligamentos: 15, turnover: 3.5 },
          { posto: "Posto Matriz", cc: "CC-007", admissoes: 15, desligamentos: 10, turnover: 4.2 },
        ],
      },
    },
  },
  "Empresa Beta SA": {
    cnpj: "98.765.432/0001-10",
    admissoes: 95,
    desligamentos: 68,
    turnover: 3.8,
    clientes: {
      "Cliente Innovative Inc": {
        cnpj: "56.789.012/0001-34",
        admissoes: 50,
        desligamentos: 35,
        turnover: 3.6,
        postos: [
          { posto: "Posto Tech", cc: "CC-008", admissoes: 25, desligamentos: 18, turnover: 3.4 },
          { posto: "Posto Digital", cc: "CC-009", admissoes: 25, desligamentos: 17, turnover: 3.8 },
        ],
      },
      "Cliente Modern Services": {
        cnpj: "67.890.123/0001-45",
        admissoes: 45,
        desligamentos: 33,
        turnover: 4.0,
        postos: [
          { posto: "Posto Premium", cc: "CC-010", admissoes: 28, desligamentos: 20, turnover: 3.9 },
          { posto: "Posto Elite", cc: "CC-011", admissoes: 17, desligamentos: 13, turnover: 4.2 },
        ],
      },
    },
  },
  "Empresa Gamma Ltda": {
    cnpj: "11.222.333/0001-44",
    admissoes: 88,
    desligamentos: 62,
    turnover: 3.6,
    clientes: {
      "Cliente Security Plus": {
        cnpj: "78.901.234/0001-56",
        admissoes: 55,
        desligamentos: 38,
        turnover: 3.5,
        postos: [
          { posto: "Posto Seguro", cc: "CC-012", admissoes: 30, desligamentos: 20, turnover: 3.3 },
          { posto: "Posto Protegido", cc: "CC-013", admissoes: 25, desligamentos: 18, turnover: 3.7 },
        ],
      },
      "Cliente Safe Guard": {
        cnpj: "89.012.345/0001-67",
        admissoes: 33,
        desligamentos: 24,
        turnover: 3.8,
        postos: [
          { posto: "Posto Vigilância", cc: "CC-014", admissoes: 18, desligamentos: 13, turnover: 3.6 },
          { posto: "Posto Monitoramento", cc: "CC-015", admissoes: 15, desligamentos: 11, turnover: 4.0 },
        ],
      },
    },
  },
};

// Solicitações de Justificativa de Ponto
export const evolucaoSolicitacoes = [
  { mes: "Jan", solicitacoes: 120, tratadas: 110 },
  { mes: "Fev", solicitacoes: 135, tratadas: 125 },
  { mes: "Mar", solicitacoes: 142, tratadas: 135 },
  { mes: "Abr", solicitacoes: 128, tratadas: 120 },
  { mes: "Mai", solicitacoes: 156, tratadas: 142 },
  { mes: "Jun", solicitacoes: 148, tratadas: 138 },
];

export const tiposSolicitacoes = [
  { name: "Falta de Marcação", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Hora Extra", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Esquecimento", value: 22, color: "hsl(var(--chart-3))" },
  { name: "Problemas Técnicos", value: 15, color: "hsl(var(--chart-4))" },
];

export const motivosAjusteSolicitacoes = [
  { name: "Reunião Externa", value: 30, color: "hsl(var(--chart-1))" },
  { name: "Atendimento Cliente", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Problema Pessoal", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Visita Técnica", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Outros", value: 10, color: "hsl(var(--chart-5))" },
];

export const top10ColaboradoresSolicitacoes = [
  { rank: 1, nome: "Paula Oliveira", posto: "Porteiro", empresa: "Nexti", solicitacoes: 12 },
  { rank: 2, nome: "Ricardo Santos", posto: "Recepcionista", empresa: "G4S", solicitacoes: 11 },
  { rank: 3, nome: "Fernanda Costa", posto: "Auxiliar de Limpeza", empresa: "JCC", solicitacoes: 10 },
  { rank: 4, nome: "André Lima", posto: "Assistente de Serviços Gerais", empresa: "Nexti", solicitacoes: 9 },
  { rank: 5, nome: "Juliana Ferreira", posto: "Supervisor", empresa: "G4S", solicitacoes: 8 },
  { rank: 6, nome: "Roberto Alves", posto: "Porteiro", empresa: "JCC", solicitacoes: 8 },
  { rank: 7, nome: "Camila Rodrigues", posto: "Auxiliar de Limpeza", empresa: "Nexti", solicitacoes: 7 },
  { rank: 8, nome: "Marcos Silva", posto: "Recepcionista", empresa: "G4S", solicitacoes: 7 },
  { rank: 9, nome: "Patrícia Souza", posto: "Assistente de Serviços Gerais", empresa: "Nexti", solicitacoes: 6 },
  { rank: 10, nome: "Gabriel Martins", posto: "Supervisor", empresa: "JCC", solicitacoes: 6 },
];

export const top10PostosSolicitacoes = [
  { rank: 1, posto: "Porteiro", empresa: "Nexti", solicitacoes: 32 },
  { rank: 2, posto: "Recepcionista", empresa: "G4S", solicitacoes: 28 },
  { rank: 3, posto: "Auxiliar de Limpeza", empresa: "JCC", solicitacoes: 24 },
  { rank: 4, posto: "Assistente de Serviços Gerais", empresa: "Nexti", solicitacoes: 22 },
  { rank: 5, posto: "Supervisor", empresa: "G4S", solicitacoes: 18 },
  { rank: 6, posto: "Vigilante", empresa: "Verzani", solicitacoes: 16 },
  { rank: 7, posto: "Porteiro", empresa: "JCC", solicitacoes: 14 },
  { rank: 8, posto: "Recepcionista", empresa: "Orsegups", solicitacoes: 12 },
  { rank: 9, posto: "Auxiliar de Limpeza", empresa: "Nexti", solicitacoes: 11 },
  { rank: 10, posto: "Supervisor", empresa: "JCC", solicitacoes: 10 },
];

// Ausências e Coberturas
export const absenteismoPorEmpresa = [
  { 
    empresa: "Nexti", 
    percentualAbsenteismo: 6.5, 
    horasAusentes: 2850,
    clientes: [
      { 
        cliente: "Cliente Nexti 1", 
        percentualAbsenteismo: 7.0,
        postos: [
          { 
            posto: "Porteiro Shopping", 
            percentualAbsenteismo: 7.5,
            colaboradores: [
              { colaborador: "João Silva", percentualAbsenteismo: 8.5, totalHoras: 180 },
              { colaborador: "Maria Santos", percentualAbsenteismo: 7.2, totalHoras: 150 },
              { colaborador: "Pedro Costa", percentualAbsenteismo: 6.8, totalHoras: 140 },
            ]
          },
          { 
            posto: "Vigilante Noturno", 
            percentualAbsenteismo: 6.5,
            colaboradores: [
              { colaborador: "Carlos Lima", percentualAbsenteismo: 7.0, totalHoras: 160 },
              { colaborador: "Ana Paula", percentualAbsenteismo: 6.0, totalHoras: 130 },
            ]
          },
        ]
      },
      { 
        cliente: "Cliente Nexti 2", 
        percentualAbsenteismo: 6.0,
        postos: [
          { 
            posto: "Recepcionista", 
            percentualAbsenteismo: 6.2,
            colaboradores: [
              { colaborador: "Juliana Rocha", percentualAbsenteismo: 6.8, totalHoras: 145 },
              { colaborador: "Roberto Alves", percentualAbsenteismo: 5.6, totalHoras: 120 },
            ]
          },
          { 
            posto: "Portaria", 
            percentualAbsenteismo: 5.8,
            colaboradores: [
              { colaborador: "Fernando Dias", percentualAbsenteismo: 6.2, totalHoras: 135 },
              { colaborador: "Mariana Souza", percentualAbsenteismo: 5.4, totalHoras: 115 },
            ]
          },
        ]
      },
    ]
  },
  { 
    empresa: "G4S", 
    percentualAbsenteismo: 5.8, 
    horasAusentes: 2420,
    clientes: [
      { 
        cliente: "Cliente G4S 1", 
        percentualAbsenteismo: 6.2,
        postos: [
          { 
            posto: "Vigilante", 
            percentualAbsenteismo: 6.5,
            colaboradores: [
              { colaborador: "Lucas Martins", percentualAbsenteismo: 7.2, totalHoras: 155 },
              { colaborador: "Patricia Gomes", percentualAbsenteismo: 5.8, totalHoras: 125 },
            ]
          },
          { 
            posto: "Supervisor", 
            percentualAbsenteismo: 5.9,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", percentualAbsenteismo: 6.5, totalHoras: 140 },
              { colaborador: "Camila Ferreira", percentualAbsenteismo: 5.3, totalHoras: 110 },
            ]
          },
        ]
      },
      { 
        cliente: "Cliente G4S 2", 
        percentualAbsenteismo: 5.4,
        postos: [
          { 
            posto: "Porteiro", 
            percentualAbsenteismo: 5.6,
            colaboradores: [
              { colaborador: "Thiago Oliveira", percentualAbsenteismo: 6.0, totalHoras: 130 },
              { colaborador: "Fernanda Ribeiro", percentualAbsenteismo: 5.2, totalHoras: 108 },
            ]
          },
        ]
      },
    ]
  },
  { 
    empresa: "JCC", 
    percentualAbsenteismo: 7.2, 
    horasAusentes: 3180,
    clientes: [
      { 
        cliente: "Cliente JCC 1", 
        percentualAbsenteismo: 7.5,
        postos: [
          { 
            posto: "Auxiliar de Limpeza", 
            percentualAbsenteismo: 7.8,
            colaboradores: [
              { colaborador: "Sandra Mendes", percentualAbsenteismo: 8.5, totalHoras: 175 },
              { colaborador: "Paulo Nunes", percentualAbsenteismo: 7.1, totalHoras: 148 },
            ]
          },
          { 
            posto: "Porteiro", 
            percentualAbsenteismo: 7.2,
            colaboradores: [
              { colaborador: "Marcos Pereira", percentualAbsenteismo: 7.8, totalHoras: 162 },
              { colaborador: "Adriana Castro", percentualAbsenteismo: 6.6, totalHoras: 138 },
            ]
          },
        ]
      },
    ]
  },
  { 
    empresa: "Verzani", 
    percentualAbsenteismo: 4.9, 
    horasAusentes: 1890,
    clientes: [
      { 
        cliente: "Cliente Verzani 1", 
        percentualAbsenteismo: 5.2,
        postos: [
          { 
            posto: "Recepcionista", 
            percentualAbsenteismo: 5.4,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", percentualAbsenteismo: 5.8, totalHoras: 125 },
              { colaborador: "Gabriel Soares", percentualAbsenteismo: 5.0, totalHoras: 105 },
            ]
          },
          { 
            posto: "Vigilante", 
            percentualAbsenteismo: 5.0,
            colaboradores: [
              { colaborador: "Renato Cunha", percentualAbsenteismo: 5.5, totalHoras: 118 },
              { colaborador: "Larissa Moura", percentualAbsenteismo: 4.5, totalHoras: 95 },
            ]
          },
        ]
      },
    ]
  },
  { 
    empresa: "Orsegups", 
    percentualAbsenteismo: 5.4, 
    horasAusentes: 2150,
    clientes: [
      { 
        cliente: "Cliente Orsegups 1", 
        percentualAbsenteismo: 5.6,
        postos: [
          { 
            posto: "Supervisor", 
            percentualAbsenteismo: 5.8,
            colaboradores: [
              { colaborador: "Eduardo Correia", percentualAbsenteismo: 6.2, totalHoras: 132 },
              { colaborador: "Tatiana Azevedo", percentualAbsenteismo: 5.4, totalHoras: 115 },
            ]
          },
          { 
            posto: "Porteiro", 
            percentualAbsenteismo: 5.4,
            colaboradores: [
              { colaborador: "André Monteiro", percentualAbsenteismo: 5.8, totalHoras: 124 },
              { colaborador: "Simone Reis", percentualAbsenteismo: 5.0, totalHoras: 107 },
            ]
          },
        ]
      },
    ]
  },
];

export const ausenciasPorEmpresa = [
  {
    empresa: "Nexti",
    totalHoras: 2850,
    clientes: [
      {
        cliente: "Cliente Nexti 1",
        totalHoras: 1600,
        postos: [
          { 
            posto: "Porteiro Shopping", 
            totalHoras: 900,
            colaboradores: [
              { colaborador: "João Silva", totalHoras: 180, percentualAbsenteismo: 8.5 },
              { colaborador: "Maria Santos", totalHoras: 150, percentualAbsenteismo: 7.2 },
              { colaborador: "Pedro Costa", totalHoras: 140, percentualAbsenteismo: 6.8 },
            ]
          },
          { 
            posto: "Vigilante Noturno", 
            totalHoras: 700,
            colaboradores: [
              { colaborador: "Carlos Lima", totalHoras: 160, percentualAbsenteismo: 7.0 },
              { colaborador: "Ana Paula", totalHoras: 130, percentualAbsenteismo: 6.0 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente Nexti 2",
        totalHoras: 1250,
        postos: [
          { 
            posto: "Recepcionista", 
            totalHoras: 700,
            colaboradores: [
              { colaborador: "Juliana Rocha", totalHoras: 145, percentualAbsenteismo: 6.8 },
              { colaborador: "Roberto Alves", totalHoras: 120, percentualAbsenteismo: 5.6 },
            ]
          },
          { 
            posto: "Portaria", 
            totalHoras: 550,
            colaboradores: [
              { colaborador: "Fernando Dias", totalHoras: 135, percentualAbsenteismo: 6.2 },
              { colaborador: "Mariana Souza", totalHoras: 115, percentualAbsenteismo: 5.4 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "G4S",
    totalHoras: 2420,
    clientes: [
      {
        cliente: "Cliente G4S 1",
        totalHoras: 1400,
        postos: [
          { 
            posto: "Vigilante", 
            totalHoras: 800,
            colaboradores: [
              { colaborador: "Lucas Martins", totalHoras: 155, percentualAbsenteismo: 7.2 },
              { colaborador: "Patricia Gomes", totalHoras: 125, percentualAbsenteismo: 5.8 },
            ]
          },
          { 
            posto: "Supervisor", 
            totalHoras: 600,
            colaboradores: [
              { colaborador: "Ricardo Barbosa", totalHoras: 140, percentualAbsenteismo: 6.5 },
              { colaborador: "Camila Ferreira", totalHoras: 110, percentualAbsenteismo: 5.3 },
            ]
          },
        ]
      },
      {
        cliente: "Cliente G4S 2",
        totalHoras: 1020,
        postos: [
          { 
            posto: "Porteiro", 
            totalHoras: 1020,
            colaboradores: [
              { colaborador: "Thiago Oliveira", totalHoras: 130, percentualAbsenteismo: 6.0 },
              { colaborador: "Fernanda Ribeiro", totalHoras: 108, percentualAbsenteismo: 5.2 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "JCC",
    totalHoras: 3180,
    clientes: [
      {
        cliente: "Cliente JCC 1",
        totalHoras: 3180,
        postos: [
          { 
            posto: "Auxiliar de Limpeza", 
            totalHoras: 1800,
            colaboradores: [
              { colaborador: "Sandra Mendes", totalHoras: 175, percentualAbsenteismo: 8.5 },
              { colaborador: "Paulo Nunes", totalHoras: 148, percentualAbsenteismo: 7.1 },
            ]
          },
          { 
            posto: "Porteiro", 
            totalHoras: 1380,
            colaboradores: [
              { colaborador: "Marcos Pereira", totalHoras: 162, percentualAbsenteismo: 7.8 },
              { colaborador: "Adriana Castro", totalHoras: 138, percentualAbsenteismo: 6.6 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Verzani",
    totalHoras: 1890,
    clientes: [
      {
        cliente: "Cliente Verzani 1",
        totalHoras: 1890,
        postos: [
          { 
            posto: "Recepcionista", 
            totalHoras: 1000,
            colaboradores: [
              { colaborador: "Beatriz Cardoso", totalHoras: 125, percentualAbsenteismo: 5.8 },
              { colaborador: "Gabriel Soares", totalHoras: 105, percentualAbsenteismo: 5.0 },
            ]
          },
          { 
            posto: "Vigilante", 
            totalHoras: 890,
            colaboradores: [
              { colaborador: "Renato Cunha", totalHoras: 118, percentualAbsenteismo: 5.5 },
              { colaborador: "Larissa Moura", totalHoras: 95, percentualAbsenteismo: 4.5 },
            ]
          },
        ]
      },
    ]
  },
  {
    empresa: "Orsegups",
    totalHoras: 2150,
    clientes: [
      {
        cliente: "Cliente Orsegups 1",
        totalHoras: 2150,
        postos: [
          { 
            posto: "Supervisor", 
            totalHoras: 1200,
            colaboradores: [
              { colaborador: "Eduardo Correia", totalHoras: 132, percentualAbsenteismo: 6.2 },
              { colaborador: "Tatiana Azevedo", totalHoras: 115, percentualAbsenteismo: 5.4 },
            ]
          },
          { 
            posto: "Porteiro", 
            totalHoras: 950,
            colaboradores: [
              { colaborador: "André Monteiro", totalHoras: 124, percentualAbsenteismo: 5.8 },
              { colaborador: "Simone Reis", totalHoras: 107, percentualAbsenteismo: 5.0 },
            ]
          },
        ]
      },
    ]
  },
];

export const top10ColaboradoresAusencia = [
  { rank: 1, colaborador: "João Silva", posto: "Porteiro", horas: 156 },
  { rank: 2, colaborador: "Maria Santos", posto: "Auxiliar de Limpeza", horas: 142 },
  { rank: 3, colaborador: "Pedro Costa", posto: "Recepcionista", horas: 138 },
  { rank: 4, colaborador: "Ana Oliveira", posto: "Vigilante", horas: 134 },
  { rank: 5, colaborador: "Carlos Souza", posto: "Supervisor", horas: 128 },
  { rank: 6, colaborador: "Julia Lima", posto: "Serv. Gerais", horas: 122 },
  { rank: 7, colaborador: "Roberto Alves", posto: "Porteiro", horas: 118 },
  { rank: 8, colaborador: "Fernanda Dias", posto: "Recepcionista", horas: 112 },
  { rank: 9, colaborador: "Lucas Mendes", posto: "Auxiliar de Limpeza", horas: 108 },
  { rank: 10, colaborador: "Patricia Rocha", posto: "Vigilante", horas: 102 },
];

export const top10PostosAusencia = [
  { rank: 1, posto: "Porteiro", empresa: "Nexti", horas: 680 },
  { rank: 2, posto: "Auxiliar de Limpeza", empresa: "JCC", horas: 620 },
  { rank: 3, posto: "Recepcionista", empresa: "G4S", horas: 580 },
  { rank: 4, posto: "Vigilante", empresa: "Nexti", horas: 540 },
  { rank: 5, posto: "Supervisor", empresa: "JCC", horas: 520 },
  { rank: 6, posto: "Serv. Gerais", empresa: "G4S", horas: 490 },
  { rank: 7, posto: "Porteiro", empresa: "Verzani", horas: 470 },
  { rank: 8, posto: "Recepcionista", empresa: "Orsegups", horas: 450 },
  { rank: 9, posto: "Auxiliar de Limpeza", empresa: "Nexti", horas: 420 },
  { rank: 10, posto: "Vigilante", empresa: "G4S", horas: 400 },
];

export const motivosAusencia = [
  { name: "Atestado Médico", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Falta", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Férias", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Licença", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Afastamento INSS", value: 12, color: "hsl(var(--chart-5))" },
  { name: "Outros", value: 5, color: "hsl(var(--chart-6))" },
];

export const principaisCIDs = [
  { name: "CID J00 - Nasofaringite Aguda", value: 28, color: "hsl(var(--chart-1))" },
  { name: "CID M54 - Dorsalgia", value: 22, color: "hsl(var(--chart-2))" },
  { name: "CID A09 - Diarreia e Gastroenterite", value: 18, color: "hsl(var(--chart-3))" },
  { name: "CID R51 - Cefaleia", value: 15, color: "hsl(var(--chart-4))" },
  { name: "CID K30 - Dispepsia", value: 10, color: "hsl(var(--chart-5))" },
  { name: "Outros", value: 7, color: "hsl(var(--muted-foreground))" },
];

export const evolucaoHorasAusencia = [
  { mes: "Jan", horas: 750 },
  { mes: "Fev", horas: 780 },
  { mes: "Mar", horas: 820 },
  { mes: "Abr", horas: 850 },
  { mes: "Mai", horas: 880 },
  { mes: "Jun", horas: 920 },
  { mes: "Jul", horas: 950 },
  { mes: "Ago", horas: 980 },
  { mes: "Set", horas: 1010 },
  { mes: "Out", horas: 1040 },
  { mes: "Nov", horas: 1060 },
  { mes: "Dez", horas: 1080 },
];

export const coberturasPorEmpresa = [
  { empresa: "Nexti", percentualCobertura: 85.5 },
  { empresa: "G4S", percentualCobertura: 88.2 },
  { empresa: "JCC", percentualCobertura: 82.8 },
  { empresa: "Verzani", percentualCobertura: 91.3 },
  { empresa: "Orsegups", percentualCobertura: 87.6 },
];

export const evolucaoCoberturasAusencias = [
  { mes: "Jan", horasAusentes: 750, horasCobertas: 620 },
  { mes: "Fev", horasAusentes: 780, horasCobertas: 650 },
  { mes: "Mar", horasAusentes: 820, horasCobertas: 680 },
  { mes: "Abr", horasAusentes: 850, horasCobertas: 710 },
  { mes: "Mai", horasAusentes: 880, horasCobertas: 740 },
  { mes: "Jun", horasAusentes: 920, horasCobertas: 770 },
  { mes: "Jul", horasAusentes: 950, horasCobertas: 800 },
  { mes: "Ago", horasAusentes: 980, horasCobertas: 830 },
  { mes: "Set", horasAusentes: 1010, horasCobertas: 860 },
  { mes: "Out", horasAusentes: 1040, horasCobertas: 890 },
  { mes: "Nov", horasAusentes: 1060, horasCobertas: 920 },
  { mes: "Dez", horasAusentes: 1080, horasCobertas: 950 },
];

export const evolucaoCoberturasLancadas = [
  { mes: "Jan", coberturas: 150 },
  { mes: "Fev", coberturas: 165 },
  { mes: "Mar", coberturas: 180 },
  { mes: "Abr", coberturas: 195 },
  { mes: "Mai", coberturas: 210 },
  { mes: "Jun", coberturas: 225 },
  { mes: "Jul", coberturas: 240 },
  { mes: "Ago", coberturas: 255 },
  { mes: "Set", coberturas: 270 },
  { mes: "Out", coberturas: 285 },
  { mes: "Nov", coberturas: 295 },
  { mes: "Dez", coberturas: 305 },
];

export const tipoCobertura = [
  { name: "Horas Extras", value: 42, color: "hsl(var(--chart-1))" },
  { name: "Remanejamento Interno", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Banco de Horas", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Reserva Técnica", value: 12, color: "hsl(var(--chart-4))" },
];

export const motivoCobertura = [
  { name: "Falta Injustificada", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Atestado Médico", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Férias", value: 22, color: "hsl(var(--chart-3))" },
  { name: "Licença", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Afastamento INSS", value: 8, color: "hsl(var(--chart-5))" },
];

export const recursoCobertura = [
  { name: "Reserva Técnica", value: 38, color: "hsl(var(--chart-1))" },
  { name: "Posto ao Lado", value: 32, color: "hsl(var(--chart-2))" },
  { name: "Horas Extras", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Terceirizado", value: 12, color: "hsl(var(--chart-4))" },
];
