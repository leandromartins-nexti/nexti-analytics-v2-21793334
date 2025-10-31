// Mock data for Nexti Plus - Benefits Management Dashboard

export interface BenefitCostByType {
  mes: string;
  va: number;
  vr: number;
  vt: number;
  outros: number;
}

export interface GratificationByRole {
  posto: string;
  cargo: string;
  totalGratificacao: number;
  colaboradores: number;
}

export interface BenefitUtilization {
  tipo: string;
  percentual: number;
}

export interface UtilizationByProvider {
  fornecedor: string;
  empresa: string;
  taxaUtilizacao: number;
}

export interface AttendanceEvolution {
  mes: string;
  area: string;
  assiduidade: number;
}

export interface CostEvolution {
  mes: string;
  custo: number;
}

export interface CostByCompany {
  empresa: string;
  cnpj: string;
  custo: number;
  variacao: number;
  percentualTotal: number;
}

export interface PerCapitaEvolution {
  mes: string;
  perCapita: number;
}

export interface VRVAUtilization {
  empresa: string;
  fornecedor: string;
  concedido: number;
  utilizado: number;
  percentual: number;
}

export interface VTUtilization {
  empresa: string;
  fornecedor: string;
  concedido: number;
  utilizado: number;
  percentual: number;
}

export interface GratificationEvolution {
  mes: string;
  total: number;
}

export interface ColaboradorUtilizacao {
  nome: string;
  cargo: string;
  empresa: string;
  concedido: number;
  utilizado: number;
  percentual: number;
}

// Big numbers
export const custoTotalBeneficios = 2847500;
export const custoPerCapita = 850;
export const variacaoMensal = 8.5;
export const taxaMediaUtilizacao = 78.5;
export const totalGratificacoes = 385600;
export const colaboradoresSemBeneficios = 87;

// Custo por tipo de benefício (mensal)
export const custoPorTipoBeneficio: BenefitCostByType[] = [
  { mes: "Jan", va: 245000, vr: 380000, vt: 185000, outros: 55000 },
  { mes: "Fev", va: 252000, vr: 385000, vt: 188000, outros: 58000 },
  { mes: "Mar", va: 258000, vr: 392000, vt: 192000, outros: 60000 },
  { mes: "Abr", va: 261000, vr: 395000, vt: 195000, outros: 62000 },
  { mes: "Mai", va: 268000, vr: 402000, vt: 198000, outros: 65000 },
  { mes: "Jun", va: 272000, vr: 408000, vt: 202000, outros: 68000 },
];

// Gratificações por posto
export const gratificacoesPorPosto: GratificationByRole[] = [
  { posto: "Posto 001 - Shopping Norte", cargo: "Gerente", totalGratificacao: 125000, colaboradores: 15 },
  { posto: "Posto 002 - Banco Safra", cargo: "Supervisor", totalGratificacao: 85000, colaboradores: 28 },
  { posto: "Posto 003 - Hospital Einstein", cargo: "Coordenador", totalGratificacao: 72000, colaboradores: 22 },
  { posto: "Posto 004 - Escritório Itaú", cargo: "Analista Sênior", totalGratificacao: 48000, colaboradores: 35 },
  { posto: "Posto 005 - Complexo JK", cargo: "Técnico", totalGratificacao: 32000, colaboradores: 45 },
  { posto: "Posto 006 - Carrefour Paulista", cargo: "Assistente", totalGratificacao: 18000, colaboradores: 28 },
];

// Taxa de utilização agregada (donut)
export const taxaUtilizacaoAgregada: BenefitUtilization[] = [
  { tipo: "VR Utilizado", percentual: 82 },
  { tipo: "VA Utilizado", percentual: 78 },
  { tipo: "Não Utilizado", percentual: 15 },
];

// Taxa de utilização por fornecedor
export const taxaUtilizacaoPorFornecedor: UtilizationByProvider[] = [
  { fornecedor: "Alelo", taxaUtilizacao: 89, empresa: "Nexti Security" },
  { fornecedor: "Sodexo", taxaUtilizacao: 85, empresa: "Nexti Security" },
  { fornecedor: "VR Benefícios", taxaUtilizacao: 82, empresa: "Nexti Facilities" },
  { fornecedor: "Ticket", taxaUtilizacao: 80, empresa: "Nexti Facilities" },
  { fornecedor: "Flash", taxaUtilizacao: 77, empresa: "Nexti Varejo" },
  { fornecedor: "Greencard", taxaUtilizacao: 75, empresa: "Nexti Varejo" },
];

