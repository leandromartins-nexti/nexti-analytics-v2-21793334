import AnalyticsLockedSection from "./AnalyticsLockedSection";

const tabs = [
  { id: "pesquisas", label: "Pesquisas de Clima" },
  { id: "reconhecimento", label: "Reconhecimento" },
  { id: "comunicacao", label: "Comunicação Interna" },
];

export default function AnalyticsEngajamento() {
  return <AnalyticsLockedSection sectionName="Engajamento" sectionId="engajamento" tabs={tabs} />;
}
