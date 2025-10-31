// ============================================
// BIG NUMBERS - Indicadores principais
// ============================================

export interface BigNumbers {
  horasPrevistas: number;
  horasRealizadas: number;
  diferencaPrevistoRealizado: number;
  horasExtrasTotais: number;
  saldoBancoHoras: number;
  complianceTrabalhista: number;
  horasExtrasAprovadas: number;
  horasExtrasReprovadas: number;
}

export const bigNumbers: BigNumbers = {
  horasPrevistas: 248500,
  horasRealizadas: 265300,
  diferencaPrevistoRealizado: 16800,
  horasExtrasTotais: 23400,
  saldoBancoHoras: 12.5,
  complianceTrabalhista: 87.3,
  horasExtrasAprovadas: 78.5,
  horasExtrasReprovadas: 21.5,
};

// ============================================
// SEÇÃO 1: Jornada Prevista x Realizada
// ============================================

export interface JornadaMensal {
  mes: string;
  previstas: number;
  realizadas: number;
  aderencia: number;
}

export const jornadaMensal: JornadaMensal[] = [
  { mes: "Jan", previstas: 20500, realizadas: 21800, aderencia: 106.3 },
  { mes: "Fev", previstas: 19200, realizadas: 20100, aderencia: 104.7 },
  { mes: "Mar", previstas: 21800, realizadas: 23200, aderencia: 106.4 },
  { mes: "Abr", previstas: 20800, realizadas: 21900, aderencia: 105.3 },
  { mes: "Mai", previstas: 22100, realizadas: 23800, aderencia: 107.7 },
  { mes: "Jun", previstas: 20900, realizadas: 22400, aderencia: 107.2 },
  { mes: "Jul", previstas: 21500, realizadas: 22100, aderencia: 102.8 },
  { mes: "Ago", previstas: 21200, realizadas: 22800, aderencia: 107.5 },
  { mes: "Set", previstas: 20700, realizadas: 21500, aderencia: 103.9 },
  { mes: "Out", previstas: 22300, realizadas: 23900, aderencia: 107.2 },
  { mes: "Nov", previstas: 21800, realizadas: 22700, aderencia: 104.1 },
  { mes: "Dez", previstas: 15700, realizadas: 19100, aderencia: 121.7 },
];

export interface JornadaPorEmpresa {
  empresa: string;
  cliente: string;
  previstas: number;
  realizadas: number;
  desvio: number;
  aderencia: number;
}

export const jornadaPorEmpresa: JornadaPorEmpresa[] = [
  { empresa: "Nexti SP", cliente: "Shopping Center ABC", previstas: 45000, realizadas: 48500, desvio: 3500, aderencia: 107.8 },
  { empresa: "Nexti RJ", cliente: "Banco Nacional", previstas: 38000, realizadas: 41200, desvio: 3200, aderencia: 108.4 },
  { empresa: "Nexti MG", cliente: "Indústria XYZ", previstas: 32000, realizadas: 34800, desvio: 2800, aderencia: 108.8 },
  { empresa: "Nexti SP", cliente: "Hospital São Lucas", previstas: 28000, realizadas: 29100, desvio: 1100, aderencia: 103.9 },
  { empresa: "Nexti PR", cliente: "Universidade Tech", previstas: 25000, realizadas: 26900, desvio: 1900, aderencia: 107.6 },
  { empresa: "Nexti RS", cliente: "Aeroporto Sul", previstas: 22000, realizadas: 24200, desvio: 2200, aderencia: 110.0 },
  { empresa: "Nexti BA", cliente: "Porto Salvador", previstas: 19500, realizadas: 20800, desvio: 1300, aderencia: 106.7 },
  { empresa: "Nexti PE", cliente: "Rede Varejo PE", previstas: 18000, realizadas: 19500, desvio: 1500, aderencia: 108.3 },
  { empresa: "Nexti SC", cliente: "Tech Park SC", previstas: 12000, realizadas: 12700, desvio: 700, aderencia: 105.8 },
  { empresa: "Nexti DF", cliente: "Órgão Público DF", previstas: 9000, realizadas: 7600, desvio: -1400, aderencia: 84.4 },
];