// Evolução de assiduidade por área
export const evolucaoAssiduidade: AttendanceEvolution[] = [
  { mes: "Jan", assiduidade: 92, area: "Operações" },
  { mes: "Fev", assiduidade: 91, area: "Operações" },
  { mes: "Mar", assiduidade: 93, area: "Operações" },
  { mes: "Abr", assiduidade: 94, area: "Operações" },
  { mes: "Mai", assiduidade: 92, area: "Operações" },
  { mes: "Jun", assiduidade: 95, area: "Operações" },
  { mes: "Jan", assiduidade: 88, area: "Administrativo" },
  { mes: "Fev", assiduidade: 89, area: "Administrativo" },
  { mes: "Mar", assiduidade: 87, area: "Administrativo" },
  { mes: "Abr", assiduidade: 90, area: "Administrativo" },
  { mes: "Mai", assiduidade: 91, area: "Administrativo" },
  { mes: "Jun", assiduidade: 92, area: "Administrativo" },
];

// Detalhes para filtros
export const detalhesBeneficios = [
  { id: "1", colaborador: "João Silva", posto: "Posto 001", tipo: "VR", fornecedor: "Alelo", empresa: "Nexti Security", area: "Operações", valorCreditado: 500, valorUtilizado: 450 },
  { id: "2", colaborador: "Maria Santos", posto: "Posto 002", tipo: "VA", fornecedor: "Sodexo", empresa: "Nexti Security", area: "Administrativo", valorCreditado: 400, valorUtilizado: 320 },
  { id: "3", colaborador: "Pedro Costa", posto: "Posto 003", tipo: "VR", fornecedor: "VR Benefícios", empresa: "Nexti Facilities", area: "Operações", valorCreditado: 500, valorUtilizado: 410 },
  { id: "4", colaborador: "Ana Oliveira", posto: "Posto 004", tipo: "VA", fornecedor: "Ticket", empresa: "Nexti Facilities", area: "Comercial", valorCreditado: 400, valorUtilizado: 380 },
  { id: "5", colaborador: "Carlos Souza", posto: "Posto 005", tipo: "VT", fornecedor: "Flash", empresa: "Nexti Varejo", area: "Operações", valorCreditado: 300, valorUtilizado: 250 },
];

// Ranking de colaboradores sem benefícios
export const colaboradoresSemBeneficiosRanking = [
  { nome: "Carlos Silva", cargo: "Vigilante", empresa: "Nexti Security", diasSemBeneficio: 45 },
  { nome: "Ana Costa", cargo: "Recepcionista", empresa: "Nexti Facilities", diasSemBeneficio: 38 },
  { nome: "Paulo Mendes", cargo: "Porteiro", empresa: "Nexti Security", diasSemBeneficio: 32 },
  { nome: "Juliana Rocha", cargo: "Auxiliar de Limpeza", empresa: "Nexti Facilities", diasSemBeneficio: 29 },
  { nome: "Roberto Lima", cargo: "Vigilante", empresa: "Nexti Security", diasSemBeneficio: 25 },
  { nome: "Fernanda Alves", cargo: "Auxiliar Administrativo", empresa: "Nexti Facilities", diasSemBeneficio: 22 },
  { nome: "Marcos Pereira", cargo: "Porteiro", empresa: "Nexti Security", diasSemBeneficio: 18 },
  { nome: "Tatiana Souza", cargo: "Recepcionista", empresa: "Nexti Facilities", diasSemBeneficio: 15 },
  { nome: "André Santos", cargo: "Vigilante", empresa: "Nexti Security", diasSemBeneficio: 12 },
  { nome: "Carla Nunes", cargo: "Auxiliar de Limpeza", empresa: "Nexti Facilities", diasSemBeneficio: 8 },
];

