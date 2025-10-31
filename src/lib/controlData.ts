// Nexti Control V1 - Mock Data

export interface ControlBigNumbers {
  visitasRealizadas: number;
  visitasNaoRealizadas: number;
  naoConformidades: number;
  tempoMedioDeslocamento: number;
  tempoMedioPermanencia: number;
  ultimaVisita: string;
}

export interface VisitaMensal {
  mes: string;
  planejadas: number;
  realizadas: number;
  aderencia: number;
}

export interface VisitaPorCliente {
  cliente: string;
  planejadas: number;
  realizadas: number;
  naoRealizadas: number;
  aderencia: number;
}

export interface NaoConformidadePorTipo {
  tipo: string;
  quantidade: number;
}

export interface NaoConformidadeStatus {
  status: string;
  quantidade: number;
  percentual: number;
}

export interface NaoConformidadeRanking {
  nome: string;
  tipo: "colaborador" | "posto";
  ocorrencias: number;
}

export interface NaoConformidadeMensal {
  mes: string;
  resolvidas: number;
  pendentes: number;
}

export interface EficienciaOperacional {
  cliente: string;
  posto: string;
  tempoDeslocamento: number;
  tempoPermanencia: number;
}

export interface TempoMedioMensal {
  mes: string;
  deslocamento: number;
  permanencia: number;
}

export interface UltimaVisita {
  data: string;
  horario: string;
  colaborador: string;
  cliente: string;
  posto: string;
  status: "realizada" | "atrasada";
}

export interface FrequenciaVisita {
  diaSemana: string;
  turnoManha: number;
  turnoTarde: number;
  turnoNoite: number;
}

// Big Numbers
export const controlBigNumbers: ControlBigNumbers = {
  visitasRealizadas: 1847,
  visitasNaoRealizadas: 203,
  naoConformidades: 89,
  tempoMedioDeslocamento: 28,
  tempoMedioPermanencia: 142,
  ultimaVisita: "2025-10-28 15:45",
};

// Execução Operacional - Evolução Mensal
export const visitasMensais: VisitaMensal[] = [
  { mes: "Jan", planejadas: 1950, realizadas: 1820, aderencia: 93.3 },
  { mes: "Fev", planejadas: 1880, realizadas: 1750, aderencia: 93.1 },
  { mes: "Mar", planejadas: 2100, realizadas: 1960, aderencia: 93.3 },
  { mes: "Abr", planejadas: 2050, realizadas: 1890, aderencia: 92.2 },
  { mes: "Mai", planejadas: 2200, realizadas: 2050, aderencia: 93.2 },
  { mes: "Jun", planejadas: 2150, realizadas: 1980, aderencia: 92.1 },
  { mes: "Jul", planejadas: 2180, realizadas: 2020, aderencia: 92.7 },
  { mes: "Ago", planejadas: 2250, realizadas: 2090, aderencia: 92.9 },
  { mes: "Set", planejadas: 2100, realizadas: 1950, aderencia: 92.9 },
  { mes: "Out", planejadas: 2050, realizadas: 1847, aderencia: 90.1 },
];

// Execução Operacional - Por Cliente
export const visitasPorCliente: VisitaPorCliente[] = [
  { cliente: "Shopping Center Norte", planejadas: 450, realizadas: 420, naoRealizadas: 30, aderencia: 93.3 },
  { cliente: "Banco Itaú - Regional SP", planejadas: 380, realizadas: 342, naoRealizadas: 38, aderencia: 90.0 },
  { cliente: "Hospital Albert Einstein", planejadas: 320, realizadas: 305, naoRealizadas: 15, aderencia: 95.3 },
  { cliente: "Carrefour - Filial Oeste", planejadas: 290, realizadas: 260, naoRealizadas: 30, aderencia: 89.7 },
  { cliente: "GPA - Extra Hipermercados", planejadas: 280, realizadas: 250, naoRealizadas: 30, aderencia: 89.3 },
  { cliente: "Ambev - CD Jaguariúna", planejadas: 250, realizadas: 225, naoRealizadas: 25, aderencia: 90.0 },
  { cliente: "Via Varejo - Casas Bahia", planejadas: 80, realizadas: 45, naoRealizadas: 35, aderencia: 56.3 },
];