// ============================================
// SEÇÃO 2: Horas Extras e Banco de Horas
// ============================================

export interface HorasExtrasPorPosto {
  posto: string;
  cliente: string;
  empresa: string;
  horasExtras: number;
  custo: number;
}

export const horasExtrasPorPosto: HorasExtrasPorPosto[] = [
  { posto: "Portaria Principal - Shopping ABC", cliente: "Shopping Center ABC", empresa: "Nexti SP", horasExtras: 380, custo: 12450 },
  { posto: "Vigilância Noturna - Banco", cliente: "Banco Nacional", empresa: "Nexti RJ", horasExtras: 340, custo: 11560 },
  { posto: "Segurança Industrial - XYZ", cliente: "Indústria XYZ", empresa: "Nexti MG", horasExtras: 295, custo: 9865 },
  { posto: "Recepção Hospital", cliente: "Hospital São Lucas", empresa: "Nexti SP", horasExtras: 275, custo: 8525 },
  { posto: "Biblioteca 24h - Tech", cliente: "Universidade Tech", empresa: "Nexti PR", horasExtras: 260, custo: 8320 },
  { posto: "Terminal 2 - Aeroporto", cliente: "Aeroporto Sul", empresa: "Nexti RS", horasExtras: 245, custo: 8085 },
  { posto: "Gate Control - Porto", cliente: "Porto Salvador", empresa: "Nexti BA", horasExtras: 230, custo: 7590 },
  { posto: "Loja Centro - Varejo", cliente: "Rede Varejo PE", empresa: "Nexti PE", horasExtras: 215, custo: 6880 },
  { posto: "Acesso Principal - Park", cliente: "Tech Park SC", empresa: "Nexti SC", horasExtras: 188, custo: 6016 },
  { posto: "Prédio Anexo - DF", cliente: "Órgão Público DF", empresa: "Nexti DF", horasExtras: 165, custo: 5280 },
];

export interface ColaboradorHorasExtras {
  id: string;
  colaborador: string;
  posto: string;
  cliente: string;
  empresa: string;
  horasExtras: number;
  saldoBH: number;
}

export const colaboradorHorasExtras: ColaboradorHorasExtras[] = [
  { id: "C001", colaborador: "João Silva", posto: "Portaria Principal - Shopping ABC", cliente: "Shopping Center ABC", empresa: "Nexti SP", horasExtras: 45, saldoBH: 23 },
  { id: "C002", colaborador: "Maria Santos", posto: "Vigilância Noturna - Banco", cliente: "Banco Nacional", empresa: "Nexti RJ", horasExtras: 42, saldoBH: 18 },
  { id: "C003", colaborador: "Pedro Costa", posto: "Segurança Industrial - XYZ", cliente: "Indústria XYZ", empresa: "Nexti MG", horasExtras: 38, saldoBH: 15 },
  { id: "C004", colaborador: "Ana Paula", posto: "Recepção Hospital", cliente: "Hospital São Lucas", empresa: "Nexti SP", horasExtras: 35, saldoBH: 12 },
  { id: "C005", colaborador: "Carlos Eduardo", posto: "Biblioteca 24h - Tech", cliente: "Universidade Tech", empresa: "Nexti PR", horasExtras: 33, saldoBH: -8 },
  { id: "C006", colaborador: "Juliana Oliveira", posto: "Terminal 2 - Aeroporto", cliente: "Aeroporto Sul", empresa: "Nexti RS", horasExtras: 31, saldoBH: 25 },
  { id: "C007", colaborador: "Roberto Alves", posto: "Gate Control - Porto", cliente: "Porto Salvador", empresa: "Nexti BA", horasExtras: 29, saldoBH: 10 },
  { id: "C008", colaborador: "Fernanda Lima", posto: "Loja Centro - Varejo", cliente: "Rede Varejo PE", empresa: "Nexti PE", horasExtras: 27, saldoBH: -5 },
  { id: "C009", colaborador: "Ricardo Souza", posto: "Acesso Principal - Park", cliente: "Tech Park SC", empresa: "Nexti SC", horasExtras: 25, saldoBH: 8 },
  { id: "C010", colaborador: "Patrícia Rocha", posto: "Prédio Anexo - DF", cliente: "Órgão Público DF", empresa: "Nexti DF", horasExtras: 23, saldoBH: -12 },
];

