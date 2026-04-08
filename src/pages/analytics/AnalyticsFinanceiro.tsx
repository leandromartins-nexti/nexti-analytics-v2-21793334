import AnalyticsLockedSection from "./AnalyticsLockedSection";

const tabs = [
  { id: "alavancas", label: "Alavancas de Economia" },
  { id: "roi", label: "Retorno do Investimento" },
  { id: "previsto-realizado", label: "Previsto vs Realizado" },
  { id: "rentabilidade", label: "Rentabilidade" },
];

export default function AnalyticsFinanceiro() {
  return <AnalyticsLockedSection sectionName="Financeiro" sectionId="financeiro" tabs={tabs} />;
}