// Não Conformidades - Por Tipo
export const naoConformidadesPorTipo: NaoConformidadePorTipo[] = [
  { tipo: "Operacional", quantidade: 32 },
  { tipo: "Técnico", quantidade: 24 },
  { tipo: "Documental", quantidade: 18 },
  { tipo: "Segurança", quantidade: 10 },
  { tipo: "Qualidade", quantidade: 5 },
];

// Não Conformidades - Status
export const naoConformidadesStatus: NaoConformidadeStatus[] = [
  { status: "Finalizadas", quantidade: 52, percentual: 58.4 },
  { status: "Em Execução", quantidade: 25, percentual: 28.1 },
  { status: "Pendentes", quantidade: 12, percentual: 13.5 },
];

// Não Conformidades - Ranking
export const naoConformidadesRanking: NaoConformidadeRanking[] = [
  { nome: "Posto Shopping Norte - Entrada A", tipo: "posto", ocorrencias: 12 },
  { nome: "Carlos Eduardo Mendes", tipo: "colaborador", ocorrencias: 8 },
  { nome: "Posto Banco Itaú - Agência Centro", tipo: "posto", ocorrencias: 7 },
  { nome: "Fernanda Silva Oliveira", tipo: "colaborador", ocorrencias: 6 },
  { nome: "Posto Hospital - Ala Sul", tipo: "posto", ocorrencias: 6 },
  { nome: "João Pedro Santos", tipo: "colaborador", ocorrencias: 5 },
  { nome: "Posto Carrefour - Estacionamento", tipo: "posto", ocorrencias: 5 },
  { nome: "Marina Costa Lima", tipo: "colaborador", ocorrencias: 4 },
  { nome: "Posto Extra - Setor de Carga", tipo: "posto", ocorrencias: 4 },
  { nome: "Ricardo Almeida Souza", tipo: "colaborador", ocorrencias: 3 },
];

// Não Conformidades - Evolução Mensal
export const naoConformidadesMensais: NaoConformidadeMensal[] = [
  { mes: "Jan", resolvidas: 45, pendentes: 8 },
  { mes: "Fev", resolvidas: 38, pendentes: 12 },
  { mes: "Mar", resolvidas: 52, pendentes: 10 },
  { mes: "Abr", resolvidas: 48, pendentes: 15 },
  { mes: "Mai", resolvidas: 55, pendentes: 9 },
  { mes: "Jun", resolvidas: 50, pendentes: 14 },
  { mes: "Jul", resolvidas: 58, pendentes: 11 },
  { mes: "Ago", resolvidas: 62, pendentes: 8 },
  { mes: "Set", resolvidas: 49, pendentes: 13 },
  { mes: "Out", resolvidas: 52, pendentes: 12 },
];

// Eficiência Operacional - Dispersão
export const eficienciaOperacional: EficienciaOperacional[] = [
  { cliente: "Shopping Centro Norte", posto: "Entrada A", tempoDeslocamento: 25, tempoPermanencia: 150 },
  { cliente: "Shopping Centro Norte", posto: "Entrada B", tempoDeslocamento: 28, tempoPermanencia: 145 },
  { cliente: "Banco Itaú", posto: "Agência Centro", tempoDeslocamento: 35, tempoPermanencia: 120 },
  { cliente: "Banco Itaú", posto: "Agência Sul", tempoDeslocamento: 42, tempoPermanencia: 110 },
  { cliente: "Hospital Einstein", posto: "Ala Norte", tempoDeslocamento: 18, tempoPermanencia: 180 },
  { cliente: "Hospital Einstein", posto: "Ala Sul", tempoDeslocamento: 20, tempoPermanencia: 175 },
  { cliente: "Carrefour Oeste", posto: "Entrada Principal", tempoDeslocamento: 32, tempoPermanencia: 135 },
  { cliente: "Carrefour Oeste", posto: "Estacionamento", tempoDeslocamento: 38, tempoPermanencia: 125 },
  { cliente: "Extra Hipermercados", posto: "Setor A", tempoDeslocamento: 28, tempoPermanencia: 140 },
  { cliente: "Extra Hipermercados", posto: "Setor B", tempoDeslocamento: 30, tempoPermanencia: 138 },
  { cliente: "Ambev CD", posto: "Portaria Principal", tempoDeslocamento: 45, tempoPermanencia: 160 },
  { cliente: "Ambev CD", posto: "Dock de Carga", tempoDeslocamento: 50, tempoPermanencia: 155 },
  { cliente: "Via Varejo", posto: "Loja 01", tempoDeslocamento: 55, tempoPermanencia: 95 },
  { cliente: "Via Varejo", posto: "Loja 02", tempoDeslocamento: 60, tempoPermanencia: 90 },
];