export interface BancoHorasMensal {
  mes: string;
  credito: number;
  debito: number;
  saldoLiquido: number;
}

export const bancoHorasMensal: BancoHorasMensal[] = [
  { mes: "Jan", credito: 1850, debito: 980, saldoLiquido: 870 },
  { mes: "Fev", credito: 1620, debito: 1120, saldoLiquido: 500 },
  { mes: "Mar", credito: 2100, debito: 890, saldoLiquido: 1210 },
  { mes: "Abr", credito: 1780, debito: 1050, saldoLiquido: 730 },
  { mes: "Mai", credito: 2340, debito: 750, saldoLiquido: 1590 },
  { mes: "Jun", credito: 2020, debito: 1180, saldoLiquido: 840 },
  { mes: "Jul", credito: 1590, debito: 1340, saldoLiquido: 250 },
  { mes: "Ago", credito: 2180, debito: 920, saldoLiquido: 1260 },
  { mes: "Set", credito: 1710, debito: 1090, saldoLiquido: 620 },
  { mes: "Out", credito: 2290, debito: 810, saldoLiquido: 1480 },
  { mes: "Nov", credito: 1920, debito: 1150, saldoLiquido: 770 },
  { mes: "Dez", credito: 2580, debito: 680, saldoLiquido: 1900 },
];

// ============================================
// SEÇÃO 3: Compliance Trabalhista
// ============================================

export interface EventoCompliance {
  tipo: string;
  ocorrencias: number;
  descricao: string;
}

export const eventosCompliance: EventoCompliance[] = [
  { tipo: "HE acima do limite", ocorrencias: 287, descricao: "Horas extras acima do limite legal" },
  { tipo: "Interjornada < 11h", ocorrencias: 156, descricao: "Intervalo entre jornadas inferior a 11 horas" },
  { tipo: "7º dia consecutivo", ocorrencias: 94, descricao: "Sétimo dia consecutivo trabalhado" },
  { tipo: "35h descanso não cumpridas", ocorrencias: 73, descricao: "35 horas de descanso não cumpridas" },
  { tipo: "Intervalo intrajornada", ocorrencias: 125, descricao: "Intervalo intrajornada inferior ao esperado" },
  { tipo: "6h consecutivas", ocorrencias: 198, descricao: "Mais de 6 horas consecutivas sem intervalo" },
];

export interface CompliancePorCliente {
  cliente: string;
  empresa: string;
  totalOcorrencias: number;
  colaboradoresComOcorrencia: number;
  totalColaboradores: number;
  percentualCompliance: number;
}