// Evolução de custos (últimos 12 meses)
export const evolucaoCustos: CostEvolution[] = [
  { mes: "Jan", custo: 2450000 },
  { mes: "Fev", custo: 2520000 },
  { mes: "Mar", custo: 2580000 },
  { mes: "Abr", custo: 2610000 },
  { mes: "Mai", custo: 2680000 },
  { mes: "Jun", custo: 2720000 },
  { mes: "Jul", custo: 2755000 },
  { mes: "Ago", custo: 2790000 },
  { mes: "Set", custo: 2810000 },
  { mes: "Out", custo: 2825000 },
  { mes: "Nov", custo: 2840000 },
  { mes: "Dez", custo: 2847500 },
];

// Custo por empresa
export const custoPorEmpresa: CostByCompany[] = [
  { empresa: "Nexti Security", cnpj: "12.345.678/0001-90", custo: 1420000, variacao: 7.2, percentualTotal: 49.9 },
  { empresa: "Nexti Facilities", cnpj: "23.456.789/0001-81", custo: 985000, variacao: 9.8, percentualTotal: 34.6 },
  { empresa: "Nexti Varejo", cnpj: "34.567.890/0001-72", custo: 442500, variacao: 10.5, percentualTotal: 15.5 },
];

// Evolução per capita
export const evolucaoPerCapita: PerCapitaEvolution[] = [
  { mes: "Jan", perCapita: 790 },
  { mes: "Fev", perCapita: 805 },
  { mes: "Mar", perCapita: 812 },
  { mes: "Abr", perCapita: 818 },
  { mes: "Mai", perCapita: 825 },
  { mes: "Jun", perCapita: 830 },
  { mes: "Jul", perCapita: 835 },
  { mes: "Ago", perCapita: 840 },
  { mes: "Set", perCapita: 842 },
  { mes: "Out", perCapita: 845 },
  { mes: "Nov", perCapita: 848 },
  { mes: "Dez", perCapita: 850 },
];

// Utilização VR/VA
export const utilizacaoVRVA: VRVAUtilization[] = [
  { empresa: "Nexti Security", fornecedor: "Sodexo", concedido: 450000, utilizado: 367500, percentual: 81.7 },
  { empresa: "Nexti Security", fornecedor: "Alelo", concedido: 280000, utilizado: 218400, percentual: 78.0 },
  { empresa: "Nexti Facilities", fornecedor: "Sodexo", concedido: 320000, utilizado: 249600, percentual: 78.0 },
  { empresa: "Nexti Facilities", fornecedor: "Ticket", concedido: 195000, utilizado: 146250, percentual: 75.0 },
  { empresa: "Nexti Varejo", fornecedor: "Alelo", concedido: 180000, utilizado: 140400, percentual: 78.0 },
  { empresa: "Nexti Varejo", fornecedor: "VR", concedido: 145000, utilizado: 108750, percentual: 75.0 },
];

// Ranking de colaboradores com menor utilização
export const rankingMenorUtilizacao: ColaboradorUtilizacao[] = [
  { nome: "João Silva", cargo: "Vigilante", empresa: "Nexti Security", concedido: 1200, utilizado: 480, percentual: 40.0 },
  { nome: "Maria Santos", cargo: "Auxiliar de Limpeza", empresa: "Nexti Facilities", concedido: 1100, utilizado: 495, percentual: 45.0 },
  { nome: "Pedro Costa", cargo: "Porteiro", empresa: "Nexti Security", concedido: 1150, utilizado: 575, percentual: 50.0 },
  { nome: "Ana Oliveira", cargo: "Recepcionista", empresa: "Nexti Varejo", concedido: 1200, utilizado: 660, percentual: 55.0 },
  { nome: "Carlos Mendes", cargo: "Vigilante", empresa: "Nexti Security", concedido: 1200, utilizado: 720, percentual: 60.0 },
  { nome: "Juliana Rocha", cargo: "Auxiliar Administrativo", empresa: "Nexti Facilities", concedido: 1300, utilizado: 845, percentual: 65.0 },
  { nome: "Roberto Lima", cargo: "Supervisor", empresa: "Nexti Varejo", concedido: 1500, utilizado: 1050, percentual: 70.0 },
  { nome: "Fernanda Alves", cargo: "Coordenador", empresa: "Nexti Security", concedido: 1800, utilizado: 1350, percentual: 75.0 },
  { nome: "Marcos Pereira", cargo: "Gerente", empresa: "Nexti Facilities", concedido: 2200, utilizado: 1760, percentual: 80.0 },
  { nome: "Tatiana Souza", cargo: "Diretor", empresa: "Nexti Varejo", concedido: 3000, utilizado: 2550, percentual: 85.0 },
];

