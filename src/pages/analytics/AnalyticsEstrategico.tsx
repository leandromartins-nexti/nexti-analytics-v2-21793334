import AnalyticsLockedSection from "./AnalyticsLockedSection";

const tabs = [
  { id: "evolucao", label: "Evolução da Operação" },
  { id: "plano-acao", label: "Plano de Ação" },
  { id: "simulador", label: "Simulador de Cenários" },
];

export default function AnalyticsEstrategico() {
  return <AnalyticsLockedSection sectionName="Estratégico" sectionId="estrategico" tabs={tabs} />;
}