export const compliancePorCliente: CompliancePorCliente[] = [
  { cliente: "Shopping Center ABC", empresa: "Nexti SP", totalOcorrencias: 168, colaboradoresComOcorrencia: 42, totalColaboradores: 320, percentualCompliance: 86.9 },
  { cliente: "Banco Nacional", empresa: "Nexti RJ", totalOcorrencias: 142, colaboradoresComOcorrencia: 38, totalColaboradores: 280, percentualCompliance: 86.4 },
  { cliente: "Indústria XYZ", empresa: "Nexti MG", totalOcorrencias: 118, colaboradoresComOcorrencia: 31, totalColaboradores: 245, percentualCompliance: 87.3 },
  { cliente: "Hospital São Lucas", empresa: "Nexti SP", totalOcorrencias: 89, colaboradoresComOcorrencia: 24, totalColaboradores: 198, percentualCompliance: 87.9 },
  { cliente: "Universidade Tech", empresa: "Nexti PR", totalOcorrencias: 95, colaboradoresComOcorrencia: 28, totalColaboradores: 215, percentualCompliance: 87.0 },
  { cliente: "Aeroporto Sul", empresa: "Nexti RS", totalOcorrencias: 76, colaboradoresComOcorrencia: 19, totalColaboradores: 182, percentualCompliance: 89.6 },
  { cliente: "Porto Salvador", empresa: "Nexti BA", totalOcorrencias: 63, colaboradoresComOcorrencia: 17, totalColaboradores: 165, percentualCompliance: 89.7 },
  { cliente: "Rede Varejo PE", empresa: "Nexti PE", totalOcorrencias: 54, colaboradoresComOcorrencia: 15, totalColaboradores: 148, percentualCompliance: 89.9 },
  { cliente: "Tech Park SC", empresa: "Nexti SC", totalOcorrencias: 38, colaboradoresComOcorrencia: 11, totalColaboradores: 105, percentualCompliance: 89.5 },
  { cliente: "Órgão Público DF", empresa: "Nexti DF", totalOcorrencias: 90, colaboradoresComOcorrencia: 25, totalColaboradores: 95, percentualCompliance: 73.7 },
];

export interface ComplianceMensal {
  mes: string;
  totalOcorrencias: number;
  percentualCompliance: number;
}

export const complianceMensal: ComplianceMensal[] = [
  { mes: "Jan", totalOcorrencias: 98, percentualCompliance: 85.2 },
  { mes: "Fev", totalOcorrencias: 87, percentualCompliance: 86.8 },
  { mes: "Mar", totalOcorrencias: 105, percentualCompliance: 84.1 },
  { mes: "Abr", totalOcorrencias: 92, percentualCompliance: 86.0 },
  { mes: "Mai", totalOcorrencias: 112, percentualCompliance: 83.2 },
  { mes: "Jun", totalOcorrencias: 89, percentualCompliance: 86.5 },
  { mes: "Jul", totalOcorrencias: 76, percentualCompliance: 88.4 },
  { mes: "Ago", totalOcorrencias: 94, percentualCompliance: 85.9 },
  { mes: "Set", totalOcorrencias: 81, percentualCompliance: 87.6 },
  { mes: "Out", totalOcorrencias: 108, percentualCompliance: 83.8 },
  { mes: "Nov", totalOcorrencias: 85, percentualCompliance: 87.2 },
  { mes: "Dez", totalOcorrencias: 106, percentualCompliance: 84.0 },
];

// ============================================
// SEÇÃO 4: Aprovação de Horas Extras
// ============================================

export interface AprovacaoHorasExtras {
  totalSolicitadas: number;
  aprovadas: number;
  reprovadas: number;
  pendentes: number;
}

export const aprovacaoHorasExtras: AprovacaoHorasExtras = {
  totalSolicitadas: 1847,
  aprovadas: 1450,
  reprovadas: 397,
  pendentes: 0,
};

export interface MotivoReprovacao {
  motivo: string;
  quantidade: number;
  percentual: number;
}

export const motivosReprovacao: MotivoReprovacao[] = [
  { motivo: "Fora de política", quantidade: 156, percentual: 39.3 },
  { motivo: "Falta de justificativa", quantidade: 98, percentual: 24.7 },
  { motivo: "Erro de marcação", quantidade: 76, percentual: 19.1 },
  { motivo: "Não autorizado previamente", quantidade: 43, percentual: 10.8 },
  { motivo: "Outros", quantidade: 24, percentual: 6.1 },
];