// Ranking de colaboradores com maior utilização
export const rankingMaiorUtilizacao: ColaboradorUtilizacao[] = [
  { nome: "André Santos", cargo: "Diretor", empresa: "Nexti Security", concedido: 3500, utilizado: 3465, percentual: 99.0 },
  { nome: "Carla Nunes", cargo: "Gerente", empresa: "Nexti Facilities", concedido: 2500, utilizado: 2450, percentual: 98.0 },
  { nome: "Ricardo Souza", cargo: "Coordenador", empresa: "Nexti Varejo", concedido: 2000, utilizado: 1940, percentual: 97.0 },
  { nome: "Beatriz Lima", cargo: "Supervisor", empresa: "Nexti Security", concedido: 1800, utilizado: 1728, percentual: 96.0 },
  { nome: "Gabriel Costa", cargo: "Analista", empresa: "Nexti Facilities", concedido: 1500, utilizado: 1425, percentual: 95.0 },
  { nome: "Paula Mendes", cargo: "Assistente", empresa: "Nexti Varejo", concedido: 1200, utilizado: 1128, percentual: 94.0 },
  { nome: "Felipe Rocha", cargo: "Auxiliar", empresa: "Nexti Security", concedido: 1100, utilizado: 1023, percentual: 93.0 },
  { nome: "Luciana Alves", cargo: "Recepcionista", empresa: "Nexti Facilities", concedido: 1150, utilizado: 1058, percentual: 92.0 },
  { nome: "Diego Pereira", cargo: "Porteiro", empresa: "Nexti Varejo", concedido: 1100, utilizado: 1001, percentual: 91.0 },
  { nome: "Camila Silva", cargo: "Vigilante", empresa: "Nexti Security", concedido: 1200, utilizado: 1080, percentual: 90.0 },
];

// Utilização VT
export const utilizacaoVT: VTUtilization[] = [
  { empresa: "Nexti Security", fornecedor: "VR", concedido: 280000, utilizado: 218400, percentual: 78.0 },
  { empresa: "Nexti Security", fornecedor: "Sodexo", concedido: 195000, utilizado: 146250, percentual: 75.0 },
  { empresa: "Nexti Facilities", fornecedor: "Alelo", concedido: 165000, utilizado: 128700, percentual: 78.0 },
  { empresa: "Nexti Facilities", fornecedor: "VR", concedido: 140000, utilizado: 105000, percentual: 75.0 },
  { empresa: "Nexti Varejo", fornecedor: "Ticket", concedido: 95000, utilizado: 74100, percentual: 78.0 },
  { empresa: "Nexti Varejo", fornecedor: "Sodexo", concedido: 82000, utilizado: 61500, percentual: 75.0 },
];

// Evolução de gratificações
export const evolucaoGratificacoes: GratificationEvolution[] = [
  { mes: "Jan", total: 325000 },
  { mes: "Fev", total: 332000 },
  { mes: "Mar", total: 338000 },
  { mes: "Abr", total: 345000 },
  { mes: "Mai", total: 352000 },
  { mes: "Jun", total: 358000 },
  { mes: "Jul", total: 365000 },
  { mes: "Ago", total: 370000 },
  { mes: "Set", total: 375000 },
  { mes: "Out", total: 378000 },
  { mes: "Nov", total: 382000 },
  { mes: "Dez", total: 385600 },
];

// Ranking de cargos com maior volume de gratificações
export const rankingGratificacoesCargo = [
  { cargo: "Gerente de Operações", total: 125000, colaboradores: 15, percentualPerformance: 75 },
  { cargo: "Supervisor de Segurança", total: 85000, colaboradores: 28, percentualPerformance: 70 },
  { cargo: "Coordenador de Facilities", total: 72000, colaboradores: 22, percentualPerformance: 68 },
  { cargo: "Analista Sênior", total: 48000, colaboradores: 35, percentualPerformance: 65 },
  { cargo: "Vigilante Líder", total: 32000, colaboradores: 45, percentualPerformance: 60 },
  { cargo: "Técnico de Manutenção", total: 18000, colaboradores: 28, percentualPerformance: 55 },
  { cargo: "Auxiliar Administrativo", total: 5600, colaboradores: 18, percentualPerformance: 50 },
];

