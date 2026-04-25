import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Filter, Eraser } from "lucide-react";
import { FilterPanel } from "@/components/layout/FilterPanel";
import { resumo } from "@/lib/analytics-mock-data";
import GroupBySidebar, { type GroupBy } from "@/components/analytics/GroupBySidebar";
import { getSidebarItems } from "@/lib/ajustesData";
import { useQualidadePontoData } from "@/hooks/useQualidadePontoData";
import { buildDataSources } from "@/lib/qualidadeDataSources";

export default function AnalyticsViolacoesTrabalhistas({ embedded }: { embedded?: boolean }) {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRegional, setSelectedRegional] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>("unidade");

  const { data: customerData } = useQualidadePontoData();
  const dataSources = useMemo(() => buildDataSources(customerData), [customerData]);
  const sidebarItems = useMemo(() => getSidebarItems(groupBy, undefined, dataSources), [groupBy, dataSources]);
  const handleRegionalClick = (nome: string) => setSelectedRegional(prev => prev === nome ? null : nome);
  const handleGroupByChange = (g: GroupBy) => { setGroupBy(g); setSelectedRegional(null); };

  const content = (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 min-w-0 pl-6 pr-4 py-6 overflow-y-auto">
        <p className="text-muted-foreground">Violações Trabalhistas — em construção.</p>
      </div>
      <GroupBySidebar items={sidebarItems} selectedRegional={selectedRegional} onRegionalClick={handleRegionalClick} groupBy={groupBy} onGroupByChange={handleGroupByChange} />
    </div>
  );

  if (embedded) return content;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {content}
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