export interface GestorAprovacao {
  gestor: string;
  empresa: string;
  solicitadas: number;
  aprovadas: number;
  reprovadas: number;
  taxaReprovacao: number;
}

export const gestoresAprovacao: GestorAprovacao[] = [
  { gestor: "Marcos Ferreira", empresa: "Nexti SP", solicitadas: 287, aprovadas: 245, reprovadas: 42, taxaReprovacao: 14.6 },
  { gestor: "Luciana Martins", empresa: "Nexti RJ", solicitadas: 256, aprovadas: 208, reprovadas: 48, taxaReprovacao: 18.8 },
  { gestor: "André Ribeiro", empresa: "Nexti MG", solicitadas: 218, aprovadas: 182, reprovadas: 36, taxaReprovacao: 16.5 },
  { gestor: "Camila Duarte", empresa: "Nexti SP", solicitadas: 195, aprovadas: 156, reprovadas: 39, taxaReprovacao: 20.0 },
  { gestor: "Rafael Torres", empresa: "Nexti PR", solicitadas: 178, aprovadas: 142, reprovadas: 36, taxaReprovacao: 20.2 },
  { gestor: "Beatriz Sousa", empresa: "Nexti RS", solicitadas: 165, aprovadas: 135, reprovadas: 30, taxaReprovacao: 18.2 },
  { gestor: "Gustavo Mendes", empresa: "Nexti BA", solicitadas: 142, aprovadas: 108, reprovadas: 34, taxaReprovacao: 23.9 },
  { gestor: "Isabela Castro", empresa: "Nexti PE", solicitadas: 128, aprovadas: 98, reprovadas: 30, taxaReprovacao: 23.4 },
  { gestor: "Felipe Barbosa", empresa: "Nexti SC", solicitadas: 98, aprovadas: 72, reprovadas: 26, taxaReprovacao: 26.5 },
  { gestor: "Daniela Pinto", empresa: "Nexti DF", solicitadas: 180, aprovadas: 104, reprovadas: 76, taxaReprovacao: 42.2 },
];

export interface AprovacaoMensal {
  mes: string;
  solicitadas: number;
  aprovadas: number;
  reprovadas: number;
}

export const aprovacaoMensal: AprovacaoMensal[] = [
  { mes: "Jan", solicitadas: 142, aprovadas: 115, reprovadas: 27 },
  { mes: "Fev", solicitadas: 128, aprovadas: 105, reprovadas: 23 },
  { mes: "Mar", solicitadas: 165, aprovadas: 132, reprovadas: 33 },
  { mes: "Abr", solicitadas: 138, aprovadas: 108, reprovadas: 30 },
  { mes: "Mai", solicitadas: 178, aprovadas: 142, reprovadas: 36 },
  { mes: "Jun", solicitadas: 152, aprovadas: 118, reprovadas: 34 },
  { mes: "Jul", solicitadas: 135, aprovadas: 110, reprovadas: 25 },
  { mes: "Ago", solicitadas: 168, aprovadas: 134, reprovadas: 34 },
  { mes: "Set", solicitadas: 145, aprovadas: 112, reprovadas: 33 },
  { mes: "Out", solicitadas: 185, aprovadas: 148, reprovadas: 37 },
  { mes: "Nov", solicitadas: 158, aprovadas: 125, reprovadas: 33 },
  { mes: "Dez", solicitadas: 153, aprovadas: 101, reprovadas: 52 },
];

// ============================================
// SEÇÃO 5: Atrasos e Faltas
// ============================================

export interface AtrasosFaltasPorCliente {
  cliente: string;
  empresa: string;
  atrasos: number;
  faltas: number;
  totalOcorrencias: number;
}

