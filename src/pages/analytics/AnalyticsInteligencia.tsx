import AnalyticsLockedSection from "./AnalyticsLockedSection";

const tabs = [
  { id: "previsoes", label: "Previsões" },
  { id: "benchmark", label: "Benchmark Setorial" },
  { id: "chatbot", label: "Chatbot Analítico" },
];

export default function AnalyticsInteligencia() {
  return <AnalyticsLockedSection sectionName="Inteligência" sectionId="inteligencia" tabs={tabs} />;
}