// Custo detalhado por empresa com drilldown
export const custoDetalhadoPorEmpresa = {
  "Nexti Security": {
    cnpj: "12.345.678/0001-90",
    custo: 1420000,
    perCapita: 890,
    variacao: 7.2,
    clientes: {
      "Shopping Center Norte": {
        cnpj: "45.678.901/0001-23",
        custo: 580000,
        perCapita: 875,
        variacao: 6.5,
        postos: [
          { cc: "CC-001", nome: "Portaria Principal", custo: 185000, perCapita: 850, variacao: 5.8 },
          { cc: "CC-002", nome: "Estacionamento", custo: 142000, perCapita: 880, variacao: 7.2 },
          { cc: "CC-003", nome: "Torre Comercial", custo: 253000, perCapita: 890, variacao: 6.8 },
        ],
      },
      "Banco Safra HQ": {
        cnpj: "56.789.012/0001-14",
        custo: 485000,
        perCapita: 920,
        variacao: 8.5,
        postos: [
          { cc: "CC-004", nome: "Sede Administrativa", custo: 285000, perCapita: 950, variacao: 9.2 },
          { cc: "CC-005", nome: "Cofre", custo: 200000, perCapita: 880, variacao: 7.5 },
        ],
      },
      "Hospital Albert Einstein": {
        cnpj: "67.890.123/0001-05",
        custo: 355000,
        perCapita: 875,
        variacao: 6.8,
        postos: [
          { cc: "CC-006", nome: "Pronto Socorro", custo: 155000, perCapita: 860, variacao: 6.2 },
          { cc: "CC-007", nome: "UTI", custo: 200000, perCapita: 885, variacao: 7.2 },
        ],
      },
    },
  },
  "Nexti Facilities": {
    cnpj: "23.456.789/0001-81",
    custo: 985000,
    perCapita: 825,
    variacao: 9.8,
    clientes: {
      "Escritório Itaú": {
        cnpj: "78.901.234/0001-96",
        custo: 425000,
        perCapita: 850,
        variacao: 10.5,
        postos: [
          { cc: "CC-008", nome: "Torre 1", custo: 185000, perCapita: 845, variacao: 11.2 },
          { cc: "CC-009", nome: "Torre 2", custo: 240000, perCapita: 855, variacao: 9.8 },
        ],
      },
      "Complexo JK": {
        cnpj: "89.012.345/0001-87",
        custo: 320000,
        perCapita: 800,
        variacao: 8.5,
        postos: [
          { cc: "CC-010", nome: "Edifício A", custo: 125000, perCapita: 780, variacao: 7.8 },
          { cc: "CC-011", nome: "Edifício B", custo: 195000, perCapita: 815, variacao: 9.0 },
        ],
      },
      "Faria Lima Office": {
        cnpj: "90.123.456/0001-78",
        custo: 240000,
        perCapita: 820,
        variacao: 9.2,
        postos: [
          { cc: "CC-012", nome: "Recepção", custo: 85000, perCapita: 810, variacao: 8.5 },
          { cc: "CC-013", nome: "Manutenção", custo: 155000, perCapita: 830, variacao: 9.7 },
        ],
      },
    },
  },
  "Nexti Varejo": {
    cnpj: "34.567.890/0001-72",
    custo: 442500,
    perCapita: 795,
    variacao: 10.5,
    clientes: {
      "Carrefour Paulista": {
        cnpj: "01.234.567/0001-69",
        custo: 225000,
        perCapita: 810,
        variacao: 11.2,
        postos: [
          { cc: "CC-014", nome: "Loja Principal", custo: 145000, perCapita: 805, variacao: 10.8 },
          { cc: "CC-015", nome: "Depósito", custo: 80000, perCapita: 820, variacao: 11.8 },
        ],
      },
      "Extra Ipiranga": {
        cnpj: "12.345.678/0001-50",
        custo: 217500,
        perCapita: 780,
        variacao: 9.8,
        postos: [
          { cc: "CC-016", nome: "Loja", custo: 135000, perCapita: 770, variacao: 9.2 },
          { cc: "CC-017", nome: "Açougue", custo: 82500, perCapita: 795, variacao: 10.5 },
        ],
      },
    },
  },
};