export const atrasosFaltasPorCliente: AtrasosFaltasPorCliente[] = [
  { cliente: "Shopping Center ABC", empresa: "Nexti SP", atrasos: 128, faltas: 42, totalOcorrencias: 170 },
  { cliente: "Banco Nacional", empresa: "Nexti RJ", atrasos: 112, faltas: 38, totalOcorrencias: 150 },
  { cliente: "Indústria XYZ", empresa: "Nexti MG", atrasos: 98, faltas: 31, totalOcorrencias: 129 },
  { cliente: "Hospital São Lucas", empresa: "Nexti SP", atrasos: 76, faltas: 28, totalOcorrencias: 104 },
  { cliente: "Universidade Tech", empresa: "Nexti PR", atrasos: 89, faltas: 24, totalOcorrencias: 113 },
  { cliente: "Aeroporto Sul", empresa: "Nexti RS", atrasos: 67, faltas: 19, totalOcorrencias: 86 },
  { cliente: "Porto Salvador", empresa: "Nexti BA", atrasos: 54, faltas: 17, totalOcorrencias: 71 },
  { cliente: "Rede Varejo PE", empresa: "Nexti PE", atrasos: 48, faltas: 15, totalOcorrencias: 63 },
  { cliente: "Tech Park SC", empresa: "Nexti SC", atrasos: 35, faltas: 12, totalOcorrencias: 47 },
  { cliente: "Órgão Público DF", empresa: "Nexti DF", atrasos: 82, faltas: 26, totalOcorrencias: 108 },
];

export interface ColaboradorAtrasosFaltas {
  id: string;
  colaborador: string;
  posto: string;
  cliente: string;
  empresa: string;
  atrasos: number;
  faltas: number;
  horasExtras: number;
}

export const colaboradorAtrasosFaltas: ColaboradorAtrasosFaltas[] = [
  { id: "C011", colaborador: "Lucas Ferreira", posto: "Portaria Principal - Shopping ABC", cliente: "Shopping Center ABC", empresa: "Nexti SP", atrasos: 12, faltas: 3, horasExtras: 28 },
  { id: "C012", colaborador: "Amanda Silva", posto: "Vigilância Noturna - Banco", cliente: "Banco Nacional", empresa: "Nexti RJ", atrasos: 10, faltas: 2, horasExtras: 32 },
  { id: "C013", colaborador: "Bruno Costa", posto: "Segurança Industrial - XYZ", cliente: "Indústria XYZ", empresa: "Nexti MG", atrasos: 9, faltas: 2, horasExtras: 18 },
  { id: "C014", colaborador: "Carla Mendes", posto: "Recepção Hospital", cliente: "Hospital São Lucas", empresa: "Nexti SP", atrasos: 8, faltas: 3, horasExtras: 22 },
  { id: "C015", colaborador: "Diego Santos", posto: "Biblioteca 24h - Tech", cliente: "Universidade Tech", empresa: "Nexti PR", atrasos: 11, faltas: 2, horasExtras: 35 },
  { id: "C016", colaborador: "Eliana Rocha", posto: "Terminal 2 - Aeroporto", cliente: "Aeroporto Sul", empresa: "Nexti RS", atrasos: 7, faltas: 1, horasExtras: 15 },
  { id: "C017", colaborador: "Fábio Lima", posto: "Gate Control - Porto", cliente: "Porto Salvador", empresa: "Nexti BA", atrasos: 6, faltas: 2, horasExtras: 19 },
  { id: "C018", colaborador: "Gabriela Souza", posto: "Loja Centro - Varejo", cliente: "Rede Varejo PE", empresa: "Nexti PE", atrasos: 9, faltas: 1, horasExtras: 24 },
  { id: "C019", colaborador: "Henrique Alves", posto: "Acesso Principal - Park", cliente: "Tech Park SC", empresa: "Nexti SC", atrasos: 5, faltas: 1, horasExtras: 12 },
  { id: "C020", colaborador: "Iris Martins", posto: "Prédio Anexo - DF", cliente: "Órgão Público DF", empresa: "Nexti DF", atrasos: 14, faltas: 4, horasExtras: 8 },
];
