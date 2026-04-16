import AnalyticsLockedSection from "./AnalyticsLockedSection";

const tabs = [
  { id: "sancoes", label: "Sanções Disciplinares" },
  { id: "alertas-preventivos", label: "Alertas Preventivos" },
  { id: "regulatorio", label: "Regulatório" },
];

export default function AnalyticsCompliance() {
  return <AnalyticsLockedSection sectionName="Compliance" sectionId="compliance" tabs={tabs} />;
}
