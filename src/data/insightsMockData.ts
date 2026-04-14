export interface InsightEvidence {
  before: { label: string; value: string };
  after: { label: string; value: string };
}

export interface Insight {
  id: string;
  category: "critical" | "event" | "achievement" | "opportunity" | "trend";
  severity: "critical" | "warning" | "info" | "success";
  tabOrigin: string;
  timestamp: string;
  title: string;
  narrative: string;
  evidence: InsightEvidence | null;
  actionFilter: Record<string, string | number> | null;
}

// Cross-tab insights only — tab-specific insights now live inline in each tab
export const mockInsights: Insight[] = [
  {
    id: "ins_cross_001",
    category: "critical",
    severity: "critical",
    tabOrigin: "Qualidade × Turnover",
    timestamp: "há 1d",
    title: "Turnover alto correlaciona com piora da qualidade em 2 empresas",
    narrative:
      "Empresa TERCEIRIZACAO DE SERVICOS LTDA e empresa PORTARIA E LIMPEZA LTDA apresentam simultaneamente turnover acima de 40% e score de qualidade abaixo de 60. A rotatividade constante impede consolidação de processos e treinamento, criando ciclo vicioso de perda de qualidade. Intervenção conjunta RH + Operação recomendada.",
    evidence: {
      before: { label: "Turnover TERCEIRIZACAO", value: "52%" },
      after: { label: "Score qualidade", value: "48 (Ruim)" },
    },
    actionFilter: null,
  },
  {
    id: "ins_cross_002",
    category: "trend",
    severity: "info",
    tabOrigin: "Absenteísmo × Qualidade",
    timestamp: "há 2d",
    title: "Queda no absenteísmo acompanhou melhoria da qualidade",
    narrative:
      "Nos últimos 4 meses, o absenteísmo consolidado caiu de 6.2% para 4.1% enquanto o score de qualidade subiu de 68 para 76. A correlação sugere que a estabilização da equipe após o pico de set/25 beneficiou ambos os indicadores simultaneamente.",
    evidence: null,
    actionFilter: null,
  },
];
