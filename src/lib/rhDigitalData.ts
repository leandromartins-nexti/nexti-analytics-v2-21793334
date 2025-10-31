// Mock data for RH Digital module

export const rhDigitalData = {
  // Direct (Chat) data
  directChat: {
    averageAttendanceTime: "00:12:34",
    averageWaitTime: "00:03:45",
    averageRating: 4.3,
    totalAttendances: 890,
    attendancesByStatus: [
      { status: "Em Andamento", value: 122, percentage: 13.7 },
      { status: "Finalizado", value: 523, percentage: 58.8 },
      { status: "Aguardando", value: 245, percentage: 27.5 },
    ],
    topSubjects: [
      { subject: "Dúvidas sobre Folha", total: 245 },
      { subject: "Férias", total: 198 },
      { subject: "Ponto Eletrônico", total: 176 },
      { subject: "Benefícios", total: 143 },
      { subject: "Documentação", total: 128 },
      { subject: "Banco de Horas", total: 112 },
      { subject: "13º Salário", total: 98 },
      { subject: "Vale Transporte", total: 87 },
      { subject: "Atestados", total: 76 },
      { subject: "Descontos", total: 65 },
    ],
    attendancesEvolution: [
      { date: "Jan", attendances: 720, waitTime: 4.2 },
      { date: "Fev", attendances: 780, waitTime: 3.8 },
      { date: "Mar", attendances: 850, waitTime: 4.5 },
      { date: "Abr", attendances: 890, waitTime: 3.2 },
      { date: "Mai", attendances: 920, waitTime: 3.75 },
      { date: "Jun", attendances: 890, waitTime: 3.45 },
    ],
    waitTimeByOperator: [
      { operador: "Ana Silva", assunto: "Folha", waitTime: "00:02:15", atendimentos: 98 },
      { operador: "Carlos Santos", assunto: "Férias", waitTime: "00:03:45", atendimentos: 87 },
      { operador: "Maria Costa", assunto: "Ponto", waitTime: "00:04:20", atendimentos: 76 },
      { operador: "João Oliveira", assunto: "Benefícios", waitTime: "00:05:10", atendimentos: 65 },
      { operador: "Paula Lima", assunto: "Documentação", waitTime: "00:03:30", atendimentos: 54 },
    ],
    waitTimeByAttendant: [
      { operador: "Ana Silva", waitTime: "00:02:15", atendimentos: 98 },
      { operador: "Carlos Santos", waitTime: "00:03:45", atendimentos: 87 },
      { operador: "Maria Costa", waitTime: "00:04:20", atendimentos: 76 },
      { operador: "João Oliveira", waitTime: "00:05:10", atendimentos: 65 },
      { operador: "Paula Lima", waitTime: "00:03:30", atendimentos: 54 },
    ],
    attendanceTimeByAttendant: [
      { operador: "Ana Silva", attendanceTime: "00:10:45", atendimentos: 98 },
      { operador: "Carlos Santos", attendanceTime: "00:12:30", atendimentos: 87 },
      { operador: "Maria Costa", attendanceTime: "00:13:15", atendimentos: 76 },
      { operador: "João Oliveira", attendanceTime: "00:14:50", atendimentos: 65 },
      { operador: "Paula Lima", attendanceTime: "00:11:20", atendimentos: 54 },
    ],
    waitTimeBySubject: [
      { assunto: "Folha", waitTime: "00:02:15", atendimentos: 245 },
      { assunto: "Férias", waitTime: "00:03:45", atendimentos: 198 },
      { assunto: "Ponto", waitTime: "00:04:20", atendimentos: 176 },
      { assunto: "Benefícios", waitTime: "00:05:10", atendimentos: 143 },
      { assunto: "Documentação", waitTime: "00:03:30", atendimentos: 128 },
    ],
    attendanceTimeBySubject: [
      { assunto: "Folha", attendanceTime: "00:11:30", atendimentos: 245 },
      { assunto: "Férias", attendanceTime: "00:13:15", atendimentos: 198 },
      { assunto: "Ponto", attendanceTime: "00:12:45", atendimentos: 176 },
      { assunto: "Benefícios", attendanceTime: "00:14:20", atendimentos: 143 },
      { assunto: "Documentação", attendanceTime: "00:10:50", atendimentos: 128 },
    ],
    attendantRanking: [
      { operador: "Ana Silva", finalizados: 156 },
      { operador: "Carlos Santos", finalizados: 143 },
      { operador: "Maria Costa", finalizados: 128 },
      { operador: "João Oliveira", finalizados: 112 },
      { operador: "Paula Lima", finalizados: 98 },
    ],
  },

  // Avisos e Convocações data
  avisosConvocacoes: {
    // Métricas de Avisos
    totalAvisosEnviados: 1850,
    totalAvisosVisualizados: 1520,
    
    // Métricas de Convocações
    totalConvocacoesEnviadas: 1240,
    totalConvocacoesRespondidas: 987,
    totalConvocacoesNaoRespondidas: 253,
    totalConvocacoesVisualizadasNaoRespondidas: 168,
    
    // Legacy fields (mantidos para compatibilidade)
    totalSent: 1250,
    totalSigned: 1110,
    totalUnsigned: 140,
    signedPercentage: 88.8,
    signatureByChannel: [
      { channel: "App", enviados: 750, assinados: 678, naoAssinados: 72 },
      { channel: "Smart", enviados: 500, assinados: 432, naoAssinados: 68 },
    ],
    convocacoesEvolution: [
      { date: "Jan", enviado: 180, naoRespondido: 45, visualizadoNaoRespondido: 32 },
      { date: "Fev", enviado: 195, naoRespondido: 42, visualizadoNaoRespondido: 28 },
      { date: "Mar", enviado: 210, naoRespondido: 38, visualizadoNaoRespondido: 25 },
      { date: "Abr", enviado: 205, naoRespondido: 41, visualizadoNaoRespondido: 27 },
      { date: "Mai", enviado: 220, naoRespondido: 35, visualizadoNaoRespondido: 23 },
      { date: "Jun", enviado: 230, naoRespondido: 32, visualizadoNaoRespondido: 20 },
    ],
    avisosEvolution: [
      { date: "Jan", enviado: 280, visualizado: 215, naoVisualizado: 65 },
      { date: "Fev", enviado: 295, visualizado: 235, naoVisualizado: 60 },
      { date: "Mar", enviado: 310, visualizado: 255, naoVisualizado: 55 },
      { date: "Abr", enviado: 305, visualizado: 248, naoVisualizado: 57 },
      { date: "Mai", enviado: 320, visualizado: 268, naoVisualizado: 52 },
      { date: "Jun", enviado: 335, visualizado: 285, naoVisualizado: 50 },
    ],
    deviceDistribution: [
      { device: "Terminal TBI", value: 450 },
      { device: "App Mobile", value: 520 },
      { device: "Nexti Smart", value: 280 },
    ],
    signatureDeviceDistribution: [
      { device: "Terminal TBI", value: 380 },
      { device: "App Mobile", value: 450 },
      { device: "Nexti Smart", value: 280 },
    ],
    visualizationDeviceDistribution: [
      { device: "Terminal TBI", value: 450 },
      { device: "App Mobile", value: 520 },
      { device: "Nexti Smart", value: 280 },
    ],
    postsIgnoredRanking: [
      { position: 1, posto: "Posto Central", visualized: 145, unsigned: 89, rate: 61.4 },
      { position: 2, posto: "Posto Norte", visualized: 132, unsigned: 78, rate: 59.1 },
      { position: 3, posto: "Posto Sul", visualized: 128, unsigned: 73, rate: 57.0 },
      { position: 4, posto: "Posto Leste", visualized: 115, unsigned: 64, rate: 55.7 },
      { position: 5, posto: "Posto Oeste", visualized: 108, unsigned: 58, rate: 53.7 },
      { position: 6, posto: "Posto Industrial", visualized: 98, unsigned: 51, rate: 52.0 },
      { position: 7, posto: "Posto Shopping", visualized: 87, unsigned: 43, rate: 49.4 },
      { position: 8, posto: "Posto Aeroporto", visualized: 76, unsigned: 36, rate: 47.4 },
      { position: 9, posto: "Posto Rodoviária", visualized: 65, unsigned: 29, rate: 44.6 },
      { position: 10, posto: "Posto Matriz", visualized: 54, unsigned: 23, rate: 42.6 },
    ],
    employeesIgnoredRanking: [
      { position: 1, employee: "João Silva", visualized: 23, unsigned: 18, rate: 78.3 },
      { position: 2, employee: "Maria Santos", visualized: 21, unsigned: 16, rate: 76.2 },
      { position: 3, employee: "Pedro Oliveira", visualized: 19, unsigned: 14, rate: 73.7 },
      { position: 4, employee: "Ana Costa", visualized: 18, unsigned: 13, rate: 72.2 },
      { position: 5, employee: "Carlos Souza", visualized: 17, unsigned: 12, rate: 70.6 },
      { position: 6, employee: "Juliana Lima", visualized: 16, unsigned: 11, rate: 68.8 },
      { position: 7, employee: "Roberto Alves", visualized: 15, unsigned: 10, rate: 66.7 },
      { position: 8, employee: "Fernanda Rocha", visualized: 14, unsigned: 9, rate: 64.3 },
      { position: 9, employee: "Lucas Pereira", visualized: 13, unsigned: 8, rate: 61.5 },
      { position: 10, employee: "Patrícia Martins", visualized: 12, unsigned: 7, rate: 58.3 },
    ],
    postosLowEngagement: [
      { position: 1, posto: "Posto Central", engajamentoAvisos: 45.2, engajamentoConvocacoes: 38.6 },
      { position: 2, posto: "Posto Norte", engajamentoAvisos: 48.5, engajamentoConvocacoes: 40.9 },
      { position: 3, posto: "Posto Sul", engajamentoAvisos: 51.3, engajamentoConvocacoes: 44.5 },
      { position: 4, posto: "Posto Leste", engajamentoAvisos: 53.8, engajamentoConvocacoes: 47.0 },
      { position: 5, posto: "Posto Oeste", engajamentoAvisos: 55.1, engajamentoConvocacoes: 48.1 },
      { position: 6, posto: "Posto Industrial", engajamentoAvisos: 57.2, engajamentoConvocacoes: 50.0 },
      { position: 7, posto: "Posto Shopping", engajamentoAvisos: 58.9, engajamentoConvocacoes: 51.6 },
      { position: 8, posto: "Posto Aeroporto", engajamentoAvisos: 60.4, engajamentoConvocacoes: 52.9 },
      { position: 9, posto: "Posto Rodoviária", engajamentoAvisos: 62.1, engajamentoConvocacoes: 53.7 },
      { position: 10, posto: "Posto Matriz", engajamentoAvisos: 63.8, engajamentoConvocacoes: 55.3 },
    ],
    postosEngagementRanking: [
      { position: 1, posto: "Posto Central", cliente: "Cliente A", engajamentoGeral: 41.9, engajamentoAvisos: 45.2, engajamentoConvocacoes: 38.6 },
      { position: 2, posto: "Posto Norte", cliente: "Cliente B", engajamentoGeral: 44.7, engajamentoAvisos: 48.5, engajamentoConvocacoes: 40.9 },
      { position: 3, posto: "Posto Sul", cliente: "Cliente C", engajamentoGeral: 47.9, engajamentoAvisos: 51.3, engajamentoConvocacoes: 44.5 },
      { position: 4, posto: "Posto Leste", cliente: "Cliente A", engajamentoGeral: 50.4, engajamentoAvisos: 53.8, engajamentoConvocacoes: 47.0 },
      { position: 5, posto: "Posto Oeste", cliente: "Cliente D", engajamentoGeral: 51.6, engajamentoAvisos: 55.1, engajamentoConvocacoes: 48.1 },
      { position: 6, posto: "Posto Industrial", cliente: "Cliente B", engajamentoGeral: 53.6, engajamentoAvisos: 57.2, engajamentoConvocacoes: 50.0 },
      { position: 7, posto: "Posto Shopping", cliente: "Cliente E", engajamentoGeral: 55.3, engajamentoAvisos: 58.9, engajamentoConvocacoes: 51.6 },
      { position: 8, posto: "Posto Aeroporto", cliente: "Cliente F", engajamentoGeral: 56.7, engajamentoAvisos: 60.4, engajamentoConvocacoes: 52.9 },
      { position: 9, posto: "Posto Rodoviária", cliente: "Cliente C", engajamentoGeral: 57.9, engajamentoAvisos: 62.1, engajamentoConvocacoes: 53.7 },
      { position: 10, posto: "Posto Matriz", cliente: "Cliente A", engajamentoGeral: 59.6, engajamentoAvisos: 63.8, engajamentoConvocacoes: 55.3 },
      { position: 11, posto: "Posto Industrial 2", cliente: "Cliente G", engajamentoGeral: 61.2, engajamentoAvisos: 65.2, engajamentoConvocacoes: 57.2 },
      { position: 12, posto: "Posto Shopping 2", cliente: "Cliente H", engajamentoGeral: 63.5, engajamentoAvisos: 67.5, engajamentoConvocacoes: 59.5 },
      { position: 13, posto: "Posto Aeroporto 2", cliente: "Cliente I", engajamentoGeral: 65.8, engajamentoAvisos: 69.8, engajamentoConvocacoes: 61.8 },
      { position: 14, posto: "Posto Rodoviária 2", cliente: "Cliente J", engajamentoGeral: 68.4, engajamentoAvisos: 72.4, engajamentoConvocacoes: 64.4 },
      { position: 15, posto: "Posto Matriz 2", cliente: "Cliente K", engajamentoGeral: 71.2, engajamentoAvisos: 75.2, engajamentoConvocacoes: 67.2 },
    ],
    colaboradoresEngagementRanking: [
      { position: 1, colaborador: "João Silva", engajamentoGeral: 32.1 },
      { position: 2, colaborador: "Maria Santos", engajamentoGeral: 34.6 },
      { position: 3, colaborador: "Pedro Oliveira", engajamentoGeral: 37.5 },
      { position: 4, colaborador: "Ana Costa", engajamentoGeral: 39.1 },
      { position: 5, colaborador: "Carlos Souza", engajamentoGeral: 40.9 },
      { position: 6, colaborador: "Juliana Lima", engajamentoGeral: 42.9 },
      { position: 7, colaborador: "Roberto Alves", engajamentoGeral: 45.0 },
      { position: 8, colaborador: "Fernanda Rocha", engajamentoGeral: 47.4 },
      { position: 9, colaborador: "Lucas Pereira", engajamentoGeral: 50.0 },
      { position: 10, colaborador: "Patrícia Martins", engajamentoGeral: 52.9 },
    ],
    
    // Engajamento Geral do Módulo com hierarquia (empresa -> cliente -> posto -> colaborador)
    engajamentoGeralDetalhado: [
      {
        empresa: "Nexti",
        engajamentoAvisos: 72.5,
        engajamentoConvocacoes: 65.3,
        engajamentoGeral: 68.9,
        clientes: [
          {
            cliente: "Cliente A",
            engajamentoAvisos: 75.2,
            engajamentoConvocacoes: 68.5,
            engajamentoGeral: 71.9,
            postos: [
              {
                posto: "Posto Central",
                engajamentoAvisos: 78.5,
                engajamentoConvocacoes: 72.3,
                engajamentoGeral: 75.4,
                colaboradores: [
                  { colaborador: "João Silva", engajamentoAvisos: 82.1, engajamentoConvocacoes: 75.5, engajamentoGeral: 78.8 },
                  { colaborador: "Maria Santos", engajamentoAvisos: 79.3, engajamentoConvocacoes: 71.8, engajamentoGeral: 75.6 },
                  { colaborador: "Pedro Oliveira", engajamentoAvisos: 74.8, engajamentoConvocacoes: 69.2, engajamentoGeral: 72.0 },
                ]
              },
              {
                posto: "Posto Norte",
                engajamentoAvisos: 72.8,
                engajamentoConvocacoes: 65.9,
                engajamentoGeral: 69.4,
                colaboradores: [
                  { colaborador: "Ana Costa", engajamentoAvisos: 76.5, engajamentoConvocacoes: 69.2, engajamentoGeral: 72.9 },
                  { colaborador: "Carlos Souza", engajamentoAvisos: 70.2, engajamentoConvocacoes: 63.8, engajamentoGeral: 67.0 },
                ]
              },
            ]
          },
          {
            cliente: "Cliente B",
            engajamentoAvisos: 69.5,
            engajamentoConvocacoes: 62.1,
            engajamentoGeral: 65.8,
            postos: [
              {
                posto: "Posto Sul",
                engajamentoAvisos: 71.2,
                engajamentoConvocacoes: 64.5,
                engajamentoGeral: 67.9,
                colaboradores: [
                  { colaborador: "Juliana Lima", engajamentoAvisos: 74.8, engajamentoConvocacoes: 68.2, engajamentoGeral: 71.5 },
                  { colaborador: "Roberto Alves", engajamentoAvisos: 68.5, engajamentoConvocacoes: 61.8, engajamentoGeral: 65.2 },
                ]
              },
            ]
          },
        ]
      },
      {
        empresa: "G4S",
        engajamentoAvisos: 68.3,
        engajamentoConvocacoes: 61.8,
        engajamentoGeral: 65.1,
        clientes: [
          {
            cliente: "Cliente C",
            engajamentoAvisos: 70.5,
            engajamentoConvocacoes: 64.2,
            engajamentoGeral: 67.4,
            postos: [
              {
                posto: "Posto Leste",
                engajamentoAvisos: 72.8,
                engajamentoConvocacoes: 66.5,
                engajamentoGeral: 69.7,
                colaboradores: [
                  { colaborador: "Fernanda Rocha", engajamentoAvisos: 75.2, engajamentoConvocacoes: 69.8, engajamentoGeral: 72.5 },
                  { colaborador: "Lucas Pereira", engajamentoAvisos: 71.5, engajamentoConvocacoes: 64.2, engajamentoGeral: 67.9 },
                ]
              },
              {
                posto: "Posto Oeste",
                engajamentoAvisos: 68.5,
                engajamentoConvocacoes: 62.3,
                engajamentoGeral: 65.4,
                colaboradores: [
                  { colaborador: "Patrícia Martins", engajamentoAvisos: 72.1, engajamentoConvocacoes: 65.8, engajamentoGeral: 69.0 },
                  { colaborador: "André Silva", engajamentoAvisos: 66.2, engajamentoConvocacoes: 59.8, engajamentoGeral: 63.0 },
                ]
              },
            ]
          },
        ]
      },
      {
        empresa: "JCC",
        engajamentoAvisos: 75.8,
        engajamentoConvocacoes: 70.2,
        engajamentoGeral: 73.0,
        clientes: [
          {
            cliente: "Cliente D",
            engajamentoAvisos: 75.8,
            engajamentoConvocacoes: 70.2,
            engajamentoGeral: 73.0,
            postos: [
              {
                posto: "Posto Industrial",
                engajamentoAvisos: 78.2,
                engajamentoConvocacoes: 73.5,
                engajamentoGeral: 75.9,
                colaboradores: [
                  { colaborador: "Rafael Costa", engajamentoAvisos: 81.5, engajamentoConvocacoes: 76.8, engajamentoGeral: 79.2 },
                  { colaborador: "Camila Souza", engajamentoAvisos: 76.8, engajamentoConvocacoes: 71.2, engajamentoGeral: 74.0 },
                ]
              },
              {
                posto: "Posto Shopping",
                engajamentoAvisos: 73.5,
                engajamentoConvocacoes: 67.8,
                engajamentoGeral: 70.7,
                colaboradores: [
                  { colaborador: "Bruno Lima", engajamentoAvisos: 76.2, engajamentoConvocacoes: 70.5, engajamentoGeral: 73.4 },
                  { colaborador: "Tatiana Rocha", engajamentoAvisos: 71.8, engajamentoConvocacoes: 66.2, engajamentoGeral: 69.0 },
                ]
              },
            ]
          },
        ]
      },
      {
        empresa: "Verzani",
        engajamentoAvisos: 70.5,
        engajamentoConvocacoes: 64.8,
        engajamentoGeral: 67.7,
        clientes: [
          {
            cliente: "Cliente E",
            engajamentoAvisos: 70.5,
            engajamentoConvocacoes: 64.8,
            engajamentoGeral: 67.7,
            postos: [
              {
                posto: "Posto Aeroporto",
                engajamentoAvisos: 73.2,
                engajamentoConvocacoes: 67.5,
                engajamentoGeral: 70.4,
                colaboradores: [
                  { colaborador: "Marcelo Santos", engajamentoAvisos: 76.8, engajamentoConvocacoes: 71.2, engajamentoGeral: 74.0 },
                  { colaborador: "Larissa Mendes", engajamentoAvisos: 70.5, engajamentoConvocacoes: 64.8, engajamentoGeral: 67.7 },
                ]
              },
            ]
          },
        ]
      },
      {
        empresa: "Orsegups",
        engajamentoAvisos: 77.2,
        engajamentoConvocacoes: 72.8,
        engajamentoGeral: 75.0,
        clientes: [
          {
            cliente: "Cliente F",
            engajamentoAvisos: 77.2,
            engajamentoConvocacoes: 72.8,
            engajamentoGeral: 75.0,
            postos: [
              {
                posto: "Posto Rodoviária",
                engajamentoAvisos: 79.5,
                engajamentoConvocacoes: 75.2,
                engajamentoGeral: 77.4,
                colaboradores: [
                  { colaborador: "Eduardo Alves", engajamentoAvisos: 82.3, engajamentoConvocacoes: 78.5, engajamentoGeral: 80.4 },
                  { colaborador: "Simone Ribeiro", engajamentoAvisos: 77.8, engajamentoConvocacoes: 73.2, engajamentoGeral: 75.5 },
                ]
              },
              {
                posto: "Posto Matriz",
                engajamentoAvisos: 75.2,
                engajamentoConvocacoes: 70.8,
                engajamentoGeral: 73.0,
                colaboradores: [
                  { colaborador: "Gustavo Lima", engajamentoAvisos: 78.5, engajamentoConvocacoes: 73.8, engajamentoGeral: 76.2 },
                  { colaborador: "Vanessa Costa", engajamentoAvisos: 72.8, engajamentoConvocacoes: 68.5, engajamentoGeral: 70.7 },
                ]
              },
            ]
          },
        ]
      },
    ],
  },

  // Checklist data
  checklist: {
    totalSent: 856,
    totalResponded: 623,
    totalNotResponded: 233,
    respondedPercentage: 72.8,
    responseStatus: [
      { status: "Respondidos", value: 623, percentage: 72.8 },
      { status: "Não Respondidos", value: 233, percentage: 27.2 },
    ],
    deviceDistribution: [
      { device: "Aplicativo", value: 380 },
      { device: "Terminal", value: 190 },
    ],
    postsNotRespondedRanking: [
      { position: 1, posto: "Posto Central", sent: 45, notResponded: 23, rate: 51.1 },
      { position: 2, posto: "Posto Norte", sent: 42, notResponded: 21, rate: 50.0 },
      { position: 3, posto: "Posto Sul", sent: 39, notResponded: 19, rate: 48.7 },
      { position: 4, posto: "Posto Leste", sent: 37, notResponded: 17, rate: 45.9 },
      { position: 5, posto: "Posto Oeste", sent: 35, notResponded: 15, rate: 42.9 },
      { position: 6, posto: "Posto Industrial", sent: 33, notResponded: 14, rate: 42.4 },
      { position: 7, posto: "Posto Shopping", sent: 31, notResponded: 12, rate: 38.7 },
      { position: 8, posto: "Posto Aeroporto", sent: 29, notResponded: 11, rate: 37.9 },
      { position: 9, posto: "Posto Rodoviária", sent: 27, notResponded: 9, rate: 33.3 },
      { position: 10, posto: "Posto Matriz", sent: 25, notResponded: 8, rate: 32.0 },
    ],
    employeesNotRespondedRanking: [
      { position: 1, employee: "João Silva", sent: 12, notResponded: 8, rate: 66.7 },
      { position: 2, employee: "Maria Santos", sent: 11, notResponded: 7, rate: 63.6 },
      { position: 3, employee: "Pedro Oliveira", sent: 10, notResponded: 6, rate: 60.0 },
      { position: 4, employee: "Ana Costa", sent: 10, notResponded: 6, rate: 60.0 },
      { position: 5, employee: "Carlos Souza", sent: 9, notResponded: 5, rate: 55.6 },
      { position: 6, employee: "Juliana Lima", sent: 9, notResponded: 5, rate: 55.6 },
      { position: 7, employee: "Roberto Alves", sent: 8, notResponded: 4, rate: 50.0 },
      { position: 8, employee: "Fernanda Rocha", sent: 8, notResponded: 4, rate: 50.0 },
      { position: 9, employee: "Lucas Pereira", sent: 7, notResponded: 3, rate: 42.9 },
      { position: 10, employee: "Patrícia Martins", sent: 7, notResponded: 3, rate: 42.9 },
    ],
  },
};
