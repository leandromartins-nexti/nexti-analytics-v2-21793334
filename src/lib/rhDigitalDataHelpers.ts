// Helper functions to calculate filtered metrics for RH Digital module

export interface ColaboradorData {
  nome: string;
  posto: string;
  avisosEnviados: number;
  avisosVisualizados: number;
  convocacoesEnviadas: number;
  convocacoesRespondidas: number;
  convocacoesNaoRespondidas: number;
  convocacoesVisualizadasNaoRespondidas: number;
  checklistsEnviados: number;
  checklistsRespondidos: number;
  checklistsNaoRespondidos: number;
  inconsistencies: number;
  adjustmentRequests: number;
  processedRequests: number;
  markingQuality: number;
}

// Sample detailed data by colaborador for filtering
export const colaboradoresDetailedData: ColaboradorData[] = [
  {
    nome: "João Silva",
    posto: "Posto Central",
    avisosEnviados: 45,
    avisosVisualizados: 32,
    convocacoesEnviadas: 23,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 18,
    convocacoesVisualizadasNaoRespondidas: 12,
    checklistsEnviados: 12,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 8,
    inconsistencies: 45,
    adjustmentRequests: 120,
    processedRequests: 105,
    markingQuality: 75.0,
  },
  {
    nome: "Maria Santos",
    posto: "Posto Norte",
    avisosEnviados: 42,
    avisosVisualizados: 30,
    convocacoesEnviadas: 21,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 16,
    convocacoesVisualizadasNaoRespondidas: 11,
    checklistsEnviados: 11,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 7,
    inconsistencies: 38,
    adjustmentRequests: 98,
    processedRequests: 85,
    markingQuality: 78.5,
  },
  {
    nome: "Pedro Oliveira",
    posto: "Posto Sul",
    avisosEnviados: 38,
    avisosVisualizados: 28,
    convocacoesEnviadas: 19,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 14,
    convocacoesVisualizadasNaoRespondidas: 9,
    checklistsEnviados: 10,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 6,
    inconsistencies: 32,
    adjustmentRequests: 85,
    processedRequests: 75,
    markingQuality: 82.0,
  },
  {
    nome: "Ana Costa",
    posto: "Posto Leste",
    avisosEnviados: 35,
    avisosVisualizados: 26,
    convocacoesEnviadas: 18,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 13,
    convocacoesVisualizadasNaoRespondidas: 8,
    checklistsEnviados: 10,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 6,
    inconsistencies: 29,
    adjustmentRequests: 78,
    processedRequests: 68,
    markingQuality: 85.5,
  },
  {
    nome: "Carlos Souza",
    posto: "Posto Oeste",
    avisosEnviados: 32,
    avisosVisualizados: 24,
    convocacoesEnviadas: 17,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 12,
    convocacoesVisualizadasNaoRespondidas: 7,
    checklistsEnviados: 9,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 5,
    inconsistencies: 26,
    adjustmentRequests: 72,
    processedRequests: 63,
    markingQuality: 87.0,
  },
  {
    nome: "Juliana Lima",
    posto: "Posto Industrial",
    avisosEnviados: 30,
    avisosVisualizados: 22,
    convocacoesEnviadas: 16,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 11,
    convocacoesVisualizadasNaoRespondidas: 6,
    checklistsEnviados: 9,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 5,
    inconsistencies: 24,
    adjustmentRequests: 65,
    processedRequests: 57,
    markingQuality: 88.5,
  },
  {
    nome: "Roberto Alves",
    posto: "Posto Shopping",
    avisosEnviados: 28,
    avisosVisualizados: 20,
    convocacoesEnviadas: 15,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 10,
    convocacoesVisualizadasNaoRespondidas: 5,
    checklistsEnviados: 8,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 4,
    inconsistencies: 22,
    adjustmentRequests: 60,
    processedRequests: 52,
    markingQuality: 89.5,
  },
  {
    nome: "Fernanda Rocha",
    posto: "Posto Aeroporto",
    avisosEnviados: 26,
    avisosVisualizados: 19,
    convocacoesEnviadas: 14,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 9,
    convocacoesVisualizadasNaoRespondidas: 4,
    checklistsEnviados: 8,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 4,
    inconsistencies: 20,
    adjustmentRequests: 55,
    processedRequests: 48,
    markingQuality: 90.5,
  },
  {
    nome: "Lucas Pereira",
    posto: "Posto Rodoviária",
    avisosEnviados: 24,
    avisosVisualizados: 18,
    convocacoesEnviadas: 13,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 8,
    convocacoesVisualizadasNaoRespondidas: 3,
    checklistsEnviados: 7,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 3,
    inconsistencies: 18,
    adjustmentRequests: 50,
    processedRequests: 44,
    markingQuality: 91.5,
  },
  {
    nome: "Patrícia Martins",
    posto: "Posto Matriz",
    avisosEnviados: 22,
    avisosVisualizados: 17,
    convocacoesEnviadas: 12,
    convocacoesRespondidas: 5,
    convocacoesNaoRespondidas: 7,
    convocacoesVisualizadasNaoRespondidas: 2,
    checklistsEnviados: 7,
    checklistsRespondidos: 4,
    checklistsNaoRespondidos: 3,
    inconsistencies: 16,
    adjustmentRequests: 45,
    processedRequests: 40,
    markingQuality: 92.5,
  },
];