// Eficiência Operacional - Tempo Médio Mensal
export const tempoMedioMensal: TempoMedioMensal[] = [
  { mes: "Jan", deslocamento: 32, permanencia: 148 },
  { mes: "Fev", deslocamento: 30, permanencia: 145 },
  { mes: "Mar", deslocamento: 29, permanencia: 150 },
  { mes: "Abr", deslocamento: 31, permanencia: 142 },
  { mes: "Mai", deslocamento: 28, permanencia: 146 },
  { mes: "Jun", deslocamento: 27, permanencia: 143 },
  { mes: "Jul", deslocamento: 26, permanencia: 145 },
  { mes: "Ago", deslocamento: 28, permanencia: 144 },
  { mes: "Set", deslocamento: 29, permanencia: 141 },
  { mes: "Out", deslocamento: 28, permanencia: 142 },
];

// Últimas Visitas
export const ultimasVisitas: UltimaVisita[] = [
  { data: "28/10/2025", horario: "15:45", colaborador: "Ana Paula Silva", cliente: "Shopping Centro Norte", posto: "Entrada A", status: "realizada" },
  { data: "28/10/2025", horario: "15:30", colaborador: "Roberto Carlos Lima", cliente: "Banco Itaú", posto: "Agência Centro", status: "realizada" },
  { data: "28/10/2025", horario: "15:15", colaborador: "Mariana Costa", cliente: "Hospital Einstein", posto: "Ala Sul", status: "atrasada" },
  { data: "28/10/2025", horario: "14:50", colaborador: "Pedro Henrique Souza", cliente: "Carrefour Oeste", posto: "Entrada Principal", status: "realizada" },
  { data: "28/10/2025", horario: "14:35", colaborador: "Juliana Mendes", cliente: "Extra Hipermercados", posto: "Setor A", status: "realizada" },
  { data: "28/10/2025", horario: "14:20", colaborador: "Fernando Alves", cliente: "Ambev CD", posto: "Portaria Principal", status: "atrasada" },
  { data: "28/10/2025", horario: "14:05", colaborador: "Camila Rodrigues", cliente: "Via Varejo", posto: "Loja 01", status: "realizada" },
  { data: "28/10/2025", horario: "13:50", colaborador: "Lucas Fernandes", cliente: "Shopping Centro Norte", posto: "Entrada B", status: "realizada" },
  { data: "28/10/2025", horario: "13:30", colaborador: "Beatriz Santos", cliente: "Banco Itaú", posto: "Agência Sul", status: "realizada" },
  { data: "28/10/2025", horario: "13:15", colaborador: "Gabriel Martins", cliente: "Hospital Einstein", posto: "Ala Norte", status: "realizada" },
];

// Frequência de Visitas por Dia da Semana
export const frequenciaVisitas: FrequenciaVisita[] = [
  { diaSemana: "Segunda", turnoManha: 85, turnoTarde: 92, turnoNoite: 45 },
  { diaSemana: "Terça", turnoManha: 88, turnoTarde: 95, turnoNoite: 48 },
  { diaSemana: "Quarta", turnoManha: 90, turnoTarde: 98, turnoNoite: 52 },
  { diaSemana: "Quinta", turnoManha: 92, turnoTarde: 100, turnoNoite: 55 },
  { diaSemana: "Sexta", turnoManha: 95, turnoTarde: 105, turnoNoite: 60 },
  { diaSemana: "Sábado", turnoManha: 72, turnoTarde: 78, turnoNoite: 38 },
  { diaSemana: "Domingo", turnoManha: 45, turnoTarde: 50, turnoNoite: 25 },
];