// Helper function to get filtered metrics for Avisos e Convocações
export function getFilteredAvisosConvocacoesMetrics(colaboradorNome?: string) {
  if (!colaboradorNome) {
    // Return totals when no filter is active
    return {
      totalAvisosEnviados: colaboradoresDetailedData.reduce((sum, c) => sum + c.avisosEnviados, 0),
      totalAvisosVisualizados: colaboradoresDetailedData.reduce((sum, c) => sum + c.avisosVisualizados, 0),
      totalConvocacoesEnviadas: colaboradoresDetailedData.reduce((sum, c) => sum + c.convocacoesEnviadas, 0),
      totalConvocacoesRespondidas: colaboradoresDetailedData.reduce((sum, c) => sum + c.convocacoesRespondidas, 0),
      totalConvocacoesNaoRespondidas: colaboradoresDetailedData.reduce((sum, c) => sum + c.convocacoesNaoRespondidas, 0),
      totalConvocacoesVisualizadasNaoRespondidas: colaboradoresDetailedData.reduce((sum, c) => sum + c.convocacoesVisualizadasNaoRespondidas, 0),
    };
  }

  // Return metrics for specific colaborador
  const colaborador = colaboradoresDetailedData.find(c => c.nome === colaboradorNome);
  if (!colaborador) {
    return {
      totalAvisosEnviados: 0,
      totalAvisosVisualizados: 0,
      totalConvocacoesEnviadas: 0,
      totalConvocacoesRespondidas: 0,
      totalConvocacoesNaoRespondidas: 0,
      totalConvocacoesVisualizadasNaoRespondidas: 0,
    };
  }

  return {
    totalAvisosEnviados: colaborador.avisosEnviados,
    totalAvisosVisualizados: colaborador.avisosVisualizados,
    totalConvocacoesEnviadas: colaborador.convocacoesEnviadas,
    totalConvocacoesRespondidas: colaborador.convocacoesRespondidas,
    totalConvocacoesNaoRespondidas: colaborador.convocacoesNaoRespondidas,
    totalConvocacoesVisualizadasNaoRespondidas: colaborador.convocacoesVisualizadasNaoRespondidas,
  };
}

// Helper function to get filtered metrics for Checklist
export function getFilteredChecklistMetrics(colaboradorNome?: string) {
  if (!colaboradorNome) {
    // Return totals when no filter is active
    return {
      totalSent: colaboradoresDetailedData.reduce((sum, c) => sum + c.checklistsEnviados, 0),
      totalResponded: colaboradoresDetailedData.reduce((sum, c) => sum + c.checklistsRespondidos, 0),
      totalNotResponded: colaboradoresDetailedData.reduce((sum, c) => sum + c.checklistsNaoRespondidos, 0),
    };
  }

  // Return metrics for specific colaborador
  const colaborador = colaboradoresDetailedData.find(c => c.nome === colaboradorNome);
  if (!colaborador) {
    return {
      totalSent: 0,
      totalResponded: 0,
      totalNotResponded: 0,
    };
  }

  return {
    totalSent: colaborador.checklistsEnviados,
    totalResponded: colaborador.checklistsRespondidos,
    totalNotResponded: colaborador.checklistsNaoRespondidos,
  };
}

// Helper function to get filtered metrics for Time Tracking
export function getFilteredTimeTrackingMetrics(colaboradorNome?: string) {
  if (!colaboradorNome) {
    // Return totals when no filter is active
    return {
      totalInconsistencies: colaboradoresDetailedData.reduce((sum, c) => sum + c.inconsistencies, 0),
      totalAdjustmentRequests: colaboradoresDetailedData.reduce((sum, c) => sum + c.adjustmentRequests, 0),
      processedRequests: colaboradoresDetailedData.reduce((sum, c) => sum + c.processedRequests, 0),
      markingQuality: Math.round(colaboradoresDetailedData.reduce((sum, c) => sum + c.markingQuality, 0) / colaboradoresDetailedData.length),
    };
  }

  // Return metrics for specific colaborador
  const colaborador = colaboradoresDetailedData.find(c => c.nome === colaboradorNome);
  if (!colaborador) {
    return {
      totalInconsistencies: 0,
      totalAdjustmentRequests: 0,
      processedRequests: 0,
      markingQuality: 0,
    };
  }

  return {
    totalInconsistencies: colaborador.inconsistencies,
    totalAdjustmentRequests: colaborador.adjustmentRequests,
    processedRequests: colaborador.processedRequests,
    markingQuality: colaborador.markingQuality,
  };
}
